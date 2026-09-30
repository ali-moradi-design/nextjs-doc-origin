import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SubPage } from "../_components/sub-page";
import { Button } from "../_components/ui/button";
import { logout } from "../_lib/actions";
import { PATHS, SESSION_COOKIE } from "../_lib/constants";

export default async function Page() {
  // The real check. The proxy's check is only a fast first filter: a
  // matcher change could skip it without anyone noticing.
  const session = (await cookies()).get(SESSION_COOKIE);
  if (!session) redirect(PATHS.login);

  return (
    <SubPage title="Dashboard">
      <p>Welcome, {session.value}. The proxy let you in.</p>
      <form action={logout}>
        <Button type="submit">Log out (deletes the cookie)</Button>
      </form>
    </SubPage>
  );
}
