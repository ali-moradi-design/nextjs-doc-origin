"use client";

import { useState, useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

// The time this page was mounted in the browser. Compare it with the
// "loaded at" times on the server: a server time BEFORE this one means the
// content was already there when you clicked (it came from a prefetch).
export function ArrivedAt() {
  const isClient = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return (
    <p className="text-sm text-zinc-500">
      You arrived at{" "}
      {isClient ? <MountedTime /> : <span className="font-mono">…</span>}
    </p>
  );
}

function MountedTime() {
  const [time] = useState(() => new Date().toLocaleTimeString("en-US"));
  return <span className="font-mono">{time}</span>;
}
