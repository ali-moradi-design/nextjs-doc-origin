"use client";

// A <script> that runs only when the browser parses the server HTML.
//
// When React renders a <script> itself (e.g. the root layout is rebuilt on
// the client after a server error or notFound()), the script never runs and
// React warns in development. So the server renders it as JavaScript, the
// client renders it as "text/plain" (ignored), and suppressHydrationWarning
// accepts the different type. It must be a Client Component: in a Server
// Component `window` is always undefined, so the type would never change.
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
