import "server-only";

// Server-only variable: never sent to the browser.
export function readAppEnvName() {
  return process.env.APP_ENV_NAME ?? "(not set)";
}

// Public variable: inlined into the JavaScript by next build.
export function readBuildLabel() {
  return process.env.NEXT_PUBLIC_BUILD_LABEL ?? "(not set)";
}
