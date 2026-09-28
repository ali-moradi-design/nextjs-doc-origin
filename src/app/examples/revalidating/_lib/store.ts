// A fake in-memory database. Every read logs a [db] line in the terminal:
// if you refresh and see no new line, the value came from the cache.
import "server-only";

export type Post = { id: string; title: string };

type Store = { posts: Post[]; price: number; headline: number };

export const headlines = [
  "Spring sale starts Monday",
  "New colors for the Aurora Lamp",
  "Free shipping this week",
  "Meet the Orbit Speaker 2",
];

// Kept on globalThis so the page, the Server Actions and the Route Handler
// share one store, and it survives hot reloads during `pnpm dev`.
const globalStore = globalThis as typeof globalThis & {
  revalidatingStore?: Store;
};

const store = (globalStore.revalidatingStore ??= {
  posts: [
    { id: "1", title: "Cache Components are on" },
    { id: "2", title: "Tags make invalidation precise" },
  ],
  price: 100,
  headline: 0,
});

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function readPosts() {
  console.log("[db] readPosts()");
  return [...store.posts];
}

export function insertPost(title: string) {
  store.posts.push({ id: crypto.randomUUID(), title });
}

export function readPrice() {
  console.log("[db] readPrice()");
  return store.price;
}

export function increasePrice() {
  store.price += 10;
}

export function readHeadline() {
  console.log("[db] readHeadline()");
  return headlines[store.headline];
}

export function nextHeadline() {
  store.headline = (store.headline + 1) % headlines.length;
}
