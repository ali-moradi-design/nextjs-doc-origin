"use client";

import { useEffect, useState } from "react";

type Info = { preloaded: string[]; downloaded: [string, number][] };

// The same file can appear more than once (a preload plus the real use,
// DevTools "Disable cache", a later client navigation), so count it.
function countBy(items: string[]) {
  const counts = new Map<string, number>();
  for (const item of items) counts.set(item, (counts.get(item) ?? 0) + 1);
  return [...counts];
}

// Lists the <link rel="preload" as="font"> tags and every font file the
// page downloaded. All of them come from /_next/static/media, never from
// fonts.googleapis.com or fonts.gstatic.com.
export function LoadedFonts() {
  const [info, setInfo] = useState<Info | null>(null);

  useEffect(() => {
    const read = () =>
      setInfo({
        preloaded: [
          ...new Set(
            [
              ...document.querySelectorAll<HTMLLinkElement>(
                'link[rel="preload"][as="font"]',
              ),
            ].map((link) => new URL(link.href).pathname),
          ),
        ],
        downloaded: countBy(
          performance
            .getEntriesByType("resource")
            .map((entry) => new URL(entry.name))
            .filter((url) => url.pathname.endsWith(".woff2"))
            .map((url) => `${url.host}${url.pathname}`),
        ),
      });
    document.fonts.ready.then(read);
  }, []);

  if (!info) return <p className="text-sm">Reading…</p>;

  return (
    <div className="space-y-3 text-xs break-all">
      <div>
        <p className="font-medium">
          Preloaded ({info.preloaded.length}), from the root layout and this
          page:
        </p>
        <ul className="list-disc pl-5 text-zinc-600 dark:text-zinc-400">
          {info.preloaded.map((href) => (
            <li key={href}>{href}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className="font-medium">Downloaded ({info.downloaded.length}):</p>
        <ul className="list-disc pl-5 text-zinc-600 dark:text-zinc-400">
          {info.downloaded.map(([href, count]) => (
            <li key={href}>
              {href}
              {count > 1 && ` (requested ${count} times)`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
