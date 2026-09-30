import { NextResponse, type NextRequest } from "next/server";
import { PATH_HEADER, RESPONSE_HEADER, TIME_HEADER } from "../constants";

export function addHeaders(request: NextRequest) {
  // Request headers: copy, change, and pass them in `request`.
  // They reach the server (headers() in a page), not the browser.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(PATH_HEADER, request.nextUrl.pathname);
  requestHeaders.set(TIME_HEADER, new Date().toISOString());

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  // Response header: sent to the browser.
  response.headers.set(RESPONSE_HEADER, "hello from proxy.ts");
  return response;
}
