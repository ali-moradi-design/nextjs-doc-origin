// Stateless sessions: the session itself is a signed JWT stored in a cookie.
// "server-only" makes the build fail if a Client Component imports this file,
// so the secret key can never end up in the browser bundle.
import "server-only";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import {
  BASE_PATH,
  SESSION_COOKIE,
  SESSION_DURATION_MS,
  type Role,
} from "./constants";
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

// Call only from a Server Action or a Route Handler: a page can't set
// cookies while it renders.
export async function createSession(userId: string, role: Role) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  const session = await encrypt({ userId, role }, expiresAt);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, session, sessionCookieOptions(expiresAt));
}

// Signs a new token with a later expiry. Returns undefined when there is
// no valid session to refresh. Used by the proxy on every request.
export async function refreshToken(session: string | undefined) {
  const payload = await decrypt(session);
  if (!payload) return undefined;

  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  const token = await encrypt(
    { userId: payload.userId, role: payload.role },
    expiresAt,
  );
  return { token, expiresAt };
}

export async function deleteSession() {
  const cookieStore = await cookies();
  // The path must match the one used to set it.
  cookieStore.delete({ name: SESSION_COOKIE, path: BASE_PATH });
}
