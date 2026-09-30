import type { NextRequest } from "next/server";
import { API_KEY_HEADER, DEMO_API_KEY, PATHS } from "../constants";

// Answers the request directly: the route handler never runs without a key.
export function guardSecretApi(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith(PATHS.secretApi)) return;
  if (request.headers.get(API_KEY_HEADER) === DEMO_API_KEY) return;

  return Response.json(
    { error: `Missing or wrong ${API_KEY_HEADER} header (from proxy.ts)` },
    { status: 401 },
  );
}
