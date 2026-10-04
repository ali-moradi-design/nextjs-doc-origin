// A label, an input and its error. Takes everything register() returns,
// so react-hook-form stays in charge of the input.
export function Field({
  id,
  label,
  error,
  ...inputProps
}: React.ComponentProps<"input"> & {
  id: string;
  label: string;
  error?: string;
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        {...inputProps}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-500 ${error ? "border-red-500" : "border-zinc-300 dark:border-zinc-700"}`}
      />
      {error && (
        <p
          id={`${id}-error`}
          className="text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}
