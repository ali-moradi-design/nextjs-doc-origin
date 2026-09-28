import { Section } from "@/src/app/_components/ui/section";
import { BumpButton } from "../_components/bump-button";
import { StaleNav } from "../_components/stale-nav";
import { StaleSteps } from "../_components/stale-steps";

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          cacheLife: stale
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          <code>stale</code> is how long the browser reuses a page it already
          has, without asking the server. It only matters when you move between
          pages with <code>&lt;Link&gt;</code>. Try it in production (
          <code>pnpm build</code> then <code>pnpm start</code>).
        </p>
      </header>

      <StaleNav />

      <Section
        title="Try it"
        description="Page A and Page B read the same counter. Only their stale time is different."
      >
        <StaleSteps />
        <BumpButton />
      </Section>
    </main>
  );
}
