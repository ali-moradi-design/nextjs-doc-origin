"use client";

import { useEffect, useRef, useState } from "react";

const TEXT =
  "Fresh bread, baked every morning with organic flour and a slow rise. Order before noon and it reaches you the same day.";

type Column = { title: string; fallback: string };

// Simulates the moment the web font arrives: the toggle switches each box
// from its fallback font to Lora. Hidden copies measure the text height in
// both fonts, so the shift is shown in pixels.
export function FontSwapSimulator({
  fontFamily,
  fallbackFamily,
}: {
  fontFamily: string;
  fallbackFamily: string;
}) {
  const columns: Column[] = [
    { title: "Plain fallback: Times New Roman", fallback: "Times New Roman" },
    { title: `Adjusted fallback: ${fallbackFamily}`, fallback: fallbackFamily },
  ];
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setLoaded((value) => !value)}
        className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
      >
        {loaded ? "Show fallback (before the font loads)" : "Load Lora"}
      </button>
      <p className="text-sm">
        Now showing: <strong>{loaded ? "Lora" : "the fallback font"}</strong>
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {columns.map((column) => (
          <SwapColumn
            key={column.title}
            title={column.title}
            fallback={column.fallback}
            fontFamily={fontFamily}
            loaded={loaded}
          />
        ))}
      </div>
    </div>
  );
}

function SwapColumn({
  title,
  fallback,
  fontFamily,
  loaded,
}: {
  title: string;
  fallback: string;
  fontFamily: string;
  loaded: boolean;
}) {
  const fallbackRef = useRef<HTMLParagraphElement>(null);
  const fontRef = useRef<HTMLParagraphElement>(null);
  const [heights, setHeights] = useState<[number, number] | null>(null);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setHeights([
        fallbackRef.current?.offsetHeight ?? 0,
        fontRef.current?.offsetHeight ?? 0,
      ]);
    });
  }, []);

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="relative w-64 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
        <p style={{ fontFamily: loaded ? fontFamily : fallback }}>{TEXT}</p>
        <button
          type="button"
          className="mt-3 rounded-lg bg-zinc-900 px-3 py-1.5 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Buy now
        </button>
        {/* Invisible copies, same width, used only for measuring. */}
        <div aria-hidden className="invisible absolute inset-x-3 top-3">
          <p ref={fallbackRef} style={{ fontFamily: fallback }}>
            {TEXT}
          </p>
          <p ref={fontRef} style={{ fontFamily }} className="absolute top-0">
            {TEXT}
          </p>
        </div>
      </div>
      <p className="text-xs text-zinc-600 dark:text-zinc-400">
        {heights
          ? `Text height: ${heights[0]}px → ${heights[1]}px. The button moves ${Math.abs(heights[1] - heights[0])}px.`
          : "Measuring…"}
      </p>
    </div>
  );
}
