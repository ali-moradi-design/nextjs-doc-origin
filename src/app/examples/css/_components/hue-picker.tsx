"use client";

import { useState } from "react";

// The CSS variable is set from React state; the classes read it with
// bg-(--accent), Tailwind v4's shorthand for bg-[var(--accent)].
export function HuePicker() {
  const [hue, setHue] = useState(300);

  return (
    <div
      style={{ "--accent": `oklch(0.65 0.18 ${hue})` } as React.CSSProperties}
      className="flex flex-wrap items-center gap-4"
    >
      <input
        type="range"
        min={0}
        max={360}
        value={hue}
        onChange={(event) => setHue(Number(event.target.value))}
        aria-label="Hue"
      />
      <span className="rounded-lg bg-(--accent) px-4 py-2 text-sm font-medium text-white">
        bg-(--accent), hue {hue}
      </span>
    </div>
  );
}
