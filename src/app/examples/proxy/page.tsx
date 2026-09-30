import { DemoLink } from "./_components/demo-link";
import { RequestHeaders } from "./_components/request-headers";
import { SecretCaller } from "./_components/secret-caller";
import { Section } from "./_components/ui/section";
import { PATHS, RESPONSE_HEADER } from "./_lib/constants";

// The proxy itself is src/proxy.ts. Its logic lives in ./_lib/proxy.
export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Proxy</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          src/proxy.ts runs before every request that matches
          /examples/proxy/:path*. It can let the request through, change its
          headers, redirect, rewrite, or answer by itself.
        </p>
      </header>

      <Section
        title="1. Headers"
        description={`NextResponse.next({ request: { headers } }) passes new request headers to the server; this page reads them with headers(). The response also gets a ${RESPONSE_HEADER} header (see it in DevTools > Network, or with curl -I).`}
      >
        <RequestHeaders />
      </Section>

      <Section
        title="2. Redirect"
        description={`${PATHS.old} has no page. The proxy answers 307 with a Location header, and the browser URL changes to ${PATHS.new}.`}
      >
        <DemoLink href={PATHS.old}>Open {PATHS.old}</DemoLink>
      </Section>

      <Section
        title="3. Rewrite (A/B test)"
        description={`${PATHS.ab} has no page either. The proxy reads a cookie (or picks a random variant and sets the cookie) and rewrites to ab/a or ab/b. The URL does not change.`}
      >
        <DemoLink href={PATHS.ab}>Open {PATHS.ab}</DemoLink>
      </Section>

      <Section
        title="4. Optimistic auth check"
        description="Without the session cookie, the dashboard redirects to the login page. The proxy only checks that the cookie exists; the dashboard page checks it again."
      >
        <DemoLink href={PATHS.dashboard}>Open {PATHS.dashboard}</DemoLink>
      </Section>

      <Section
        title="5. Responding directly"
        description={`Without the right x-api-key header the proxy returns a 401 JSON response, and ${PATHS.secretApi}/route.ts never runs.`}
      >
        <SecretCaller />
      </Section>

      <Section
        title="6. Matcher"
        description="The matcher limits the proxy to this example. Other pages, /_next/static and /_next/image never reach it, so they have no x-proxy header."
      >
        <DemoLink href="/examples/route-handlers">
          Open another example (no proxy)
        </DemoLink>
      </Section>
    </main>
  );
}
