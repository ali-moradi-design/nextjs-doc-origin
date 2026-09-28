import Link from "next/link";
import { Suspense } from "react";
import { Section } from "@/src/app/_components/ui/section";
import { Skeleton } from "@/src/app/_components/ui/skeleton";
import {
  editHeadlineInCms,
  raisePrice,
  revalidateWholePage,
} from "./_lib/actions";
import { ActionButton } from "./_components/action-button";
import { ClockCard } from "./_components/clock-card";
import { HeadlineCard } from "./_components/headline-card";
import { LiveValue } from "./_components/live-value";
import { PostForm } from "./_components/post-form";
import { PostList } from "./_components/post-list";
import { PriceCard } from "./_components/price-card";
import { WebhookButton } from "./_components/webhook-button";

// Every cached card is part of the static shell. Watch the "Cached at"
// times and the [db] lines in the terminal to see when a cache refreshes.
export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Revalidating</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Keeping cached data fresh: by time with <code>cacheLife</code>, or on
          demand with <code>updateTag</code>, <code>revalidateTag</code> and{" "}
          <code>revalidatePath</code>. Try it in production (
          <code>pnpm build</code> then <code>pnpm start</code>).
        </p>
      </header>

      <Section
        title="1. Time-based: cacheLife"
        description="revalidate: 20 seconds. Refresh within 20s: same time. Wait longer and refresh: still the old time (stale-while-revalidate), but a new one is made in the background. Refresh once more: the new time."
      >
        <ClockCard />
      </Section>

      <Section
        title="2. updateTag in a Server Action"
        description="Read-your-own-writes: the cache expires immediately, so the new post shows in the same response. No refresh needed."
      >
        <PostForm />
        <PostList />
      </Section>

      <Section
        title='3. revalidateTag(tag, "max") in a Server Action'
        description="Click: nothing changes on screen, revalidateTag doesn't re-render the page. Refresh: the database shows the new price, but the cache may still serve the old one (stale) while a fresh one is made in the background. Refresh again: the new price."
      >
        <ActionButton action={raisePrice} label="Raise price by $10" />
        <div className="grid gap-4 sm:grid-cols-2">
          <PriceCard />
          <Suspense fallback={<Skeleton title="Database right now" />}>
            <LiveValue field="price" />
          </Suspense>
        </div>
      </Section>

      <Section
        title="4. revalidateTag in a Route Handler (webhook)"
        description="CMS content is cached with cacheLife('max') and never refreshes by time. Edit it: the database changes, the cache doesn't. Then let the CMS call the webhook and refresh twice: stale first, then the new headline."
      >
        <div className="flex flex-wrap items-start gap-2">
          <ActionButton action={editHeadlineInCms} label="Edit in CMS" />
          <WebhookButton />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <HeadlineCard />
          <Suspense fallback={<Skeleton title="Database right now" />}>
            <LiveValue field="headline" />
          </Suspense>
        </div>
      </Section>

      <Section
        title="5. revalidatePath"
        description="Invalidates everything cached for this route, whatever its tag: every “Cached at” time on this page changes. Handy when you don't know the tags, but it refreshes more than needed."
      >
        <ActionButton
          action={revalidateWholePage}
          label="revalidatePath('/examples/revalidating')"
        />
      </Section>

      <Section
        title="6. cacheLife: stale"
        description="stale is about the browser, not the server. It needs moving between pages, so it has its own example."
      >
        <Link href="/examples/revalidating/stale" className="text-sm underline">
          Open the stale example
        </Link>
      </Section>
    </main>
  );
}
