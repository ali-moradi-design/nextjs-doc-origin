"use client";

import { useSyncExternalStore } from "react";
import { themes, type Theme } from "../_lib/theme";
import { useTheme } from "./theme-provider";

// Inline SVG paths (24x24, stroked), so the icons look the same on every OS.
const icons: Record<Theme, React.ReactNode> = {
  light: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  dark: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />,
  system: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
};

const labels: Record<Theme, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

const darkQuery = "(prefers-color-scheme: dark)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(darkQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

// The OS preference only exists in the browser. On the server it is null.
function useSystemTheme() {
  return useSyncExternalStore(
    subscribe,
    () => (window.matchMedia(darkQuery).matches ? "dark" : "light"),
    () => null,
  );
}

// The only components on the page that need to *know* the theme are this
// toggle and its hint. Everything else just uses dark: classes.
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const systemTheme = useSystemTheme();

  return (
    <div className="flex flex-col items-start gap-2 sm:items-end">
      <div
        role="radiogroup"
        aria-label="Theme"
        className="inline-flex rounded-full border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-zinc-900"
      >
        {themes.map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={theme === option}
            onClick={() => setTheme(option)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              theme === option
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              {icons[option]}
            </svg>
            {labels[option]}
          </button>
        ))}
      </div>
      <p className="text-xs text-zinc-500">
        {theme === "system"
          ? `Following your OS${systemTheme ? `: ${systemTheme}` : ""}`
          : `Forced ${theme}, OS setting ignored`}
      </p>
    </div>
  );
}
