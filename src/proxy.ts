import type { NextRequest } from "next/server";
import { authProxy } from "./app/examples/authentication/_lib/proxy/auth";
import { BASE_PATH as AUTH_PATH } from "./app/examples/authentication/_lib/constants";
import { guardSecretApi } from "./app/examples/proxy/_lib/proxy/api-key";
import { rewriteAbTest } from "./app/examples/proxy/_lib/proxy/ab-test";
import { protectDashboard } from "./app/examples/proxy/_lib/proxy/auth";
import { addHeaders } from "./app/examples/proxy/_lib/proxy/headers";
import { redirectOldPath } from "./app/examples/proxy/_lib/proxy/redirect";

// One proxy file per project (next to the app folder). The logic lives in
// small modules; each returns a response, or undefined to let the next one
// decide.
export function proxy(request: NextRequest) {
  // The Authentication example has its own proxy logic.
  if (request.nextUrl.pathname.startsWith(AUTH_PATH)) {
    return authProxy(request);
  }

  return (
    guardSecretApi(request) ??
    redirectOldPath(request) ??
    protectDashboard(request) ??
    rewriteAbTest(request) ??
    addHeaders(request)
  );
}

// Must be a constant (read at build time). Without a matcher the proxy
// would also run for /_next/static, /_next/image and public files.
export const config = {
  matcher: ["/examples/proxy/:path*", "/examples/authentication/:path*"],
};
