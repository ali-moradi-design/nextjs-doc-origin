"use client";

import { useEffect, useState } from "react";

type Info = { preloaded: string[]; downloaded: string[] };

// Lists the <link rel="preload" as="font"> tags and every font file the
// page downloaded. All of them come from /_next/static/media, never from
// fonts.googleapis.com or fonts.gstatic.com.
export function LoadedFonts() {
  const [info, setInfo] = useState<Info | null>(null);

  useEffect(() => {
    const read = () =>
      setInfo({
        preloaded: [
          ...document.querySelectorAll<HTMLLinkElement>(
            'link[rel="preload"][as="font"]',
          ),
        ].map((link) => new URL(link.href).pathname),
        downloaded: performance
          .getEntriesByType("resource")
          .map((entry) => new URL(entry.name))
          .filter((url) => url.pathname.endsWith(".woff2"))
          .map((url) => `${url.host}${url.pathname}`),
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
          {info.downloaded.map((href) => (
            <li key={href}>{href}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
