import { RequestRunner } from "./_components/request-runner";
import { StreamReader } from "./_components/stream-reader";
import { Section } from "./_components/ui/section";
import {
  cachePresets,
  exportPresets,
  methodPresets,
  redirectPresets,
  requestInfoPresets,
  todoByIdPresets,
  todoPresets,
} from "./_lib/presets";

// The handlers live in ./api/**/route.ts. They cannot sit in this folder:
// a route.ts next to page.tsx would claim the same URL.
export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Route Handlers
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          route.ts files answer HTTP requests with the Web Request and Response
          APIs. Each button sends a request with fetch() and prints the raw
          response.
        </p>
      </header>

      <Section
        title="1. GET and POST"
        description="api/todos/route.ts exports GET (with a ?done filter from nextUrl.searchParams) and POST (a JSON body checked with zod: 201 or 400)."
      >
        <RequestRunner presets={todoPresets} />
      </Section>

      <Section
        title="2. Dynamic segment"
        description="api/todos/[id]/route.ts reads params from the second argument, typed with RouteContext. 404 when the todo does not exist, 204 after a delete."
      >
        <RequestRunner presets={todoByIdPresets} />
      </Section>

      <Section
        title="3. Methods you did not write"
        description="PUT is not exported, so Next.js answers 405. OPTIONS and HEAD are added automatically: OPTIONS lists the allowed methods, HEAD runs GET without a body."
      >
        <RequestRunner presets={methodPresets} />
      </Section>

      <Section
        title="4. Caching"
        description="Route Handlers are not cached by default. dynamic = 'force-static' runs the GET once at build time. Click each one a few times (with pnpm build && pnpm start)."
      >
        <RequestRunner presets={cachePresets} />
      </Section>

      <Section
        title="5. Query, headers and cookies"
        description="NextRequest gives nextUrl.searchParams, headers and cookies. The response sets an httpOnly cookie (visits) and a custom X-Handled-By header. The browser hides Set-Cookie from fetch(), but visitsCookie grows on every click because the cookie is sent back."
      >
        <RequestRunner presets={requestInfoPresets} />
      </Section>

      <Section
        title="6. Redirect"
        description="NextResponse.redirect answers 307 with a Location header. fetch() follows it, so the body is the target's response."
      >
        <RequestRunner presets={redirectPresets} />
      </Section>

      <Section
        title="7. Non-JSON response"
        description="A CSV with Content-Disposition: attachment. A normal link downloads it as a file."
      >
        <a
          href="/examples/route-handlers/api/export"
          className="text-sm font-medium underline"
        >
          Download todos.csv
        </a>
        <RequestRunner presets={exportPresets} />
      </Section>

      <Section
        title="8. Streaming"
        description="The body is a ReadableStream: five lines, 600 ms apart. The client reads each line as it arrives."
      >
        <StreamReader />
      </Section>
    </main>
  );
}
