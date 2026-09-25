"use client";

import { accentClass, accentNames, useAccent } from "./accent-provider";
import Boundary from "./boundary";

export default function AccentPicker() {
  const { accent, setAccent } = useAccent();

  return (
    <Boundary kind="client" name="AccentPicker">
      <div className="flex flex-wrap gap-2">
        {accentNames.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setAccent(name)}
            aria-pressed={accent === name}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm capitalize transition-colors ${
              accent === name
                ? "border-zinc-900 dark:border-white"
                : "border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            }`}
          >
            <span className={`size-3 rounded-full ${accentClass(name)}`} />
            {name}
          </button>
        ))}
      </div>
    </Boundary>
  );
}
