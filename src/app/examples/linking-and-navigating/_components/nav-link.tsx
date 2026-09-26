"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import LinkHint from "./link-hint";

type NavLinkProps = {
  href: string;
  label: string;
  prefetch?: boolean;
};

function linkClass(isActive: boolean) {
  return `inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
    isActive
      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
      : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
  }`;
}

function NavLinkView({ href, label, prefetch, isActive }: NavLinkProps & { isActive: boolean }) {
  return (
    <Link href={href} prefetch={prefetch} className={linkClass(isActive)}>
      {label}
      <LinkHint />
    </Link>
  );
}

function ActiveNavLink(props: NavLinkProps) {
  const isActive = usePathname() === props.href;
  return <NavLinkView {...props} isActive={isActive} />;
}

// Cache Components: on routes like /slow/[id] the URL is not known at build
// time, so usePathname() must be inside <Suspense>. The static shell shows
// the plain link; the active style is added once the URL is known.
export default function NavLink(props: NavLinkProps) {
  return (
    <Suspense fallback={<NavLinkView {...props} isActive={false} />}>
      <ActiveNavLink {...props} />
    </Suspense>
  );
}
