import { getMembers } from "../_lib/dal";
import { AdminActions } from "./admin-actions";

// The DTO decides what reaches the page: other members' emails are null
// unless you are an admin (look for them in the page source: not there).
export async function Members() {
  const members = await getMembers();

  return (
    <ul className="divide-y divide-zinc-200 text-sm dark:divide-zinc-800">
      {members.map((member) => (
        <li
          key={member.id}
          className="flex flex-wrap items-center justify-between gap-2 py-2"
        >
          <div>
            <p className="font-medium">
              {member.name}
              {member.isYou && <span className="text-zinc-500"> (you)</span>}
              {member.role === "admin" && (
                <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-xs text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  admin
                </span>
              )}
            </p>
            <p className="font-mono text-xs text-zinc-500">
              {member.email ?? "email hidden"}
            </p>
          </div>
          <AdminActions memberId={member.id} />
        </li>
      ))}
    </ul>
  );
}
