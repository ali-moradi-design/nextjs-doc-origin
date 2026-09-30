"use client";

import { useEffect, useRef, useState } from "react";

const SAMPLE = "The quick brown fox jumps over the lazy dog";

type Row = { label: string; fontFamily: string };

// Measures the same sentence in the real font, in the adjusted fallback
// that next/font generates, and in the plain system font. The closer the
// fallback width is to the real one, the less the text moves (layout
// shift) when the real font arrives.
export function FallbackComparison({
  fontFamily,
  fallbackFamily,
}: {
  fontFamily: string;
  fallbackFamily: string;
}) {
  const rows: Row[] = [
    { label: "Lora (real font)", fontFamily },
    { label: `${fallbackFamily} (adjusted)`, fontFamily: fallbackFamily },
    { label: "Times New Roman (not adjusted)", fontFamily: "Times New Roman" },
  ];
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const [widths, setWidths] = useState<number[]>([]);
  const [rule, setRule] = useState("");

  useEffect(() => {
    document.fonts.ready.then(() => {
      setWidths(refs.current.map((el) => el?.offsetWidth ?? 0));
      setRule(findFontFaceRule(fallbackFamily.replaceAll("'", "")));
    });
  }, [fallbackFamily]);

  // local("Times New Roman") only works if that font is installed. If it
  // is not, the fallback renders exactly like the unadjusted row.
  const localFontMissing = widths.length > 0 && widths[1] === widths[2];

  return (
    <div className="space-y-4">
      <ul className="space-y-3">
        {rows.map((row, i) => (
          <li key={row.label} className="space-y-1">
            <span
              ref={(el) => {
                refs.current[i] = el;
              }}
              style={{ fontFamily: row.fontFamily }}
              className="text-lg whitespace-nowrap"
            >
              {SAMPLE}
            </span>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              {row.label}: {widths[i] ? `${widths[i]}px wide` : "measuring…"}
            </p>
          </li>
        ))}
      </ul>
      {localFontMissing && (
        <p className="text-xs text-amber-700 dark:text-amber-400">
          Times New Roman is not installed on this device, so the adjusted
          fallback cannot use it.
        </p>
      )}
      {rule && (
        <pre className="overflow-x-auto rounded-lg bg-zinc-100 p-3 text-xs whitespace-pre-wrap dark:bg-zinc-900">
          {rule}
        </pre>
      )}
    </div>
  );
}

// Reads the @font-face rule that next/font generated for the fallback.
function findFontFaceRule(family: string) {
  for (const sheet of document.styleSheets) {
    for (const rule of sheet.cssRules) {
      if (
        rule instanceof CSSFontFaceRule &&
        rule.style.getPropertyValue("font-family").includes(family)
      ) {
        return rule.cssText.replaceAll("; ", ";\n  ");
      }
    }
  }
  return "";
}
