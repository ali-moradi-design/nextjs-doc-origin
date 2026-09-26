"use client";

import { useState, useTransition } from "react";
import { incrementLike } from "../_lib/actions";

export default function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          // Looks like a normal function call, but it is a POST request to
          // the server. The returned number comes back over the network.
          const updatedLikes = await incrementLike();
          setLikes(updatedLikes);
        });
      }}
      className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 disabled:opacity-60 dark:border-zinc-700 dark:hover:bg-zinc-800"
    >
      <span aria-hidden>♥</span>
      <span className="tabular-nums">{likes} likes</span>
      {isPending && <span className="text-xs text-zinc-500">saving…</span>}
    </button>
  );
}
