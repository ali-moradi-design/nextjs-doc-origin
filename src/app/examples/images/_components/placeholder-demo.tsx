"use client";

import Image, { type ImageLoader, type ImageProps } from "next/image";
import { useState } from "react";
import mountains from "../_assets/mountains.jpg";
import {
  GRADIENT_PLACEHOLDER,
  MOUNTAINS_BLUR_DATA_URL,
  REMOTE_BASE,
} from "../_lib/constants";

type Card = { caption: string; props: Omit<ImageProps, "loader"> };

const cards: Card[] = [
  {
    caption: 'placeholder="empty" (default)',
    props: { src: mountains, alt: "Mountains, no placeholder" },
  },
  {
    caption: 'placeholder="blur", blurDataURL from the import',
    props: { src: mountains, alt: "Mountains, blur", placeholder: "blur" },
  },
  {
    caption: 'Remote image, placeholder="blur" + blurDataURL by hand',
    props: {
      src: `${REMOTE_BASE}/mountains.jpg`,
      alt: "Remote mountains, blur",
      width: 2800,
      height: 1900,
      placeholder: "blur",
      blurDataURL: MOUNTAINS_BLUR_DATA_URL,
    },
  },
  {
    caption: 'placeholder="data:image/svg+xml,…" (gradient)',
    props: {
      src: mountains,
      alt: "Mountains, gradient placeholder",
      placeholder: GRADIENT_PLACEHOLDER,
    },
  },
];

// A custom loader sends every request through /examples/images/slow,
// which waits 2 seconds. version changes the URL, so Reload loads again.
export function PlaceholderDemo() {
  const [version, setVersion] = useState(0);

  const slowLoader: ImageLoader = ({ src, width, quality }) =>
    `/examples/images/slow?${new URLSearchParams({
      url: src,
      w: String(width),
      q: String(quality ?? 75),
      v: String(version),
    })}`;

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setVersion((v) => v + 1)}
        className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
      >
        Reload images (2 s delay)
      </button>
      <div className="grid gap-6 sm:grid-cols-2">
        {cards.map(({ caption, props }) => (
          <figure key={`${caption}-${version}`} className="space-y-2">
            <div className="rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700">
              <Image
                {...props}
                alt={props.alt}
                loader={slowLoader}
                sizes="(max-width: 640px) 100vw, 340px"
                className="h-auto w-full rounded-lg"
              />
            </div>
            <figcaption className="text-sm font-medium">{caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
