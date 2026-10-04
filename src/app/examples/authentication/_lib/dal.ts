// Data Access Layer: every read of the session or the user goes through
// here, so the auth check can't be forgotten. React's cache() runs each
// function once per request, even if many components call it.
import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import {
  PATHS,
  SESSION_COOKIE,
  type Role,
  type SessionKind,
} from "./constants";
import {
  findSession,
  findUserById,
  listSessionsForUser,
  listUsers,
  touchSession,
} from "./db";
import { toMemberDTO, toSessionDTO, toUserDTO } from "./dto";
import { decrypt, newExpiry } from "./session";

export type Session = {
  kind: SessionKind;
  userId: string;
  role: Role;
  expiresAt: Date;
  sessionId?: string;
};

// The session, or null. No redirect: for places that render something else
// when logged out (header, Route Handler).
export const getSession = cache(async (): Promise<Session | null> => {
  const cookie = (await cookies()).get(SESSION_COOKIE)?.value;
  const payload = await decrypt(cookie);
  if (!payload) return null;

  // Stateless: everything comes from the token. No database involved.
  if (payload.kind === "stateless") {
    return {
      kind: payload.kind,
      userId: payload.userId,
      role: payload.role,
      expiresAt: new Date((payload.exp ?? 0) * 1000),
    };
  }

  // Database: the token is only a pointer. If the row is gone (logout on
  // another device, revoked, user deleted), the session is over, even
  // though the cookie's signature is still valid.
  const row = await findSession(payload.sessionId);
  if (!row) return null;
  const user = await findUserById(row.userId);
  if (!user) return null;

  // Sliding expiry in the row (the proxy only refreshes the cookie).
  const expiresAt = newExpiry();
  await touchSession(row.id, expiresAt);

  return {
    kind: payload.kind,
    userId: user.id,
    role: user.role, // Always fresh: a role change applies at once.
    expiresAt,
    sessionId: row.id,
  };
});

// For protected pages and actions: redirect when logged out.
export const verifySession = cache(async () => {
  const session = await getSession();
  if (session) return session;

  // A cookie that no longer matches a session (e.g. a revoked database
  // session) must be deleted, or the proxy would keep sending the login
  // page back here. A page can't delete cookies, so a Route Handler does.
  const hasCookie = (await cookies()).has(SESSION_COOKIE);
  redirect(hasCookie ? PATHS.sessionEnded : PATHS.login);
});

// A "secure" check: the session is valid AND the user still exists in the
// database. Returns only safe fields (a DTO), never the password hash.
export const getUser = cache(async () => {
  const session = await verifySession();
  const user = await findUserById(session.userId);
  // A stateless session can outlive the user (deleted, or the fake db
  // was reset by a server restart). The cookie alone can't tell.
  if (!user) return null;
  return toUserDTO(user);
});

// The member list, shaped for whoever is looking at it.
export const getMembers = cache(async () => {
  const viewer = await getUser();
  if (!viewer) return [];
  const users = await listUsers();
  return users.map((user) => toMemberDTO(user, viewer));
});

// The current user's database sessions (their "devices").
export const getMySessions = cache(async () => {
  const session = await verifySession();
  const rows = await listSessionsForUser(session.userId);
  return rows.map((row) => toSessionDTO(row, session.sessionId));
});
