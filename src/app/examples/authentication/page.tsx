import { Suspense } from "react";
import { CookiePeek } from "./_components/cookie-peek";
import { AdminApiChecker } from "./_components/admin-api-checker";
import { DemoLink } from "./_components/ui/demo-link";
import { Section } from "./_components/ui/section";
import { UserMenu } from "./_components/user-menu";
import { PATHS, SESSION_COOKIE } from "./_lib/constants";

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Authentication
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Sign up and log in with react-hook-form and Server Actions, a
          stateless session in a signed cookie (jose), an optimistic check in
          the proxy, and secure checks in a Data Access Layer.
        </p>
        {/* Only the user menu reads cookies; the rest streams first. */}
        <Suspense
          fallback={<p className="text-sm text-zinc-500">Checking session…</p>}
        >
          <UserMenu />
        </Suspense>
      </header>

      <Section
        title="1. Sign up and log in"
        description="The forms validate in the browser with the same zod schema the Server Action uses on the server. Server errors (email taken, wrong password) are shown with setError(). On success the action creates the session and redirects."
      >
        <div className="flex flex-wrap gap-2">
          <DemoLink href={PATHS.signup}>Sign up</DemoLink>
          <DemoLink href={PATHS.login}>Log in</DemoLink>
        </div>
        <p className="text-sm text-zinc-500">
          Demo accounts: admin@example.com / Admin123! and bob@example.com /
          User123!
        </p>
      </Section>

      <Section
        title="2. The session cookie"
        description={`After logging in, the browser has a "${SESSION_COOKIE}" cookie: a JWT with only userId, role and an expiry, signed with SESSION_SECRET. It is httpOnly, so page JavaScript can't see it.`}
      >
        <CookiePeek />
      </Section>

      <Section
        title="3. Optimistic check in the proxy"
        description="Without a valid cookie, src/proxy.ts sends the dashboard to the login page (with ?from= to come back). Logged in, it sends the login and signup pages to the dashboard, and moves the session expiry 10 minutes ahead on every page request."
      >
        <DemoLink href={PATHS.dashboard}>Open the dashboard</DemoLink>
      </Section>

      <Section
        title="4. Route Handler"
        description="Logged out: 401. Logged in as a user: 403. Logged in as an admin: 200 with data."
      >
        <AdminApiChecker />
      </Section>
    </main>
  );
}
