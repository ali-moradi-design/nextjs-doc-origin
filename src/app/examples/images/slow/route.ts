import { type NextRequest, NextResponse } from "next/server";

// Waits 2 seconds, then redirects to the real optimizer URL. Used by a
// custom loader so the placeholder stays on screen long enough to see it.
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const target = new URLSearchParams({
    url: searchParams.get("url") ?? "",
    w: searchParams.get("w") ?? "640",
    q: searchParams.get("q") ?? "75",
  });

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = NextResponse.redirect(
    new URL(`/_next/image?${target}`, request.url),
  );
  response.headers.set("Cache-Control", "no-store");
  return response;
}
