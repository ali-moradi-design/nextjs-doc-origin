// No "use client" and no hooks: this is a *shared* component.
// A Server Component can render it (it stays on the server), and a Client
// Component can render it (it gets bundled for the browser). It just draws a
// labelled dashed box so you can see where each component runs.
export default function Boundary({
  kind,
  name,
  children,
}: {
  kind: "server" | "client";
  name: string;
  children: React.ReactNode;
}) {
  const isServer = kind === "server";

  return (
    <div
      className={`relative rounded-xl border-2 border-dashed p-4 pt-7 ${
        isServer
          ? "border-emerald-400 dark:border-emerald-700"
          : "border-sky-400 dark:border-sky-700"
      }`}
    >
      <span
        className={`absolute -top-3 left-3 rounded-full px-2.5 py-0.5 font-mono text-xs font-semibold ${
          isServer
            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
            : "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200"
        }`}
      >
        {isServer ? "Server" : "Client"} · &lt;{name} /&gt;
      </span>
      {children}
    </div>
  );
}
