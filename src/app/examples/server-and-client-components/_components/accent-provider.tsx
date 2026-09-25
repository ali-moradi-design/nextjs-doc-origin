"use client";

import { createContext, use, useState } from "react";

const accents = {
  violet: "bg-violet-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-400",
} as const;

export type Accent = keyof typeof accents;

type AccentContextValue = {
  accent: Accent;
  setAccent: (accent: Accent) => void;
};

// createContext only works in Client Components, so the provider lives here.
const AccentContext = createContext<AccentContextValue | null>(null);

export default function AccentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [accent, setAccent] = useState<Accent>("violet");

  return (
    <AccentContext value={{ accent, setAccent }}>{children}</AccentContext>
  );
}

export function useAccent() {
  const context = use(AccentContext);
  if (!context) throw new Error("useAccent must be used inside AccentProvider");
  return context;
}

export function accentClass(accent: Accent) {
  return accents[accent];
}

export const accentNames = Object.keys(accents) as Accent[];
