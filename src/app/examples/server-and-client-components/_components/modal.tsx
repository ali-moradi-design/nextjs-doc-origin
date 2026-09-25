"use client";

import { useState } from "react";
import Boundary from "./boundary";

// A Client Component with a `children` slot. Whatever the parent passes as
// children is already rendered by the time it gets here, so it can be a
// Server Component. Modal only decides whether to show it.
export default function Modal({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Boundary kind="client" name="Modal">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80 dark:bg-white dark:text-zinc-900"
      >
        {isOpen ? "Close" : "Open"} {title}
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </Boundary>
  );
}
