"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LinkHint from "./link-hint";

export default function NavLink({
  href,
  label,
  prefetch,
}: {
  href: string;
  label: string;
  prefetch?: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      prefetch={prefetch}
      className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
        isActive
          ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
          : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
      }`}
    >
      {label}
      <LinkHint />
    </Link>
  );
}
