"use client"; // Error boundaries must be Client Components

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    // A real app would send this to an error reporting service.
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-4 px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">
        Something went wrong!
      </h1>
      {/* In production, Server Component errors show a generic message;
          the digest matches the server logs. */}
      <p className="text-sm text-red-700 dark:text-red-400">{error.message}</p>
      {error.digest && (
        <p className="font-mono text-xs text-zinc-500">
          digest: {error.digest}
        </p>
      )}
      <div className="flex items-center gap-4">
        <button
          onClick={() => retry()}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          Try again
        </button>
        <Link
          href="/examples/error-handling"
          className="text-sm font-medium text-fuchsia-600 hover:underline dark:text-fuchsia-400"
        >
          ← Back to Error Handling
        </Link>
      </div>
    </main>
  );
}
