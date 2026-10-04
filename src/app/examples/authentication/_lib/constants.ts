// Shared by src/proxy.ts, the pages, the forms and the Server Actions.
// No "use server" / "use client": every side can import it.
export const BASE_PATH = "/examples/authentication";

export const PATHS = {
  home: BASE_PATH,
  signup: `${BASE_PATH}/signup`,
  login: `${BASE_PATH}/login`,
  dashboard: `${BASE_PATH}/dashboard`,
  adminApi: `${BASE_PATH}/api/admin-stats`,
} as const;

export const SESSION_COOKIE = "auth-demo-session";

// A short sliding session so the refresh is easy to see: every request to
// this example (through the proxy) moves the expiry 10 minutes ahead.
export const SESSION_DURATION_MS = 10 * 60 * 1000;

export type Role = "admin" | "user";

// Only allow redirects back into this example. A "from" value like
// "https://evil.example" or "//evil.example" would be an open redirect.
export function safeRedirectPath(from: unknown) {
  if (
    typeof from === "string" &&
    from.startsWith(`${BASE_PATH}/`) &&
    !from.startsWith("//")
  ) {
    return from;
  }
  return PATHS.dashboard;
}
