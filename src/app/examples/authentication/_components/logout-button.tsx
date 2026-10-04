import { logout } from "../_lib/actions";
import { Button } from "./ui/button";

// A plain form with a Server Action: works even before JavaScript loads.
export function LogoutButton() {
  return (
    <form action={logout}>
      <Button type="submit" variant="outline">
        Log out
      </Button>
    </form>
  );
}
