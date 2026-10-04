// Runs once in the browser, after the HTML loads and before React hydrates.
// It applies to the whole app; the analytics example shows what it records.
import { track } from "./app/examples/analytics/_lib/events";
import { sendException } from "./app/examples/analytics/_lib/gtag";

try {
  performance.mark("app-init");
  track({
    type: "init",
    label: "instrumentation-client",
    detail: "Ran before hydration",
  });

  window.addEventListener("error", (event) => {
    track({ type: "error", label: "window error", detail: event.message });
    // Queued in dataLayer until gtag.js loads.
    sendException(event.message);
  });
} catch (error) {
  // Analytics must never break the app.
  console.error("Analytics setup failed", error);
}

// Called at the start of every client-side (App Router) navigation.
export function onRouterTransitionStart(
  url: string,
  navigationType: "push" | "replace" | "traverse",
) {
  track({ type: "navigation", label: navigationType, detail: url });
}
