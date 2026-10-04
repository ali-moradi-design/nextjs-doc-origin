import { getMembers, getSession, getUser } from "../../_lib/dal";

// Two-tier check, like the docs: 401 when not logged in, 403 when logged in
// without the right role. Check getSession() first: it does not redirect,
// and an API should answer with a status code, not a login page.
export async function GET() {
  const session = await getSession();
  if (!session) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Secure check: getUser() reads the role from the database, not the cookie.
  const user = await getUser();
  if (!user) {
    return Response.json({ error: "Account not found" }, { status: 401 });
  }
  if (user.role !== "admin") {
    return Response.json({ error: "Admins only" }, { status: 403 });
  }

  const members = await getMembers();
  return Response.json({
    members: members.length,
    admins: members.filter((member) => member.role === "admin").length,
  });
}
