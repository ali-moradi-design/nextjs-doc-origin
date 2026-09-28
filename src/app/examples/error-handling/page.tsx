import Link from "next/link";
import { ErrorBoundary } from "./_components/error-boundary";
import { EventHandlerError } from "./_components/event-handler-error";
import { ExchangeRate } from "./_components/exchange-rate";
import { FlakyStats } from "./_components/flaky-stats";
import { ProductForm } from "./_components/product-form";
import { ProductList } from "./_components/product-list";
import { TransitionError } from "./_components/transition-error";
import { Section } from "./_components/ui/section";
import { buttonClass } from "./_components/ui/styles";

// Rendered on every request, so the flaky widget really runs again.
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Error Handling
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Sections 1–3 are expected errors (returned as values). Sections 4–7
          are uncaught exceptions (thrown and caught by error boundaries).
        </p>
      </header>

      <Section
        title="1. Expected error in a Server Function"
        description="The action returns { error } instead of throwing; useActionState shows it. Try an empty name, a bad price, or the name Mouse."
      >
        <ProductForm />
        <ProductList />
      </Section>

      <Section
        title="2. Expected error in a Server Component"
        description="The fake API answers with ok: false. The component checks it and renders a message."
      >
        <ExchangeRate />
      </Section>

      <Section
        title="3. notFound() and not-found.tsx"
        description="The product page calls notFound() when the id does not exist."
      >
        <div className="flex flex-wrap gap-2">
          <Link
            href="/examples/error-handling/products/1"
            className={buttonClass}
          >
            Product 1 →
          </Link>
          <Link
            href="/examples/error-handling/products/999"
            className={buttonClass}
          >
            Product 999 →
          </Link>
        </div>
      </Section>

      <Section
        title="4. error.tsx for a route segment"
        description="The /crash page throws on every other request. Its error.tsx replaces only that page; the root layout (theme toggle) keeps working."
      >
        <Link
          href="/examples/error-handling/crash"
          className={`inline-block ${buttonClass}`}
        >
          Open the crash page →
        </Link>
      </Section>

      <Section
        title="5. catchError around a Server Component"
        description="This widget throws on every other render. Only the widget shows the fallback, not the whole page. Try again re-fetches it; Reset does not, so it stays broken."
      >
        <ErrorBoundary title="Stats widget failed">
          <FlakyStats />
        </ErrorBoundary>
      </Section>

      <Section
        title="6. Error in an event handler"
        description="Error boundaries ignore it, so the component catches it with try/catch and stores it in useState."
      >
        <EventHandlerError />
      </Section>

      <Section
        title="7. Error inside startTransition"
        description="This one does bubble up to the nearest error boundary."
      >
        <ErrorBoundary title="Checkout failed">
          <TransitionError />
        </ErrorBoundary>
      </Section>
    </main>
  );
}
