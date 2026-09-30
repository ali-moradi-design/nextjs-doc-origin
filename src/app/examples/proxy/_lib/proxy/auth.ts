import { NextResponse, type NextRequest } from "next/server";
import { PATHS, SESSION_COOKIE } from "../constants";

// An optimistic check: it only looks for the cookie, it does not verify it.
// The dashboard page and the Server Actions still check the session.
export function protectDashboard(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.has(SESSION_COOKIE);

  if (pathname.startsWith(PATHS.dashboard) && !hasSession) {
    const url = new URL(PATHS.login, request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  if (pathname === PATHS.login && hasSession) {
    return NextResponse.redirect(new URL(PATHS.dashboard, request.url));
  }
}
