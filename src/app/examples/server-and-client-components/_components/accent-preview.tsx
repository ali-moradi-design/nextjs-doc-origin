"use client";

import { accentClass, useAccent } from "./accent-provider";
import Boundary from "./boundary";

export default function AccentPreview() {
  const { accent } = useAccent();

  return (
    <Boundary kind="client" name="AccentPreview">
      <div
        className={`h-16 rounded-lg transition-colors ${accentClass(accent)}`}
      />
      <p className="mt-2 text-sm">
        Current accent: <span className="font-mono">{accent}</span>
      </p>
    </Boundary>
  );
}
