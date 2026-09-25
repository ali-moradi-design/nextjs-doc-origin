"use client";

import Link from "next/link";
import { useState } from "react";

// Prefetches only when the user hovers, instead of when the link enters
// the viewport. `null` restores the default prefetch behavior.
export default function HoverPrefetchLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(false);

  return (
    <Link
      href={href}
      prefetch={active ? null : false}
      onMouseEnter={() => setActive(true)}
      className={className}
    >
      {children}
    </Link>
  );
}
