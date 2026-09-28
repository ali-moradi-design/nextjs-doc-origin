import { Suspense } from "react";
import { CachedBanner } from "./_components/cached-banner";
import { CachedProducts } from "./_components/cached-products";
import { CurrencyLinks } from "./_components/currency-links";
import { Prices } from "./_components/prices";
import { RequestId } from "./_components/request-id";
import { RequestInfo } from "./_components/request-info";
import { SharedId } from "./_components/shared-id";
import { ShippingTimes } from "./_components/shipping-times";
import { StockLevel } from "./_components/stock-level";
import { UncachedProducts } from "./_components/uncached-products";
import { Section } from "@/src/app/_components/ui/section";
import { Skeleton } from "@/src/app/_components/ui/skeleton";
import { Tag } from "@/src/app/_components/ui/tag";

// Not async and awaits nothing at the top: everything outside <Suspense>
// becomes the static shell, sent instantly.
export default function Page({ searchParams }: PageProps<"/examples/caching">) {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Caching</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Each card says where its content comes from. Watch the terminal: a
          <code> [db]</code> line means the code really ran; no line means the
          result came from the cache. Try it in production (
          <code>pnpm build</code> then <code>pnpm start</code>): in dev the
          cache is less predictable.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <Tag kind="static" />
          <Tag kind="cached" />
          <Tag kind="request" />
        </div>
      </header>

      <Section
        title="1. Predictable values"
        description="Constants and pure calculations always give the same result, so they are prerendered automatically."
      >
        <ShippingTimes />
      </Section>

      <Section
        title='2. Data-level: "use cache" on a function'
        description="The same 1.5s query, with and without a cache. The cached one ran once during the build and is part of the static shell: no skeleton, no wait."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <CachedProducts />
          <Suspense fallback={<Skeleton title="Same query, no cache" />}>
            <UncachedProducts />
          </Suspense>
        </div>
      </Section>

      <Section
        title='3. UI-level: "use cache" on a component'
        description="The whole rendered output is stored, not just the data."
      >
        <CachedBanner />
      </Section>

      <Section
        title="4. Cache keys: runtime value → cached function"
        description="The currency comes from the URL (runtime data, so Suspense). It's passed to a cached function, where it becomes part of the cache key. Click each currency twice: slow the first time, instant after."
      >
        <CurrencyLinks />
        <Suspense fallback={<Skeleton title="Price" />}>
          <Prices searchParams={searchParams} />
        </Suspense>
      </Section>

      <Section
        title="5. Runtime APIs"
        description="cookies(), headers(), searchParams and params only exist when a request arrives, so they go inside Suspense. The rest of the page stays static."
      >
        <Suspense fallback={<Skeleton title="Request headers" />}>
          <RequestInfo />
        </Suspense>
      </Section>

      <Section
        title="6. Random values and time"
        description="Next.js makes you choose: a new value per request, or one shared cached value."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Suspense fallback={<Skeleton title="Random per request" />}>
            <RequestId />
          </Suspense>
          <SharedId />
        </div>
      </Section>

      <Section
        title="7. Short lifetimes"
        description="A custom cacheLife with revalidate: 10 seconds. Its expire is under 5 minutes, so it can't be part of the static shell: it streams inside Suspense. Refresh within 10 seconds: same value and time. Wait longer, refresh: a new value."
      >
        <Suspense fallback={<Skeleton title="Stock level" />}>
          <StockLevel />
        </Suspense>
      </Section>
    </main>
  );
}
