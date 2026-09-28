"use client";

import { useEffect, useState } from "react";

// The browser's own clock, to compare with the time the server made the
// value. Empty on the server so the HTML never mismatches.
export function BrowserClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US"));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="font-mono">{time}</span>;
}
