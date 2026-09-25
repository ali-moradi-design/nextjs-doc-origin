"use client";

import { useState } from "react";
import Boundary from "./boundary";

// Only this small piece of the toolbar needs state, so only this file
// (and what it imports) is shipped to the browser.
export default function Search() {
  const [query, setQuery] = useState("");

  return (
    <Boundary kind="client" name="Search">
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Type to search…"
        aria-label="Search"
        className="w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-1.5 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700"
      />
      <p className="mt-1 text-xs text-zinc-500">
        {query ? `Searching for "${query}"` : "Nothing typed yet"}
      </p>
    </Boundary>
  );
}
