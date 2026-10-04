import { NextResponse, type NextRequest } from "next/server";
import { BASE_PATH, PATHS, SESSION_COOKIE } from "../../_lib/constants";

// The DAL sends here a cookie whose session is gone (revoked, logged out on
// another device, or the user was deleted). Pages can't change cookies
// while they render, but a Route Handler can: delete it, then go to login.
export function GET(request: NextRequest) {
  const url = new URL(PATHS.login, request.url);
  url.searchParams.set("ended", "1");

  const response = NextResponse.redirect(url);
  response.cookies.delete({ name: SESSION_COOKIE, path: BASE_PATH });
  return response;
}
