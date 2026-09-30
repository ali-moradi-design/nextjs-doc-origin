import { SubPage } from "../_components/sub-page";
import { Button } from "../_components/ui/button";
import { login } from "../_lib/actions";

export default async function Page({
  searchParams,
}: PageProps<"/examples/proxy/login">) {
  const { from } = await searchParams;

  return (
    <SubPage title="Login">
      {from && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          The proxy sent you here from {from}: there was no session cookie.
        </p>
      )}
      <form action={login}>
        <Button type="submit">Log in (sets the cookie)</Button>
      </form>
    </SubPage>
  );
}
