"use client";

import { createContext, use, useSyncExternalStore } from "react";
import { parseTheme, THEME_STORAGE_KEY, type Theme } from "../_lib/theme";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

// localStorage is an "external store": React doesn't own it, so we read it
// with useSyncExternalStore. The "storage" event also keeps other tabs in sync.
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  // Fired when *another* tab changes localStorage.
  function onStorage() {
    applyTheme(getSnapshot());
    onChange();
  }

  listeners.add(onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): Theme {
  try {
    return parseTheme(localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    return "system";
  }
}

// The server can't see localStorage, so it always renders "system". Only the
// toggle's highlighted button depends on this; the page colors come from the
// class the inline script already put on <html>.
function getServerSnapshot(): Theme {
  return "system";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  if (theme !== "system") root.classList.add(theme);
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function setTheme(next: Theme) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
    applyTheme(next);
    listeners.forEach((listener) => listener());
  }

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
}

export function useTheme() {
  const context = use(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
