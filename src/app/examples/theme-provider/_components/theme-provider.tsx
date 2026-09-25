"use client";

import { createContext, use, useState } from "react";
import { THEME_COOKIE, type Theme } from "../_lib/theme";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

// `initialTheme` comes from the server (it read the cookie), so the very
// first HTML already has the right class: no flash of the wrong theme.
export default function ThemeProvider({
  initialTheme,
  children,
}: {
  initialTheme: Theme;
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState(initialTheme);

  function setTheme(next: Theme) {
    setThemeState(next);
    // Saved in a cookie (not localStorage) so the server can read it on the
    // next request. One year, whole site.
    document.cookie = `${THEME_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
  }

  // "light" / "dark" force a theme for everything inside this div.
  // "system" adds no class, so the dark: variant follows the OS setting.
  // See @custom-variant dark in globals.css.
  const themeClass = theme === "system" ? "" : theme;

  return (
    <ThemeContext value={{ theme, setTheme }}>
      <div
        className={`${themeClass} flex flex-1 flex-col bg-white text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100`}
      >
        {children}
      </div>
    </ThemeContext>
  );
}

export function useTheme() {
  const context = use(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
