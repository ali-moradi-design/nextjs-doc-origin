// Cached reads. Each one returns the time it really ran, so the page can
// show when the cached value was produced.
import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { tags } from "./constants";
import {
  readCounter,
  readHeadline,
  readPosts,
  readPrice,
  sleep,
} from "./store";

function now() {
  return new Date().toLocaleTimeString("en-US");
}

// ─── Time-based ───────────────────────────────────────────────────────

// Refreshed in the background 20 seconds after it was made. expire is
// 1 hour (not under 5 minutes), so it stays in the static shell.
export async function getClock() {
  "use cache";
  cacheLife({ revalidate: 20, expire: 3600 });

  console.log("[db] getClock() ran");
  await sleep(500);
  return { loadedAt: now() };
}

// ─── On-demand: tagged, never refreshed by time ───────────────────────

export async function getPosts() {
  "use cache";
  cacheLife("max");
  cacheTag(tags.posts);

  await sleep(500);
  return { posts: readPosts(), loadedAt: now() };
}

export async function getPrice() {
  "use cache";
  cacheLife("max");
  cacheTag(tags.price);

  await sleep(500);
  return { price: readPrice(), loadedAt: now() };
}

// Like CMS content: cached "forever", refreshed only when the CMS calls
// the webhook.
export async function getHeadline() {
  "use cache";
  cacheLife("max");
  cacheTag(tags.headline);

  await sleep(500);
  return { headline: readHeadline(), loadedAt: now() };
}

// ─── stale: how long the browser keeps a page without asking ─────────

// Same data, same tag, two stale times. revalidate and expire are long, so
// only the webhook changes the value on the server.
export async function getCounterShortStale() {
  "use cache";
  cacheLife({ stale: 30, revalidate: 3600, expire: 86400 });
  cacheTag(tags.counter);

  return { value: readCounter(), loadedAt: now() };
}

export async function getCounterLongStale() {
  "use cache";
  cacheLife({ stale: 300, revalidate: 3600, expire: 86400 });
  cacheTag(tags.counter);

  return { value: readCounter(), loadedAt: now() };
}
