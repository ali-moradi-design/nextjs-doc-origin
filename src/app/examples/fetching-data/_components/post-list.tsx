"use client";

import { use, useState } from "react";
import type { Post } from "../_lib/db";

// Receives a Promise, not the data. use() suspends this component until the
// Promise resolves; the nearest <Suspense> shows its fallback meanwhile.
export default function PostList({
  posts,
  readyAt,
}: {
  posts: Promise<Post[]>;
  readyAt: Promise<number>;
}) {
  const allPosts = use(posts);
  const ms = use(readyAt);
  const [tag, setTag] = useState("all");

  const tags = ["all", ...new Set(allPosts.map((post) => post.tag))];
  const visible = tag === "all" ? allPosts : allPosts.filter((post) => post.tag === tag);

  return (
    <section className="space-y-4 rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-semibold">Posts</h2>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-mono text-xs text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
          ready at {ms}ms
        </span>
      </div>

      {/* Interactivity is why this is a Client Component. */}
      <div className="flex flex-wrap gap-2">
        {tags.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setTag(name)}
            aria-pressed={tag === name}
            className={`rounded-full px-3 py-1 text-sm transition-colors ${
              tag === name
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                : "border border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <ul className="divide-y divide-zinc-100 text-sm dark:divide-zinc-800">
        {visible.map((post) => (
          <li key={post.id} className="flex justify-between gap-4 py-1.5">
            <span>{post.title}</span>
            <span className="font-mono text-zinc-500">#{post.tag}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
