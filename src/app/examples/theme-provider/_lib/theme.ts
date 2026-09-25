// Shared by Server and Client Components, so no "server-only" here.
export const themes = ["light", "dark", "system"] as const;

export type Theme = (typeof themes)[number];

export const THEME_COOKIE = "theme";

// Cookies are user input: never trust the value, fall back to "system".
export function parseTheme(value: string | undefined): Theme {
  return themes.includes(value as Theme) ? (value as Theme) : "system";
}
