import Link from "next/link";
import { HuePicker } from "./_components/hue-picker";
import { LeakTarget } from "./_components/leak-target";
import { LoadedStylesheets } from "./_components/loaded-stylesheets";
import { OrderedButton } from "./_components/ordered-button";
import { ProductCard } from "./_components/product-card";
import { ProfileCard } from "./_components/profile-card";
import { ThemeTokens } from "./_components/theme-tokens";
import { Section } from "./_components/ui/section";
import { buttonClass, codeClass } from "./_components/ui/styles";

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">CSS</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Tailwind v4, CSS Modules, global CSS, import order and CSS chunks.
        </p>
      </header>

      <Section
        title="1. Tailwind v4: config in CSS"
        description={
          <>
            No tailwind.config.js. The tokens come from{" "}
            <code className={codeClass}>@theme</code> and the striped utility
            from <code className={codeClass}>@utility</code> in globals.css.
          </>
        }
      >
        <ThemeTokens />
      </Section>

      <Section
        title="2. CSS variables from React"
        description="A Client Component sets --accent in a style prop; the class bg-(--accent) reads it."
      >
        <HuePicker />
      </Section>

      <Section
        title="3. CSS Modules"
        description="Both files define a .card class. Each gets a unique name at build time, so they never collide."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <ProfileCard />
          <ProductCard />
        </div>
      </Section>

      <Section
        title="4. Import order decides CSS order"
        description="OrderedButton imports BaseButton before its own CSS module, so .primary comes later and overrides the gray background."
      >
        <OrderedButton />
      </Section>

      <Section
        title="5. Global CSS is not removed on navigation"
        description="Open the leak page, then come back with its link. The outline stays until a full reload."
      >
        <LeakTarget />
        <Link
          href="/examples/css/global-leak"
          className={`inline-block ${buttonClass}`}
        >
          Open the leak page →
        </Link>
      </Section>

      <Section
        title="6. CSS chunks (cssChunking)"
        description="Run pnpm build && pnpm start, then list the stylesheets here and on the leak page. Each file is a CSS chunk."
      >
        <LoadedStylesheets />
      </Section>
    </main>
  );
}
