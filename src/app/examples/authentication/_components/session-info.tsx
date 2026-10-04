import { verifySession } from "../_lib/dal";

// verifySession() is cached: the dashboard page called it already, so this
// does not decrypt the cookie a second time.
export async function SessionInfo() {
  const session = await verifySession();

  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
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
