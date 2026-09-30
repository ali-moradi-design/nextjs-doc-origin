"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Tag = { key: string; label: string; value: string; inBody: boolean };

const selector = [
  "title",
  'meta[name="description"]',
  'meta[property^="og:"]',
  'meta[name^="twitter:"]',
  'link[rel~="icon"]',
].join(",");

function describe(element: Element, index: number): Tag {
  const key = `${index}`;
  const inBody = element.closest("body") !== null;
  if (element instanceof HTMLTitleElement) {
    return { key, label: "<title>", value: element.text, inBody };
  }
  if (element instanceof HTMLLinkElement) {
    const label = `<link rel="${element.rel}">`;
    return { key, label, value: element.href, inBody };
  }
  const name =
    element.getAttribute("property") ?? element.getAttribute("name") ?? "";
  const value = element.getAttribute("content") ?? "";
  return { key, label: name, value, inBody };
}

// Shows the metadata tags of the current page, so they can be read without
// DevTools. Streamed metadata can land in <body>, so the whole document is
// searched and those tags are marked. A MutationObserver catches metadata that is
// streamed in later or replaced after a client-side navigation.
export function HeadTags() {
  const pathname = usePathname();
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const read = () =>
      setTags([...document.querySelectorAll(selector)].map(describe));
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <aside className="space-y-3 rounded-2xl border border-dashed border-zinc-300 p-6 dark:border-zinc-700">
      <h2 className="font-semibold">Metadata tags on this page</h2>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs">
        {tags.map((tag) => (
          <div key={tag.key} className="contents">
            <dt className="font-mono text-zinc-500">{tag.label}</dt>
            <dd className="break-all">
              {tag.value}
              {tag.inBody && (
                <span className="ml-2 text-amber-600">(in body)</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
