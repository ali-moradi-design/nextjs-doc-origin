import { NextResponse, type NextRequest } from "next/server";
import { PATHS, SESSION_COOKIE } from "../constants";
import { refreshToken, sessionCookieOptions } from "../session";

// Optimistic checks: they only read the cookie (no database), because the
// proxy runs on every request, prefetches included. The dashboard and the
// actions still check again through the DAL.
export async function authProxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookie = request.cookies.get(SESSION_COOKIE)?.value;
  // Verifying the signature is cheap and needs no database.
  const refreshed = await refreshToken(cookie);

  // 1. Protected route without a valid session: go to login, and come back
  // here afterwards.
  if (pathname.startsWith(PATHS.dashboard) && !refreshed) {
    const url = new URL(PATHS.login, request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // 2. Logged-in users don't need the login and signup pages.
  if ((pathname === PATHS.login || pathname === PATHS.signup) && refreshed) {
    return NextResponse.redirect(new URL(PATHS.dashboard, request.url));
  }

  const response = NextResponse.next();
  // 3. Sliding session: each page request moves the expiry ahead. The page
  // still reads the old cookie in this request; the browser gets the new
  // one. Not on POST: a Server Action (e.g. logout) sets the cookie itself,
  // and two Set-Cookie headers for one cookie would fight.
  if (refreshed && request.method === "GET") {
    response.cookies.set(
      SESSION_COOKIE,
      refreshed.token,
      sessionCookieOptions(refreshed.expiresAt),
    );
  }
  return response;
}
