"use client";

import { useState } from "react";

const url = "/examples/route-handlers/api/stream";

// Reads the streamed body chunk by chunk and stamps each chunk with the
// time it arrived, to show that the response is not sent all at once.
export function StreamReader() {
  const [chunks, setChunks] = useState<string[]>([]);
  const [reading, setReading] = useState(false);

  async function read() {
    setChunks([]);
    setReading(true);
    const start = performance.now();
    const response = await fetch(url, { cache: "no-store" });
    const reader = response
      .body!.pipeThrough(new TextDecoderStream())
      .getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const ms = Math.round(performance.now() - start);
      setChunks((previous) => [...previous, `${ms} ms: ${value.trim()}`]);
    }
    setReading(false);
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={read}
        disabled={reading}
        className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
      >
        {reading ? "Reading…" : `GET ${url}`}
      </button>
      {chunks.length > 0 && (
        <pre className="rounded-lg bg-zinc-100 p-3 text-xs dark:bg-zinc-900">
          {chunks.join("\n")}
        </pre>
      )}
    </div>
  );
}
