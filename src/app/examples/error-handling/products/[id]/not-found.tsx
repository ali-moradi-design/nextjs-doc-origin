import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-4 px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">
        404 – Product not found
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        This comes from products/[id]/not-found.tsx.
      </p>
      <Link
        href="/examples/error-handling"
        className="text-sm font-medium text-fuchsia-600 hover:underline dark:text-fuchsia-400"
      >
        ← Back to Error Handling
      </Link>
    </main>
  );
}
