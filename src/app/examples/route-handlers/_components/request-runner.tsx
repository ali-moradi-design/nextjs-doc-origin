"use client";

import { useState } from "react";

export type RequestPreset = {
  label: string;
  method: string;
  url: string;
  body?: unknown;
};

type Result = {
  status: string;
  finalUrl: string;
  redirected: boolean;
  headers: [string, string][];
  body: string;
  ms: number;
};

// Headers that only add noise to the output.
const hidden = new Set([
  "connection",
  "date",
  "keep-alive",
  "transfer-encoding",
  "vary",
]);

async function send(preset: RequestPreset): Promise<Result> {
  const start = performance.now();
  const response = await fetch(preset.url, {
    method: preset.method,
    cache: "no-store",
    ...(preset.body !== undefined && {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(preset.body),
    }),
  });
  const body = await response.text();
  return {
    status: `${response.status} ${response.statusText}`,
    finalUrl: new URL(response.url).pathname,
    redirected: response.redirected,
    headers: [...response.headers].filter(([name]) => !hidden.has(name)),
    body,
    ms: Math.round(performance.now() - start),
  };
}

// Sends one of the preset requests with fetch() and prints the raw
// response: status line, headers and body.
export function RequestRunner({ presets }: { presets: RequestPreset[] }) {
  const [sent, setSent] = useState<RequestPreset | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [pending, setPending] = useState(false);

  async function run(preset: RequestPreset) {
    setSent(preset);
    setPending(true);
    setResult(await send(preset));
    setPending(false);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => run(preset)}
            disabled={pending}
            className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {sent && (
        <pre className="overflow-x-auto rounded-lg bg-zinc-100 p-3 text-xs dark:bg-zinc-900">
          {`${sent.method} ${sent.url}`}
          {sent.body !== undefined && `\n\n${JSON.stringify(sent.body)}`}
          {"\n\n"}
          {pending || !result
            ? "…"
            : [
                `→ ${result.status} (${result.ms} ms)`,
                result.redirected && `redirected to ${result.finalUrl}`,
                ...result.headers.map(([name, value]) => `${name}: ${value}`),
                "",
                result.body || "(empty body)",
              ]
                .filter((line) => line !== false)
                .join("\n")}
        </pre>
      )}
    </div>
  );
}
