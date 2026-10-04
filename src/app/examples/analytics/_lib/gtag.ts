// Google Analytics 4 (gtag.js) helpers. The code is the same as for the
// real service; only GTAG_SRC (and the collect URL inside the fake script)
// point to the fake Google in ../fake-google.

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-FAKE123456";

// Real Google: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`.
// The fake is served from a neutral first-party path (see next.config.ts),
// because ad blockers block URLs like /gtag/js.
export const GTAG_SRC = `/_g/t.js?id=${GA_ID}`;

type Params = Record<string, string | number | boolean>;
type GtagArgs =
  ["js", Date] | ["config", string, Params?] | ["event", string, Params?];

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

// Safe to call before gtag.js has loaded: commands wait in dataLayer, and
// gtag.js runs them when it starts.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function gtag(...args: GtagArgs) {
  window.dataLayer = window.dataLayer || [];
  // gtag.js expects the Arguments object itself, not an array.
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

// From the Next.js analytics guide: GA values must be integers, so CLS
// (a small decimal) is multiplied by 1000.
export function sendWebVital(metric: {
  name: string;
  value: number;
  id: string;
}) {
  gtag("event", metric.name, {
    value: Math.round(
      metric.name === "CLS" ? metric.value * 1000 : metric.value,
    ),
    event_label: metric.id, // unique to the current page load
    non_interaction: true, // does not affect the bounce rate
  });
}

// "exception" is GA4's recommended event for errors.
export function sendException(description: string) {
  gtag("event", "exception", { description, fatal: false });
}
