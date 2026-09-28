import { SubmitButton } from "./submit-button";

// A form with a single button that calls a Server Action.
export function ActionButton({
  action,
  label,
}: {
  action: () => Promise<void>;
  label: string;
}) {
  return (
    <form action={action}>
      <SubmitButton label={label} />
    </form>
  );
}
