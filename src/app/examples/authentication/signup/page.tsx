import Link from "next/link";
import { SignupForm } from "../_components/signup-form";
import { PATHS } from "../_lib/constants";

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-sm flex-1 space-y-6 px-4 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Sign up</h1>
      <SignupForm />
      <p className="text-sm text-zinc-500">
        Already have an account?{" "}
        <Link href={PATHS.login} className="underline">
          Log in
        </Link>
      </p>
    </main>
  );
}
