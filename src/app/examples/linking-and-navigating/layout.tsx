import NavLink from "./_components/nav-link";
import VisitCounter from "./_components/visit-counter";

const base = "/examples/linking-and-navigating";

export default function LinkingLayout({
  children,
}: LayoutProps<"/examples/linking-and-navigating">) {
  // This layout is shared by every page below it. During <Link> navigations
  // it is NOT re-rendered: the nav and the counter keep their state.
  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6">
      <nav className="mb-8 flex flex-wrap items-center gap-2 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <NavLink href={base} label="Overview" />
        <NavLink href={`${base}/products/1`} label="Static" />
        <NavLink href={`${base}/slow/1`} label="Dynamic + loading" />
        <NavLink
          href={`${base}/blocking/1`}
          label="Dynamic, no loading"
          prefetch={false}
        />
        <NavLink href={`${base}/sort`} label="Sort (pushState)" />
        <div className="ml-auto">
          <VisitCounter />
        </div>
      </nav>
      {children}
    </div>
  );
}
