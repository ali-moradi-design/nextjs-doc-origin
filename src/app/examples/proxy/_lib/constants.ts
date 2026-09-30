// Shared by src/proxy.ts, the pages and the Server Actions.
// No "use server" / "use client": every side can import it.
export const BASE_PATH = "/examples/proxy";

export const PATHS = {
  old: `${BASE_PATH}/old`,
  new: `${BASE_PATH}/new`,
  ab: `${BASE_PATH}/ab`,
  dashboard: `${BASE_PATH}/dashboard`,
  login: `${BASE_PATH}/login`,
  secretApi: `${BASE_PATH}/api/secret`,
} as const;

export const SESSION_COOKIE = "proxy-demo-session";
export const VARIANT_COOKIE = "proxy-demo-variant";

export const VARIANTS = ["a", "b"] as const;
export type Variant = (typeof VARIANTS)[number];

export function isVariant(value: string | undefined): value is Variant {
  return VARIANTS.some((variant) => variant === value);
}

// A demo key: in a real app it would be a secret env variable.
export const API_KEY_HEADER = "x-api-key";
export const DEMO_API_KEY = "demo-key";

// Request headers added by the proxy (read by the page with headers()).
export const PATH_HEADER = "x-proxy-path";
export const TIME_HEADER = "x-proxy-time";
// Response header added by the proxy (seen by the browser and curl).
export const RESPONSE_HEADER = "x-proxy";
