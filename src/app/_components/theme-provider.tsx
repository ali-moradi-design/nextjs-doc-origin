"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

// next-themes renders an inline <script> that puts the right class on <html>
// before the first paint (no flash of the wrong theme), saves the choice in
// localStorage, and keeps other tabs in sync.
//
// When React renders a <script> itself (e.g. the root layout is rebuilt on
// the client after a server error or notFound()), the script never runs and
// React warns in development. So the server renders it as JavaScript and the
// client as "text/plain" (ignored). This check must live in a Client
// Component: in a Server Component `window` is always undefined.
const scriptProps = {
  type: typeof window === "undefined" ? "text/javascript" : "text/plain",
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      scriptProps={scriptProps}
    >
      {children}
    </NextThemesProvider>
  );
}
