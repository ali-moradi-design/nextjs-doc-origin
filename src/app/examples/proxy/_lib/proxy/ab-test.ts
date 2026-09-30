import { NextResponse, type NextRequest } from "next/server";
import { isVariant, PATHS, VARIANT_COOKIE, VARIANTS } from "../constants";

// /ab has no page.tsx. The proxy rewrites it to /ab/a or /ab/b:
// the URL in the browser stays /ab.
export function rewriteAbTest(request: NextRequest) {
  if (request.nextUrl.pathname !== PATHS.ab) return;

  const saved = request.cookies.get(VARIANT_COOKIE)?.value;
  const variant = isVariant(saved)
    ? saved
    : VARIANTS[Math.floor(Math.random() * VARIANTS.length)];

  const response = NextResponse.rewrite(
    new URL(`${PATHS.ab}/${variant}`, request.url),
  );
  // First visit: remember the variant so the next visit gets the same one.
  if (!isVariant(saved)) {
    response.cookies.set(VARIANT_COOKIE, variant, { path: PATHS.ab });
  }
  return response;
}
