import type { UseFormRegisterReturn } from "react-hook-form";
import { SESSION_KINDS, type SessionKind } from "../_lib/constants";

const descriptions: Record<SessionKind, string> = {
  stateless: "Everything in the signed cookie. Nothing stored on the server.",
  database: "The cookie holds only a session id; the row lives on the server.",
};

// Radio buttons registered with react-hook-form: each input gets the same
// register() props and its own value.
export function SessionKindField({
  registration,
}: {
  registration: UseFormRegisterReturn<"sessionKind">;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium">Session type</legend>
      {SESSION_KINDS.map((kind) => (
        <label
          key={kind}
          className="flex gap-2 rounded-lg border border-zinc-200 p-2 text-sm has-checked:border-zinc-500 dark:border-zinc-800"
        >
          <input type="radio" value={kind} {...registration} />
          <span>
            <span className="font-medium">{kind}</span>
            <span className="block text-xs text-zinc-500">
              {descriptions[kind]}
            </span>
          </span>
        </label>
      ))}
    </fieldset>
  );
}
