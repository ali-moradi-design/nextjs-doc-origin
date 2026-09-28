// A fake database saved in a JSON file. Every read logs a [db] line in the
// terminal: if you refresh and see no new line, the value came from the
// cache.
//
// A file, not memory: cached values survive a server restart, so the data
// must survive it too. With an in-memory store, restarting `pnpm start`
// reset the data while the cache kept the old values, and the two
// disagreed. Delete the .data folder to start over.
import "server-only";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

export type Post = { id: string; title: string };

type Store = {
  posts: Post[];
  price: number;
  headline: number;
  counter: number;
};

export const headlines = [
  "Spring sale starts Monday",
  "New colors for the Aurora Lamp",
  "Free shipping this week",
  "Meet the Orbit Speaker 2",
];

const initialStore: Store = {
  posts: [
    { id: "1", title: "Cache Components are on" },
    { id: "2", title: "Tags make invalidation precise" },
  ],
  price: 100,
  headline: 0,
  counter: 1,
};

const dataDir = path.join(process.cwd(), ".data");
const file = path.join(dataDir, "revalidating.json");

function load(): Store {
  if (!existsSync(file)) return initialStore;
  return JSON.parse(readFileSync(file, "utf8"));
}

function save(store: Store) {
  mkdirSync(dataDir, { recursive: true });
  writeFileSync(file, JSON.stringify(store, null, 2));
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function readPosts() {
  console.log("[db] readPosts()");
  return load().posts;
}

export function insertPost(title: string) {
  const store = load();
  store.posts.push({ id: crypto.randomUUID(), title });
  save(store);
}

export function readPrice() {
  console.log("[db] readPrice()");
  return load().price;
}

export function increasePrice() {
  const store = load();
  store.price += 10;
  save(store);
}

export function readHeadline() {
  console.log("[db] readHeadline()");
  return headlines[load().headline];
}

export function nextHeadline() {
  const store = load();
  store.headline = (store.headline + 1) % headlines.length;
  save(store);
}

export function readCounter() {
  console.log("[db] readCounter()");
  return load().counter;
}

export function increaseCounter() {
  const store = load();
  store.counter += 1;
  save(store);
  return store.counter;
}
