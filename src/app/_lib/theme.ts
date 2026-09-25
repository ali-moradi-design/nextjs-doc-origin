// Shared by the root layout (server) and the theme components (client).
export const themes = ["light", "dark", "system"] as const;

export type Theme = (typeof themes)[number];

export const THEME_STORAGE_KEY = "theme";

// Stored values are user input: never trust them, fall back to "system".
export function parseTheme(value: string | null | undefined): Theme {
  return themes.includes(value as Theme) ? (value as Theme) : "system";
}

// Runs in the browser *before* the page is painted (see layout.tsx), so the
// right class is on <html> from the very first frame: no flash of the wrong
// theme. It must be plain, self-contained JavaScript: it runs before React.
export const themeScript = `(() => {
  try {
    const theme = localStorage.getItem("${THEME_STORAGE_KEY}");
    if (theme === "light" || theme === "dark") {
      document.documentElement.classList.add(theme);
    }
  } catch {}
})();`;
