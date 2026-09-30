import { type NextRequest, NextResponse } from "next/server";

// GET /examples/route-handlers/api/go?to=time
// Answers 307 with a Location header; fetch() follows it automatically.
export async function GET(request: NextRequest) {
  const to = request.nextUrl.searchParams.get("to");
  const target = to === "todos" ? "todos" : "time/dynamic";
  return NextResponse.redirect(
    new URL(`/examples/route-handlers/api/${target}`, request.url),
  );
}
