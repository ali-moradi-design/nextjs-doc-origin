import NavLink from "./_components/nav-link";
import { experiments } from "./_lib/experiments";

export default function FetchingDataLayout({
  children,
}: LayoutProps<"/examples/fetching-data">) {
  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6">
      <nav className="mb-8 flex flex-wrap gap-1 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <NavLink href="/examples/fetching-data">Overview</NavLink>
        {experiments.map((experiment) => (
          <NavLink key={experiment.href} href={experiment.href}>
            {experiment.label}
          </NavLink>
        ))}
      </nav>
      {children}
    </div>
  );
}
