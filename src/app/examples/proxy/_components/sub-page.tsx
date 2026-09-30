import { BASE_PATH } from "../_lib/constants";
import { DemoLink } from "./demo-link";

// Frame for the small pages the proxy sends you to.
export function SubPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <div className="space-y-4 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
        {children}
      </div>
      <DemoLink href={BASE_PATH}>Back to Proxy</DemoLink>
    </main>
  );
}
