// Fake slow data sources for the caching example. Each real "query" logs a
// [db] line in the terminal: if you refresh and see no new line, the result
// came from the cache.
import "server-only";
import { cacheLife } from "next/cache";
import { connection } from "next/server";

export type Product = { id: string; name: string; price: number };

const products: Product[] = [
  { id: "1", name: "Aurora Lamp", price: 89 },
  { id: "2", name: "Nebula Chair", price: 249 },
  { id: "3", name: "Orbit Speaker", price: 129 },
];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function now() {
  return new Date().toLocaleTimeString("en-US");
}

// ─── Data-level caching ───────────────────────────────────────────────

// Cached: runs once, then every visitor gets the stored result until the
// "hours" lifetime runs out. new Date() is allowed: the time is cached too.
export async function getProducts() {
  "use cache";
  cacheLife("hours");

  console.log("[db] getProducts() ran (cached version)");
  await sleep(1500);
  return { products, loadedAt: now() };
}

// The same query without a cache: runs on every request, 1.5s each time.
export async function getProductsUncached() {
  await connection(); // request time only: never baked into the build
  console.log("[db] getProductsUncached() ran");
  await sleep(1500);
  return { products, loadedAt: now() };
}

// ─── Cache keys ───────────────────────────────────────────────────────

const rates: Record<string, number> = { USD: 1, EUR: 0.92, GBP: 0.79 };

// The argument is part of the cache key: USD, EUR and GBP are stored
// separately. The first visit per currency is slow, the next ones instant.
export async function getRate(currency: string) {
  "use cache";
  cacheLife("hours");

  console.log(`[db] getRate("${currency}") ran`);
  await sleep(1000);
  return { rate: rates[currency] ?? 1, loadedAt: now() };
}

// ─── Short lifetime ───────────────────────────────────────────────────

// Custom lifetime. expire under 5 minutes means it can't be part of the
// prerendered static shell: it becomes a "dynamic hole" and needs Suspense.
export async function getStockLevel() {
  "use cache";
  cacheLife({ stale: 30, revalidate: 10, expire: 60 });

  console.log("[db] getStockLevel() ran");
  await sleep(500);
  return { inStock: 20 + Math.floor(Math.random() * 30), loadedAt: now() };
}
