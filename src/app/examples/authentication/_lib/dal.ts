// Data Access Layer: every read of the session or the user goes through
// here, so the auth check can't be forgotten. React's cache() runs each
// function once per request, even if many components call it.
import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { PATHS, SESSION_COOKIE } from "./constants";
import { findUserById, listUsers } from "./db";
import { decrypt } from "./session";
import { toMemberDTO, toUserDTO } from "./dto";

// The session from the cookie, or null. No redirect: for places that
// render something else when logged out (header, Route Handler).
export const getSession = cache(async () => {
  const cookie = (await cookies()).get(SESSION_COOKIE)?.value;
  const session = await decrypt(cookie);
  if (!session) return null;
  return {
    userId: session.userId,
    role: session.role,
    expiresAt: new Date((session.exp ?? 0) * 1000),
  };
});

// For protected pages and actions: redirect to login when logged out.
export const verifySession = cache(async () => {
  const session = await getSession();
  if (!session) redirect(PATHS.login);
  return session;
});

// A "secure" check: the cookie is valid AND the user still exists in the
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
