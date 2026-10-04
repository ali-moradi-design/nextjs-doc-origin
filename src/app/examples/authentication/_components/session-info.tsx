import { verifySession } from "../_lib/dal";

// verifySession() is cached: the dashboard page called it already, so this
// does not decrypt the cookie (or read the sessions table) a second time.
// Stateless: userId and role come from the cookie. Database: only
// sessionId does; userId and role come from the database.
export async function SessionInfo() {
  const session = await verifySession();

  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
      <dt className="text-zinc-500">kind</dt>
      <dd className="font-mono text-xs">{session.kind}</dd>
      {session.sessionId && (
        <>
          <dt className="text-zinc-500">sessionId</dt>
          <dd className="font-mono text-xs break-all">{session.sessionId}</dd>
        </>
      )}
      <dt className="text-zinc-500">userId</dt>
      <dd className="font-mono text-xs break-all">{session.userId}</dd>
      <dt className="text-zinc-500">role</dt>
      <dd className="font-mono text-xs">{session.role}</dd>
      <dt className="text-zinc-500">expires</dt>
      <dd className="font-mono text-xs">
        {session.expiresAt.toLocaleTimeString("en-GB")}
      </dd>
    </dl>
  );
}
