"use client";

export function ErrorButton() {
  return (
    <button
      onClick={() => {
        // Errors in event handlers are not caught by error boundaries, so
        // they reach the window "error" listener in instrumentation-client.
        throw new Error("Button error for the analytics demo");
      }}
      className="rounded-lg border border-red-300 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
    >
      Throw an error
    </button>
  );
}
