"use client";

import { useEffect, useState } from "react";

const files = ["/robots.txt", "/sitemap.xml"];

// Fetches the two generated files and prints them as plain text.
export function CrawlerFiles() {
  const [texts, setTexts] = useState<string[] | null>(null);

  useEffect(() => {
    Promise.all(
      files.map((file) => fetch(file).then((response) => response.text())),
    ).then(setTexts);
  }, []);

  return (
    <div className="space-y-4">
      {files.map((file, index) => (
        <div key={file} className="space-y-1">
          <a href={file} className="font-mono text-sm underline">
            {file}
          </a>
          <pre className="max-h-64 overflow-auto rounded-lg bg-zinc-100 p-3 text-xs dark:bg-zinc-900">
            {texts ? texts[index] : "Loading…"}
          </pre>
        </div>
      ))}
    </div>
  );
}
