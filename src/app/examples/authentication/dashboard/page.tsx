import Link from "next/link";
import { AccountGone } from "../_components/account-gone";
import { AdminApiChecker } from "../_components/admin-api-checker";
import { ForbiddenTry } from "../_components/forbidden-try";
import { LogoutButton } from "../_components/logout-button";
import { Members } from "../_components/members";
import { SessionInfo } from "../_components/session-info";
import { Section } from "../_components/ui/section";
import { PATHS } from "../_lib/constants";
import { getUser } from "../_lib/dal";

// The auth check lives in the page (through the DAL), not in a layout:
// layouts don't re-render on navigation, and they can't stop the page
// below them from rendering.
export default async function Page() {
  // Redirects to login when there is no valid session.
  const user = await getUser();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href={PATHS.home} className="text-sm text-zinc-500 underline">
            ← Authentication
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight">
            {user ? `Welcome, ${user.name}` : "Dashboard"}
          </h1>
        </div>
        <LogoutButton />
      </header>

      {user ? (
        <>
          <Section
            title="Your session"
            description="Decrypted from the cookie by verifySession(). Reload the page: the proxy refreshed the cookie, so the expiry moves (the page shows the cookie it received, one request behind)."
          >
            <SessionInfo />
          </Section>

          <Section
            title="Members (DAL + DTO)"
            description="getMembers() returns DTOs: other members' emails are only sent to admins. The delete buttons come from a leaf component that renders nothing for non-admins."
          >
            <Members />
          </Section>

          <Section
            title="Server Actions check auth too"
            description="This button calls the admin-only deleteMember() action even if you are not an admin. The action checks the role from the database and refuses."
          >
            <ForbiddenTry />
          </Section>

          <Section
            title="Route Handler"
            description="Same endpoint as on the main page: 403 for users, 200 for admins."
          >
            <AdminApiChecker />
          </Section>
        </>
      ) : (
        <AccountGone />
      )}
    </main>
  );
}
