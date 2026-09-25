import { cookies } from "next/headers";
import ThemeProvider from "./_components/theme-provider";
import { parseTheme, THEME_COOKIE } from "./_lib/theme";

// A Server Component: it reads the cookie before any HTML is sent, then
// hands the value to the Client Component provider as a plain string prop.
// Reading cookies() makes this route dynamic (rendered on every request).
export default async function ThemeLayout({
  children,
}: LayoutProps<"/examples/theme-provider">) {
  const cookieStore = await cookies();
  const theme = parseTheme(cookieStore.get(THEME_COOKIE)?.value);

  // children (the page) is a Server Component passed through the Client
  // provider: this is interleaving.
  return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>;
}
