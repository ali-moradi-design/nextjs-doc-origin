import { getMembers, getUser } from "../_lib/dal";
import { DeleteMemberButton } from "./delete-member-button";

// For non-admins: call the admin-only Server Action anyway, the way an
// attacker could with a hand-made POST. The action refuses on the server.
export async function ForbiddenTry() {
  const viewer = await getUser();
  if (viewer?.role === "admin") {
    return (
      <p className="text-sm text-zinc-500">
        You are an admin, so the action allows you. Log in as bob@example.com
        (or a new account) to see it refuse.
      </p>
    );
  }

  const target = (await getMembers()).find((member) => !member.isYou);
  if (!target) return null;

  return (
    <DeleteMemberButton
      memberId={target.id}
      label={`Delete ${target.name} anyway`}
      variant="outline"
    />
  );
}
