import { ValueList } from "../_components/value-list";
import { readAppEnvName, readBuildLabel } from "../_lib/env";

// No request-time API here, so this page is prerendered by next build:
// process.env is read once, at build time, and frozen into the HTML.
export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">
        Static page (read at build time)
      </h1>
      <ValueList
        rows={[
          ["APP_ENV_NAME", readAppEnvName()],
          ["NEXT_PUBLIC_BUILD_LABEL", readBuildLabel()],
          ["rendered at", new Date().toISOString()],
        ]}
      />
    </main>
  );
}
