import Link from "next/link";
import { BrowserEnv } from "./_components/browser-env";
import { ExportFindings } from "./_components/export-findings";
import { OptionsTable } from "./_components/options-table";
import { RuntimeEnv } from "./_components/runtime-env";
import { Section } from "./_components/ui/section";

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Deploying</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          The same app can run as a Node.js server, a standalone folder, a
          Docker container, or (with limits) as static files. Build it with
          different environment variables to see what is fixed at build time and
          what is read at runtime.
        </p>
      </header>

      <Section
        title="1. Deployment options"
        description="Node.js, standalone and Docker all run a real Next.js server, so every feature works. Static export has no server."
      >
        <OptionsTable />
      </Section>

      <Section
        title="2. Environment variables on the server (runtime)"
        description="This part calls connection(), so it renders on every request and reads process.env of the running server. Start the same build with a different APP_ENV_NAME and it changes. NEXT_PUBLIC_BUILD_LABEL does not: it was inlined by next build."
      >
        <RuntimeEnv />
      </Section>

      <Section
        title="3. The same variables on a static page (build time)"
        description="The static page has no request-time API, so next build rendered it once. Its values are from the build machine, whatever the server has now."
      >
        <Link
          href="/examples/deploying/static"
          className="text-sm font-medium underline"
        >
          Open the static page
        </Link>
      </Section>

      <Section
        title="4. The same variables in the browser"
        description="Only NEXT_PUBLIC_ variables reach client code (as text written into the bundle). APP_ENV_NAME is undefined in the browser."
      >
        <BrowserEnv />
      </Section>

      <Section
        title='5. output: "export" on this project'
        description="What next build said when this project was exported as static files. Only pages with no server work were left, and next/image still needs a loader."
      >
        <ExportFindings />
      </Section>
    </main>
  );
}
