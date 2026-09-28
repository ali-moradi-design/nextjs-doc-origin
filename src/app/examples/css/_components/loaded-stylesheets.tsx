"use client";

import { useState } from "react";
import { buttonClass } from "./ui/styles";

type Sheet = { href: string; rules: number };

// Lists the stylesheets the browser has loaded right now. In a production
// build these are the CSS chunks; compare the list across routes.
export function LoadedStylesheets() {
  const [sheets, setSheets] = useState<Sheet[] | null>(null);

  function readSheets() {
    setSheets(
      Array.from(document.styleSheets)
        .filter((sheet) => sheet.href)
        .map((sheet) => ({
          href: new URL(sheet.href!).pathname,
          rules: sheet.cssRules.length,
        })),
    );
  }

  return (
    <div className="space-y-3">
      <button type="button" onClick={readSheets} className={buttonClass}>
        List loaded stylesheets
      </button>
      {sheets && (
        <ul className="space-y-1 font-mono text-xs">
          {sheets.map((sheet) => (
            <li key={sheet.href}>
              {sheet.href} ({sheet.rules} rules)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
