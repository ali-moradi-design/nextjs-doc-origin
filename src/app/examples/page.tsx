import Link from "next/link";

const examples = [
  {
    href: "/examples/linking-and-navigating",
    title: "Linking and Navigating",
    description: "Prefetching, streaming, client-side transitions, useLinkStatus.",
  },
  {
    href: "/examples/server-and-client-components",
    title: "Server and Client Components",
    description: "use client boundary, props, interleaving, context, server-only.",
  },
  {
    href: "/examples/theme-provider",
    title: "Theme Provider (dark mode)",
    description: "Client provider, Server children, cookies, no flash on load.",
  },
];

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Examples</h1>
      <ul className="space-y-3">
        {examples.map((example) => (
          <li key={example.href}>
            <Link
              href={example.href}
              className="block rounded-2xl border border-zinc-200 p-5 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              <h2 className="font-semibold">{example.title}</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {example.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
