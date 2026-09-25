"use client";

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
  light: "Light theme",
  dark: "Dark theme",
  system: "System theme",
};

// Floating, site-wide. The only component that needs to *know* the theme;
// every other component just uses dark: classes.
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="fixed right-4 bottom-4 z-50 inline-flex rounded-full border border-zinc-200 bg-white/80 p-1 shadow-lg backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80"
    >
      {themes.map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={theme === option}
          aria-label={labels[option]}
          title={labels[option]}
          onClick={() => setTheme(option)}
          className={`rounded-full p-2 transition-colors ${
            theme === option
              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
              : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
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
        </button>
      ))}
    </div>
  );
}
