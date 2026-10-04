import { getSession, getUser } from "../_lib/dal";
import { PATHS } from "../_lib/constants";
import { LogoutButton } from "./logout-button";
import { DemoLink } from "./ui/demo-link";

// Reads cookies, so it is wrapped in <Suspense> by the page: the rest of
// the page does not wait for it.
export async function UserMenu() {
  // getSession() does not redirect: logged out is a normal state here.
  const session = await getSession();

  if (!session) {
    return (
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-zinc-500">Not logged in.</span>
        <DemoLink href={PATHS.login}>Log in</DemoLink>
        <DemoLink href={PATHS.signup}>Sign up</DemoLink>
      </div>
    );
  }

  const user = await getUser();
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span>
        Logged in as <strong>{user?.name ?? "a deleted user"}</strong> (
        {session.role})
      </span>
      <DemoLink href={PATHS.dashboard}>Dashboard</DemoLink>
      <LogoutButton />
    </div>
  );
}
