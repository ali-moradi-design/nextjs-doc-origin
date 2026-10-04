import { getMySessions, verifySession } from "../_lib/dal";
import { RevokeSessionButton } from "./revoke-session-button";

function time(iso: string) {
  return new Date(iso).toLocaleTimeString("en-GB");
}

// Only a database session can list and end sessions: a stateless server
// has no list of the tokens it signed, so it can't take one back.
export async function ActiveSessions() {
  const session = await verifySession();

  if (session.kind === "stateless") {
    return (
      <p className="text-sm text-zinc-500">
        You are on a stateless session. The server keeps no list of sessions, so
        there is nothing to show or revoke: a token works until it expires. Log
        in again with the database type to compare.
      </p>
    );
  }

  const sessions = await getMySessions();

  return (
    <div className="space-y-3">
      <ul className="divide-y divide-zinc-200 text-sm dark:divide-zinc-800">
        {sessions.map((row) => (
          <li
            key={row.id}
            className="flex flex-wrap items-center justify-between gap-2 py-2"
          >
            <div>
              <p className="font-medium">
                {row.device}
                {row.isCurrent && (
                  <span className="text-zinc-500"> (this device)</span>
                )}
              </p>
              <p className="font-mono text-xs text-zinc-500">
                started {time(row.createdAt)} · last seen {time(row.lastSeenAt)}
              </p>
            </div>
            {!row.isCurrent && <RevokeSessionButton sessionId={row.id} />}
          </li>
        ))}
      </ul>
      {sessions.length > 1 && <RevokeSessionButton />}
    </div>
  );
}
