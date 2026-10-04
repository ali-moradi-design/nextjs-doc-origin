import { fakeGtagScript } from "../../_lib/fake-gtag-script";

// Plays the role of https://www.googletagmanager.com/gtag/js.
// Built once, like a file on a CDN.
export const dynamic = "force-static";

export function GET() {
  return new Response(fakeGtagScript("/_g/c"), {
    headers: { "Content-Type": "text/javascript; charset=utf-8" },
  });
}
