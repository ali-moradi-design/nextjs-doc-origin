export type Kind = "static" | "cached" | "request";

const kinds: Record<Kind, { label: string; className: string }> = {
  static: {
    label: "Static shell",
    className:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300",
  },
  cached: {
    label: "Cached",
    className:
      "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/50 dark:text-fuchsia-300",
  },
  request: {
    label: "Request time",
    className: "bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300",
  },
};

export function Tag({ kind }: { kind: Kind }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 font-mono text-[11px] font-semibold ${kinds[kind].className}`}
    >
      {kinds[kind].label}
    </span>
  );
}
