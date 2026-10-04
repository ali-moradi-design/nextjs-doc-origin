"use client";

import { useState } from "react";

type Hit = {
  name: string;
  page: string;
  params: Record<string, string | number>;
  receivedAt: number;
};

export function GoogleReport() {
  const [hits, setHits] = useState<Hit[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const response = await fetch("/_g/c");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setHits(await response.json());
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    }
  }

  return (
    <div className="space-y-3">
      <button
        onClick={load}
        className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
      >
        Load the fake Google report
      </button>
      {error && (
        <p className="text-sm text-red-700 dark:text-red-400">
          Request failed ({error}).
        </p>
      )}
      {hits && (
        <ul className="space-y-1 font-mono text-xs">
          {hits.length === 0 && <li className="text-zinc-500">No hits yet.</li>}
          {hits.map((hit, index) => (
            <li key={index} className="flex flex-wrap gap-2">
              <span className="text-zinc-500">
                {new Date(hit.receivedAt).toLocaleTimeString("en-GB")}
              </span>
              <span className="font-semibold">{hit.name}</span>
              <span>{hit.page}</span>
              <span className="text-zinc-600 dark:text-zinc-400">
                {Object.entries(hit.params)
                  .map(([key, value]) => `${key}=${value}`)
                  .join(", ")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
