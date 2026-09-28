"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type Info = {
  currentSrc: string;
  srcset: string;
  natural: string;
  downloaded: string;
};

// Wraps <Image> and, once it loads, shows what the browser actually got.
// onLoad is a function prop, so this has to be a Client Component.
export function ImageInspector({
  caption,
  ...props
}: ImageProps & { caption: string }) {
  const [info, setInfo] = useState<Info | null>(null);

  function handleLoad(event: React.SyntheticEvent<HTMLImageElement>) {
    const img = event.currentTarget;
    const entry = performance.getEntriesByName(img.currentSrc)[0] as
      PerformanceResourceTiming | undefined;
    const bytes = entry?.encodedBodySize ?? 0;

    setInfo({
      currentSrc: decodeURIComponent(
        img.currentSrc.replace(location.origin, ""),
      ),
      srcset: img.getAttribute("srcset") ?? "(none)",
      natural: `${img.naturalWidth} × ${img.naturalHeight}`,
      downloaded: bytes ? `${(bytes / 1024).toFixed(1)} KB` : "(cached)",
    });
  }

  return (
    <figure className="space-y-2">
      <Image {...props} alt={props.alt} onLoad={handleLoad} />
      <figcaption className="text-sm font-medium">{caption}</figcaption>
      {info && (
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs break-all text-zinc-600 dark:text-zinc-400">
          <dt className="font-medium">currentSrc</dt>
          <dd>{info.currentSrc}</dd>
          <dt className="font-medium">srcset</dt>
          <dd>{info.srcset}</dd>
          <dt className="font-medium">natural size</dt>
          <dd>{info.natural}</dd>
          <dt className="font-medium">downloaded</dt>
          <dd>{info.downloaded}</dd>
        </dl>
      )}
    </figure>
  );
}
