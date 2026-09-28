import Link from "next/link";
import { getReport } from "../_lib/data";

export const dynamic = "force-dynamic";

export default async function Page() {
  // Throws on every other call. Nothing catches it here, so it bubbles up
  // to crash/error.tsx.
  const report = await getReport();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-4 px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">{report.title}</h1>
      <p className="text-emerald-700 dark:text-emerald-400">
        Loaded on server call #{report.call}.
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
