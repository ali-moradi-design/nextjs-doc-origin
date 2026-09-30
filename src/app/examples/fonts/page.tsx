import { ApplyStyles } from "./_components/apply-styles";
import { FallbackComparison } from "./_components/fallback-comparison";
import { FontObject } from "./_components/font-object";
import { GoogleStaticFont } from "./_components/google-static-font";
import { GoogleVariableFont } from "./_components/google-variable-font";
import { LoadedFonts } from "./_components/loaded-fonts";
import { LocalFont } from "./_components/local-font";
import { LocalFontTips } from "./_components/local-font-tips";
import { Section } from "./_components/ui/section";
import { lora } from "./_lib/fonts";

export default function Page() {
  // lora.style.fontFamily looks like "'Lora', 'Lora Fallback'".
  const fallbackFamily = lora.style.fontFamily.split(",")[1].trim();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Fonts</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          next/font downloads fonts at build time and serves them from this
          site. The fonts are defined once in _lib/fonts.ts.
        </p>
      </header>

      <Section
        title="1. Google font, variable"
        description="Lora is a variable font: one file, any weight from 400 to 700."
      >
        <GoogleVariableFont />
      </Section>

      <Section
        title="2. Google font, not variable"
        description="Pacifico needs weight: '400'. Asking for bold gives a faked bold."
      >
        <GoogleStaticFont />
      </Section>

      <Section
        title="3. Local font with next/font/local"
        description="Two .woff2 files in _fonts, one per weight, in a single family."
      >
        <LocalFont />
      </Section>

      <Section
        title="4. className, style or a CSS variable"
        description="The variable option plus Tailwind's font-(family-name:--var) syntax."
      >
        <ApplyStyles />
      </Section>

      <Section
        title="5. What the loader returns"
        description="className and variable are generated class names; style holds the font-family with its fallback."
      >
        <FontObject />
      </Section>

      <Section
        title="6. Fallback font and layout shift"
        description="adjustFontFallback builds a fallback from a system font, resized to match Lora. Compare the widths."
      >
        <FallbackComparison
          fontFamily={lora.style.fontFamily}
          fallbackFamily={fallbackFamily}
        />
      </Section>

      <Section
        title="7. Self-hosting and preloading"
        description="Font files read from the browser after load. Pacifico has preload: false, so it is downloaded but not preloaded."
      >
        <LoadedFonts />
      </Section>

      <Section
        title="8. Tips for next/font/local"
        description="Which file format to use and how to write paths that build on Windows, macOS and Linux."
      >
        <LocalFontTips />
      </Section>
    </main>
  );
}
