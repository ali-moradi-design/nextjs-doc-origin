// Fake slow data sources for the Partial Prefetching example. Each real
// "query" logs a [db] line in the terminal, so you can see when a prefetch
// (or a navigation) actually ran it.
import "server-only";
import { cacheLife } from "next/cache";
import { connection } from "next/server";

export type Product = { id: string; name: string; price: number };

const products: Product[] = [
  { id: "1", name: "Aurora Lamp", price: 89 },
  { id: "2", name: "Nebula Chair", price: 249 },
  { id: "3", name: "Orbit Speaker", price: 129 },
  { id: "4", name: "Comet Desk", price: 399 },
];

export const productIds = products.map((product) => product.id);

export const teams = ["design", "engineering"] as const;
export type Team = (typeof teams)[number];

const topics: Record<Team, string[]> = {
  design: ["New color tokens", "Icon audit", "Dark mode review"],
  engineering: ["Upgrade to Next.js 16.3", "Flaky test hunt", "Cache budget"],
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function now() {
  return new Date().toLocaleTimeString("en-US");
}

// ─── Cached, URL-independent: part of the App Shell ───────────────────

// "hours" has a stale time of 5 minutes, the minimum for the App Shell.
export async function getCategories() {
  "use cache";
  cacheLife("hours");

  console.log("[db] getCategories() ran");
  await sleep(800);
  return { categories: ["Lighting", "Furniture", "Audio"], loadedAt: now() };
}

// ─── Cached, but keyed by URL data: not in the shared App Shell ───────

// The id comes from params, so the result belongs to one URL. A default
// link streams it in after navigation; <Link prefetch={true}> resolves it
// ahead of the click because it is cached.
export async function getProduct(id: string) {
  "use cache";
  cacheLife("hours");

  console.log(`[db] getProduct("${id}") ran`);
  await sleep(1500);
  return {
    product: products.find((product) => product.id === id),
    loadedAt: now(),
  };
}

// ─── Session data: cached behind the cookie value ─────────────────────

// The team is read from cookies() outside this function and passed in, so
// it becomes part of the cache key.
export async function getTopics(team: Team) {
  "use cache";
  cacheLife("hours");

  console.log(`[db] getTopics("${team}") ran`);
  await sleep(1000);
  return { topics: topics[team], loadedAt: now() };
}

// ─── Uncached: request time only ──────────────────────────────────────

// Never part of an App Shell. Before Partial Prefetching, a
// <Link prefetch={true}> delivered it ahead of the click (full prefetch).
export async function getInventory() {
  await connection();
  console.log("[db] getInventory() ran");
  await sleep(1500);
  return { inStock: 10 + Math.floor(Math.random() * 90), loadedAt: now() };
}

// Real-time: a prefetched value would be stale by the click.
export async function getLiveViewers() {
  await connection();
  console.log("[db] getLiveViewers() ran");
  await sleep(1000);
  return { viewers: 100 + Math.floor(Math.random() * 900), loadedAt: now() };
}

// Uncached per-product stock: even <Link prefetch={true}> doesn't include
// it once the destination uses Partial Prefetching.
export async function getStock(id: string) {
  await connection();
  console.log(`[db] getStock("${id}") ran`);
  await sleep(1000);
  return { inStock: Math.floor(Math.random() * 20), loadedAt: now() };
}
