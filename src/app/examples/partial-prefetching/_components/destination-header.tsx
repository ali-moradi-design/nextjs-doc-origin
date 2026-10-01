import Link from "next/link";
import { basePath } from "../_lib/constants";
import { ArrivedAt } from "./arrived-at";

export function DestinationHeader({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <header className="space-y-2">
      <Link
        href={basePath}
        className="text-sm text-zinc-500 underline-offset-4 hover:underline"
      >
        ← Partial Prefetching
      </Link>
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="text-zinc-600 dark:text-zinc-400">{children}</p>
      <ArrivedAt />
    </header>
  );
}
