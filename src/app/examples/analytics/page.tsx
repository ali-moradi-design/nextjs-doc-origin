import { DemoLink } from "./_components/demo-link";
import { ErrorButton } from "./_components/error-button";
import { EventLog } from "./_components/event-log";
import { GoogleReport } from "./_components/google-report";
import { LateBanner } from "./_components/late-banner";
import { ServerEvents } from "./_components/server-events";
import { SignUpButton } from "./_components/sign-up-button";
import { Section } from "./_components/ui/section";

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Analytics</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          src/instrumentation-client.ts records app start, navigations and
          errors; the WebVitals component in this example&apos;s layout records
          Web Vitals with useReportWebVitals. Every event is shown below and
          sent to a route handler with navigator.sendBeacon.
        </p>
      </header>

      <LateBanner />

      <Section
        title="1. Event log (this tab)"
        description="LCP, CLS and INP are reported when the tab is hidden: switch to another tab and come back to see them. INP needs a click first."
      >
        <EventLog />
      </Section>

      <Section
        title="2. Navigation tracking"
        description="onRouterTransitionStart runs at the start of every client-side navigation (push, replace or traverse for back/forward). A full reload does not call it."
      >
        <div className="flex gap-2">
          <DemoLink href="/examples/analytics/other">
            Go to another page
          </DemoLink>
        </div>
      </Section>

      <Section
        title="3. Error tracking"
        description="The window error listener in instrumentation-client records uncaught errors. In development the error overlay also opens."
      >
        <ErrorButton />
      </Section>

      <Section
        title="4. Sending to an endpoint"
        description="Each event is a POST to /_e. A rewrite in next.config.ts sends it to api/collect, which keeps the last 50 in memory. Ad blockers block URLs with words like analytics or collect, so the browser only sees the neutral path (DevTools > Network)."
      >
        <ServerEvents />
      </Section>

      <Section
        title="5. Google Analytics (fake Google)"
        description="The layout loads gtag.js with next/script, like @next/third-parties does. Here the script and the collect URL are a fake Google in fake-google/. It sends page_view on load and on every client-side navigation, web vitals and errors as events, and the sign_up event below. Set NEXT_PUBLIC_GA_ID and GTAG_SRC to use the real service."
      >
        <SignUpButton />
        <GoogleReport />
      </Section>
    </main>
  );
}
