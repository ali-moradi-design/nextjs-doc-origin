import { Tag, type Kind } from "./tag";

export function Card({
  kind,
  title,
  children,
}: {
  kind: Kind;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-medium">{title}</h3>
        <Tag kind={kind} />
      </div>
      <div className="space-y-1 text-sm">{children}</div>
    </div>
  );
}
