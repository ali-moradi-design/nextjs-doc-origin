import { DemoLink } from "../_components/demo-link";
import { EventLog } from "../_components/event-log";
import { Section } from "../_components/ui/section";

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Another page</h1>
      <Section
        title="Same log, new page"
        description="This was a client-side navigation, so the events from the first page are still here, plus a navigation event. Use the link or the browser back button (traverse)."
      >
        <DemoLink href="/examples/analytics">Back to Analytics</DemoLink>
        <EventLog />
      </Section>
    </main>
  );
}
