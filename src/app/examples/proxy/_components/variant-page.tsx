import { switchVariant } from "../_lib/actions";
import { PATHS, type Variant } from "../_lib/constants";
import { Button } from "./ui/button";
import { SubPage } from "./sub-page";

const styles: Record<Variant, string> = {
  a: "bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-100",
  b: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-100",
};

// Rendered by ab/a/page.tsx and ab/b/page.tsx.
export function VariantPage({ variant }: { variant: Variant }) {
  return (
    <SubPage title={`Variant ${variant.toUpperCase()}`}>
      <p className={`rounded-xl p-4 text-lg font-semibold ${styles[variant]}`}>
        You are seeing variant {variant.toUpperCase()}.
      </p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        This is ab/{variant}/page.tsx, but the URL is still {PATHS.ab}: the
        proxy rewrote it by the cookie. The action below flips the cookie and
        redirects to /ab, so the proxy runs again with the new cookie.
      </p>
      <form action={switchVariant}>
        <Button type="submit">Switch variant</Button>
      </form>
    </SubPage>
  );
}
