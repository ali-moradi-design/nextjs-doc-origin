// Pretend this file is an npm package ("acme-rating") that uses useState
// but forgot to add "use client". Importing it straight into a Server
// Component fails. See _components/rating.tsx for the fix.
import { useState } from "react";

export function Rating({ max = 5 }: { max?: number }) {
  const [value, setValue] = useState(0);

  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Rating">
      {Array.from({ length: max }, (_, index) => {
        const star = index + 1;
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} stars`}
            onClick={() => setValue(star)}
            className={`text-2xl transition-transform hover:scale-110 ${
              star <= value ? "text-amber-400" : "text-zinc-300 dark:text-zinc-700"
            }`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
