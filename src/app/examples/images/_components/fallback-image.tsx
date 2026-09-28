"use client";

import Image from "next/image";
import { useState } from "react";

// onError runs when the image fails to load; here we swap in a fallback.
export function FallbackImage() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-32 w-48 items-center justify-center rounded-lg border border-dashed border-zinc-400 text-sm text-zinc-500">
        Image not found
      </div>
    );
  }

  return (
    <Image
      src="/images/missing.jpg"
      alt="An image that does not exist"
      width={192}
      height={128}
      onError={() => setFailed(true)}
      className="rounded-lg"
    />
  );
}
