import Link from "next/link";

const links = [
  { href: "/examples/revalidating/stale", label: "Start" },
  { href: "/examples/revalidating/stale/short", label: "Page A (stale 30s)" },
  { href: "/examples/revalidating/stale/long", label: "Page B (stale 5 min)" },
];

export function StaleNav() {
  return (
    <nav className="flex flex-wrap gap-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
