"use client";

import { useEffect, useState } from "react";

// Appears 1 s after load and pushes the content below it down: a layout
// shift that is not caused by user input, so it counts toward CLS.
export function LateBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="rounded-2xl bg-amber-100 p-6 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-200">
      A late banner: it showed up after the page painted and moved everything
      below it.
    </div>
  );
}
