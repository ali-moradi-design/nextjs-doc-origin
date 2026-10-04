// Sessions in a signed JWT cookie, in two flavours (see SessionPayload):
// - stateless: the token holds the user id and role. Nothing is stored.
// - database: the token holds only a session id; the row in the sessions
//   table holds the rest and can be deleted to end the session.
// "server-only" makes the build fail if a Client Component imports this file,
// so the secret key can never end up in the browser bundle.
import "server-only";
import { jwtVerify, SignJWT } from "jose";
import { cookies, headers } from "next/headers";
import {
  BASE_PATH,
  SESSION_COOKIE,
  SESSION_DURATION_MS,
  type SessionKind,
} from "./constants";
import { deleteSessionRow, insertSession, type User } from "./db";
import type { SessionPayload } from "./definitions";

// Create one with `openssl rand -base64 32` and put it in .env.local:
//   SESSION_SECRET=...
// The fallback only exists so the demo runs without setup. A real app must
// fail instead: anyone who knows the key can sign their own sessions.
const secretKey =
  process.env.SESSION_SECRET ?? "demo-only-secret-do-not-use-in-production";
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload, expiresAt: Date) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(encodedKey);
}

// Returns undefined for a missing, tampered or expired token.
export async function decrypt(session: string | undefined = "") {
  if (!session) return undefined;
  try {
    const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return undefined;
  }
}

// The recommended cookie options. Shared with the proxy, which refreshes
// the cookie through NextResponse instead of cookies().
export function sessionCookieOptions(expires: Date) {
  return {
    httpOnly: true, // document.cookie can't read it (protects from XSS).
    secure: true, // HTTPS only (browsers treat http://localhost as secure).
    sameSite: "lax" as const, // Not sent on cross-site POSTs (CSRF).
    expires,
    path: BASE_PATH, // Only sent to this example, not the whole site.
  };
}

export function newExpiry() {
  return new Date(Date.now() + SESSION_DURATION_MS);
}

// Call only from a Server Action or a Route Handler: a page can't set
// cookies while it renders.
export async function createSession(user: User, kind: SessionKind) {
  const expiresAt = newExpiry();
  let payload: SessionPayload;

  if (kind === "database") {
    // 1. Create a row in the sessions table.
    const row = await insertSession({
      userId: user.id,
      userAgent: (await headers()).get("user-agent") ?? "unknown",
      expiresAt,
    });
    // 2. Only its id goes into the (signed) cookie.
    payload = { kind, sessionId: row.id };
  } else {
    payload = { kind, userId: user.id, role: user.role };
  }

  // 3. Store the token in the cookie (read by the proxy's optimistic check).
  const cookieStore = await cookies();
  cookieStore.set(
    SESSION_COOKIE,
    await encrypt(payload, expiresAt),
    sessionCookieOptions(expiresAt),
  );
}

// Signs the same payload again with a later expiry. Returns undefined when
// there is no valid token to refresh. Used by the proxy, which must not
// touch the database: for database sessions the DAL extends the row.
export async function refreshToken(session: string | undefined) {
  const payload = await decrypt(session);
  if (!payload) return undefined;

  const expiresAt = newExpiry();
  const fresh: SessionPayload =
    payload.kind === "database"
      ? { kind: payload.kind, sessionId: payload.sessionId }
      : { kind: payload.kind, userId: payload.userId, role: payload.role };
  return { token: await encrypt(fresh, expiresAt), expiresAt };
}

export async function deleteSession() {
  const cookieStore = await cookies();
  const payload = await decrypt(cookieStore.get(SESSION_COOKIE)?.value);
  // A database session is really ended on the server: even a stolen copy of
  // the cookie stops working. A stateless token stays valid until it expires.
  if (payload?.kind === "database") await deleteSessionRow(payload.sessionId);
  // The path must match the one used to set it.
  cookieStore.delete({ name: SESSION_COOKIE, path: BASE_PATH });
}
