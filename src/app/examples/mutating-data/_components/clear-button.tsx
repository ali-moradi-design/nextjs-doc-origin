"use client";

// The action arrives as a prop from a Server Component. Functions normally
// can't be props across the boundary, but Server Actions can: React sends
// a reference to the server function, not its code.
export default function ClearButton({
  clearAction,
}: {
  clearAction: () => Promise<void>;
}) {
  return (
    <form
      action={clearAction}
      onSubmit={(event) => {
        // Client-only logic (a confirm dialog) before the server runs.
        if (!window.confirm("Delete all notes?")) event.preventDefault();
      }}
    >
      <button
        type="submit"
        className="text-sm text-red-600 hover:underline dark:text-red-400"
      >
        Clear all
      </button>
    </form>
  );
}
