import { Lora, Pacifico } from "next/font/google";
import localFont from "next/font/local";

// Font definitions file: each font is loaded once here and imported where
// needed. Options must be literal values, because next/font reads them at
// build time.

// Variable Google font: no weight needed, every weight from 400 to 700
// comes from one file.
export const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

// Not a variable font, so weight is required. Only this weight is
// downloaded. preload: false because it is only used lower on the page.
export const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  preload: false,
  fallback: ["cursive"],
});

// Local font, two files for one family. Space Mono (SIL Open Font
// License), latin subset from Google Fonts.
export const spaceMono = localFont({
  src: [
    { path: "../_fonts/space-mono-regular.woff2", weight: "400" },
    { path: "../_fonts/space-mono-bold.woff2", weight: "700" },
  ],
  variable: "--font-space-mono",
  fallback: ["monospace"],
});
