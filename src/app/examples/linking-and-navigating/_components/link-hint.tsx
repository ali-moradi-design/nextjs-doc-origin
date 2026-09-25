"use client";

import { useLinkStatus } from "next/link";

// Must be rendered inside a <Link>. `pending` is true while that link's
// navigation is in progress. Styles live in globals.css (.link-hint).
export default function LinkHint() {
  const { pending } = useLinkStatus();
  return (
    <span aria-hidden className={`link-hint ${pending ? "is-pending" : ""}`} />
  );
}
