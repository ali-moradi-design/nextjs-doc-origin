// Every export is a Server Function: a public endpoint that anyone can POST
// to, not only our forms. So each one validates its input and checks auth
// itself, no matter what the UI shows or hides.
"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { PATHS, safeRedirectPath } from "./constants";
import { getUser, verifySession } from "./dal";
import * as db from "./db";
import {
  loginSchema,
  signupSchema,
  type FormResult,
  type LoginInput,
  type SignupInput,
} from "./definitions";
import { createSession, deleteSession } from "./session";

// Called by react-hook-form with a plain object. The type is `unknown` on
// purpose: the browser checks are only for the user's comfort.
export async function signup(input: unknown): Promise<FormResult<SignupInput>> {
  await db.sleep();

  // 1. Validate the fields. Return early: no database call for bad input.
  const parsed = signupSchema.safeParse(input);
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors };
  }
  const { name, email, password, sessionKind } = parsed.data;

  // A rule the browser can't check.
  if (await db.findUserByEmail(email)) {
    return {
      errors: { email: ["An account with this email already exists."] },
    };
  }

  // 2 + 3. Hash the password and insert the user.
  const user = await db.insertUser({ name, email, password });

  // 4. Create the session (sets the cookie). 5. Redirect.
  await createSession(user, sessionKind);
  redirect(PATHS.dashboard);
}

export async function login(
  input: unknown,
  from: unknown,
): Promise<FormResult<LoginInput>> {
  await db.sleep();

  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors };
  }

  const user = await db.checkCredentials(
    parsed.data.email,
    parsed.data.password,
  );
  // One message for both cases: don't reveal which emails have accounts.
  if (!user) return { form: "Invalid email or password." };

  await createSession(user, parsed.data.sessionKind);
  // `from` comes from the URL, so it is user input too.
  redirect(safeRedirectPath(from));
}

export async function logout() {
  await deleteSession();
  redirect(PATHS.login);
}

export type ActionResult = { ok: boolean; message: string };

// Admin only. The button is hidden from other users, but hiding a button is
// not security: the "try anyway" button calls this as a normal user.
export async function deleteMember(id: unknown): Promise<ActionResult> {
  await db.sleep(300);

  // Secure check: role from the database, not from the cookie.
  const viewer = await getUser();
  if (!viewer) return { ok: false, message: "Not logged in." };
  if (viewer.role !== "admin") {
    return { ok: false, message: "Forbidden: only admins can delete members." };
  }

  if (typeof id !== "string") return { ok: false, message: "Invalid id." };
  if (id === viewer.id) {
    return { ok: false, message: "You can't delete yourself." };
  }

  const deleted = await db.deleteUser(id);
  if (!deleted) return { ok: false, message: "No such member." };

  refresh();
  return { ok: true, message: "Member deleted." };
}

// Database sessions only: end one of your own sessions (another device).
export async function revokeSession(id: unknown): Promise<ActionResult> {
  const session = await verifySession();
  if (session.kind !== "database") {
    return { ok: false, message: "Stateless sessions can't be revoked." };
  }
  if (typeof id !== "string") return { ok: false, message: "Invalid id." };

  // Authorization: only sessions that belong to you. Without this check
  // anyone could log anyone out by guessing ids.
  const mine = await db.listSessionsForUser(session.userId);
  if (!mine.some((row) => row.id === id)) {
    return { ok: false, message: "No such session." };
  }

  await db.deleteSessionRow(id);
  refresh();
  return { ok: true, message: "Session revoked." };
}

export async function logoutOtherSessions(): Promise<ActionResult> {
  const session = await verifySession();
  if (session.kind !== "database") {
    return { ok: false, message: "Stateless sessions can't be revoked." };
  }

  await db.deleteSessionsForUser(session.userId, session.sessionId);
  refresh();
  return { ok: true, message: "Logged out on all other devices." };
}
