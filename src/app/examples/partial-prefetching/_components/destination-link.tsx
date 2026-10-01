import Link from "next/link";

// One link plus the <Link> props it uses, so you can see which prefetch
// mode each card triggers.
export function DestinationLink({
  href,
  prefetch,
  label,
  note,
}: {
  href: string;
  prefetch?: boolean;
  label: string;
  note: string;
}) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className="block space-y-1 rounded-xl border border-zinc-200 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
    >
      <span className="font-medium">{label}</span>
      <code className="block font-mono text-xs text-zinc-500">
        {prefetch ? "<Link prefetch={true}>" : "<Link>"}
      </code>
      <span className="block text-sm text-zinc-600 dark:text-zinc-400">
        {note}
      </span>
    </Link>
  );
}
