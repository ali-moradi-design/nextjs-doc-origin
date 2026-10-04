import Link from "next/link";
import { LoginForm } from "../_components/login-form";
import { PATHS } from "../_lib/constants";

export default async function Page({
  searchParams,
}: PageProps<"/examples/authentication/login">) {
  const { from, ended } = await searchParams;

  return (
    <main className="mx-auto w-full max-w-sm flex-1 space-y-6 px-4 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
      {ended && (
        <p className="text-sm text-amber-700 dark:text-amber-400">
          Your session has ended (logged out or revoked on another device, or
          the account was deleted). Please log in again.
        </p>
      )}
      {typeof from === "string" && (
        <p className="text-sm text-zinc-500">
          The proxy sent you here from {from}. You will go back after logging
          in.
        </p>
      )}
      <LoginForm from={typeof from === "string" ? from : undefined} />
      <p className="text-sm text-zinc-500">
        No account yet?{" "}
        <Link href={PATHS.signup} className="underline">
          Sign up
        </Link>
      </p>
    </main>
  );
}
