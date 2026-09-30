import { type NextRequest, NextResponse } from "next/server";

// Reads query params, headers and cookies from the request, then sets a
// cookie and a custom header on the response.
export async function GET(request: NextRequest) {
  const visits = Number(request.cookies.get("visits")?.value ?? 0) + 1;

  const response = NextResponse.json({
    query: Object.fromEntries(request.nextUrl.searchParams),
    userAgent: request.headers.get("user-agent"),
    acceptLanguage: request.headers.get("accept-language"),
    visitsCookie: visits,
  });

  response.cookies.set("visits", String(visits), {
    path: "/examples/route-handlers",
    httpOnly: true,
    sameSite: "lax",
  });
  response.headers.set("X-Handled-By", "request-info/route.ts");
  return response;
}
