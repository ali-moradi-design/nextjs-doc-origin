import { NextResponse, type NextRequest } from "next/server";
import { PATHS } from "../constants";

// A fixed redirect like this one would normally go in next.config.ts
// (redirects). It is here to show NextResponse.redirect.
export function redirectOldPath(request: NextRequest) {
  if (request.nextUrl.pathname !== PATHS.old) return;

  const url = new URL(PATHS.new, request.url);
  url.searchParams.set("from", PATHS.old);
  return NextResponse.redirect(url);
}
