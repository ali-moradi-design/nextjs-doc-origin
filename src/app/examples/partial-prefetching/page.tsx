import { DestinationLink } from "./_components/destination-link";
import { basePath } from "./_lib/constants";
import { Section } from "@/src/app/_components/ui/section";
import { Tag } from "@/src/app/_components/ui/tag";

// `partialPrefetching: true` is set in next.config.ts, so every <Link>
// prefetches its destination's App Shell.
export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Partial Prefetching
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Automatic prefetching only runs in production: <code>pnpm build</code>{" "}
          then <code>pnpm start</code>. Wait a few seconds on this page, then
          click a link. Each destination shows when you arrived and when each
          card was loaded on the server: a server time earlier than your arrival
          means the card came from a prefetch.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <Tag kind="static" />
          <Tag kind="cached" />
          <Tag kind="request" />
        </div>
      </header>

      <Section
        title="1. prefetch={true} no longer means a full prefetch"
        description="Before Partial Prefetching, this link downloaded the whole page ahead of time, uncached content included. Now it gets the App Shell: the uncached inventory streams in after the click."
      >
        <DestinationLink
          href={`${basePath}/uncached`}
          prefetch
          label="Uncached destination"
          note="Only the static part is ready before the click."
        />
      </Section>

      <Section
        title="2. After: one App Shell per route"
        description="All four links share ONE App Shell (header + cached categories), fetched once. The product reads params, which is URL data: it can't be in the shared shell."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <DestinationLink
            href={`${basePath}/products/1`}
            label="Product 1"
            note="Shell only: the product streams in after the click."
          />
          <DestinationLink
            href={`${basePath}/products/2`}
            label="Product 2"
            note="Shell only: the product streams in after the click."
          />
          <DestinationLink
            href={`${basePath}/products/3`}
            prefetch
            label="Product 3"
            note="Per-link prefetch: the cached product is ready, the uncached stock still streams."
          />
          <DestinationLink
            href={`${basePath}/products/4`}
            prefetch
            label="Product 4"
            note="Per-link prefetch: the cached product is ready, the uncached stock still streams."
          />
        </div>
      </Section>

      <Section
        title="3. Session content"
        description="cookies() varies per session, not per link. The lookup is cached behind the cookie value, so a default link prefetches it in the App Shell."
      >
        <DestinationLink
          href={`${basePath}/team`}
          label="Team topics"
          note="Topics are ready before the click."
        />
      </Section>

      <Section
        title="4. Real-time content"
        description="A prefetched value would be stale by the click. No prefetch={true}: the content streams in from behind its Suspense boundary."
      >
        <DestinationLink
          href={`${basePath}/live`}
          label="Live viewers"
          note="The number is loaded after you arrive."
        />
      </Section>
    </main>
  );
}
