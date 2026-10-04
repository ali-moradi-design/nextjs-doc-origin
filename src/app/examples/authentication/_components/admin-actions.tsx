import { getUser } from "../_lib/dal";
import { DeleteMemberButton } from "./delete-member-button";

// An auth check in a leaf component: it renders nothing for non-admins.
// getUser() is cached, so one call per row costs one lookup per request.
// Hiding the button is only UI: deleteMember() checks the role again.
export async function AdminActions({ memberId }: { memberId: string }) {
  const viewer = await getUser();
  if (viewer?.role !== "admin" || viewer.id === memberId) return null;

  return <DeleteMemberButton memberId={memberId} />;
}
