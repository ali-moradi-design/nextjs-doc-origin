import { cacheLife } from "next/cache";
import { headers } from "next/headers";
import { connection } from "next/server";
import { Suspense } from "react";
import {
  getProducts,
  getProductsUncached,
  getRate,
  getStockLevel,
  type Product,
} from "./_lib/data";

// ─── Small UI helpers ─────────────────────────────────────────────────

type Kind = "static" | "cached" | "request";

const kinds: Record<Kind, { label: string; className: string }> = {
  static: {
    label: "Static shell",
    className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300",
  },
  cached: {
    label: "Cached",
    className: "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/50 dark:text-fuchsia-300",
  },
  request: {
    label: "Request time",
    className: "bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300",
  },
};

function Tag({ kind }: { kind: Kind }) {
  return (
    <span className={`rounded-full px-2 py-0.5 font-mono text-[11px] font-semibold ${kinds[kind].className}`}>
      {kinds[kind].label}
    </span>
  );
}

function Card({
  kind,
  title,
  children,
}: {
  kind: Kind;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-medium">{title}</h3>
        <Tag kind={kind} />
      </div>
      <div className="space-y-1 text-sm">{children}</div>
    </div>
  );
}

function Skeleton({ title }: { title: string }) {
  return (
    <div
      aria-busy="true"
      aria-label={`Loading ${title}`}
      className="space-y-2 rounded-xl border border-dashed border-zinc-300 p-4 dark:border-zinc-700"
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-medium text-zinc-400">{title}</h3>
        <span className="animate-pulse font-mono text-[11px] text-zinc-500">streaming…</span>
      </div>
      <div className="h-10 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
      <div className="space-y-1">
        <h2 className="font-semibold">{title}</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
      {children}
    </section>
  );
}

function ProductList({ products }: { products: Product[] }) {
  return (
    <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
      {products.map((product) => (
        <li key={product.id} className="flex justify-between py-1">
          <span>{product.name}</span>
          <span className="font-mono text-zinc-500">${product.price}</span>
        </li>
      ))}
    </ul>
  );
}

// ─── 1. Predictable values ────────────────────────────────────────────

// Module constants and pure computations give the same result every time,
// so they are prerendered automatically. No directive needed.
const shippingRules = [
  { region: "Europe", days: 3 },
  { region: "Americas", days: 5 },
  { region: "Asia", days: 7 },
];
const averageDays = shippingRules.reduce((sum, rule) => sum + rule.days, 0) / shippingRules.length;

// ─── 2. Data-level caching ────────────────────────────────────────────

async function CachedProducts() {
  const { products, loadedAt } = await getProducts();
  return (
    <Card kind="cached" title='getProducts() with "use cache"'>
      <ProductList products={products} />
      <p className="text-zinc-500">
        Loaded at <span className="font-mono">{loadedAt}</span>. Refresh: this time doesn&apos;t change.
      </p>
    </Card>
  );
}

async function UncachedProducts() {
  const { products, loadedAt } = await getProductsUncached();
  return (
    <Card kind="request" title="Same query, no cache">
      <ProductList products={products} />
      <p className="text-zinc-500">
        Loaded at <span className="font-mono">{loadedAt}</span>. Refresh: 1.5s wait and a new time, every time.
      </p>
    </Card>
  );
}

// ─── 3. UI-level caching ──────────────────────────────────────────────

// "use cache" on a component: its whole rendered output is stored.
async function CachedBanner() {
  "use cache";
  cacheLife("days");

  const renderedAt = new Date().toLocaleTimeString("en-US");
  return (
    <Card kind="cached" title='A component with "use cache"'>
      <p>🎉 Free shipping on orders over $100 this week.</p>
      <p className="text-zinc-500">
        Rendered at <span className="font-mono">{renderedAt}</span> (frozen for a day).
      </p>
    </Card>
  );
}

// ─── 4. Cache keys + runtime values ───────────────────────────────────

const currencies = ["USD", "EUR", "GBP"];

// Not cached: reads searchParams (runtime data), then passes the plain
// value to a cached function. The currency becomes part of the cache key.
async function Prices({ searchParams }: { searchParams: PageProps<"/examples/caching">["searchParams"] }) {
  const { currency: raw } = await searchParams;
  const currency = typeof raw === "string" && currencies.includes(raw) ? raw : "USD";
  const { rate, loadedAt } = await getRate(currency);

  return (
    <Card kind="cached" title={`Aurora Lamp in ${currency}`}>
      <p className="text-2xl font-semibold tabular-nums">
        {(89 * rate).toFixed(2)} {currency}
      </p>
      <p className="text-zinc-500">
        Rate for {currency} loaded at <span className="font-mono">{loadedAt}</span>
      </p>
    </Card>
  );
}

// ─── 5. Runtime APIs ──────────────────────────────────────────────────

async function RequestInfo() {
  const userAgent = (await headers()).get("user-agent") ?? "unknown";
  return (
    <Card kind="request" title="headers() is different for every visitor">
      <p className="break-all font-mono text-xs text-zinc-500">{userAgent}</p>
    </Card>
  );
}

// ─── 6. Random values ─────────────────────────────────────────────────

async function RequestId() {
  await connection(); // "make this at request time", then random is allowed
  return (
    <Card kind="request" title="Random per request">
      <p className="font-mono">{crypto.randomUUID().slice(0, 8)}</p>
      <p className="text-zinc-500">connection() + Suspense. Changes on every refresh.</p>
    </Card>
  );
}

async function SharedId() {
  "use cache";
  cacheLife("days");
  return (
    <Card kind="cached" title="Random, but cached">
      <p className="font-mono">{crypto.randomUUID().slice(0, 8)}</p>
      <p className="text-zinc-500">&quot;use cache&quot;. The same for everyone until it expires.</p>
    </Card>
  );
}

// ─── 7. Short lifetime ────────────────────────────────────────────────

async function StockLevel() {
  const { inStock, loadedAt } = await getStockLevel();
  return (
    <Card kind="cached" title="Stock level (revalidate: 10s)">
      <p className="text-2xl font-semibold tabular-nums">{inStock} left</p>
      <p className="text-zinc-500">
        Loaded at <span className="font-mono">{loadedAt}</span>
      </p>
    </Card>
  );
}

// ─── The page ─────────────────────────────────────────────────────────

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
        <Card kind="static" title="Shipping times">
          <ul>
            {shippingRules.map((rule) => (
              <li key={rule.region}>
                {rule.region}: {rule.days} days
              </li>
            ))}
          </ul>
          <p className="text-zinc-500">Average: {averageDays} days (computed at build time).</p>
        </Card>
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
        <div className="flex gap-2">
          {/* Plain <a> on purpose: a <Link> navigation re-renders the whole
              page and waits for its slowest part (the uncached 1.5s query in
              section 2), which would hide the effect of this cache. */}
          {currencies.map((currency) => (
            <a
              key={currency}
              href={`?currency=${currency}`}
              className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              {currency}
            </a>
          ))}
        </div>
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
