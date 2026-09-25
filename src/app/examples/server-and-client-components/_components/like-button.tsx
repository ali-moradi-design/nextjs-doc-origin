"use client";

import { useState } from "react";
import Boundary from "./boundary";

// `likes` comes from the Server Component as a prop. Props that cross the
// boundary must be serializable: strings, numbers, plain objects, arrays,
// Dates, Promises... but not functions or class instances.
export default function LikeButton({ likes }: { likes: number }) {
  const [liked, setLiked] = useState(false);

  return (
    <Boundary kind="client" name="LikeButton">
      <button
        type="button"
        onClick={() => setLiked((l) => !l)}
        aria-pressed={liked}
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          liked
            ? "bg-rose-500 text-white"
            : "border border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        }`}
      >
        <span aria-hidden>{liked ? "♥" : "♡"}</span>
        <span className="tabular-nums">{likes + (liked ? 1 : 0)} likes</span>
      </button>
    </Boundary>
  );
}
