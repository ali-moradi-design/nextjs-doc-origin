"use client";

import { catchError, type ErrorInfo } from "next/error";
import { buttonClass, errorBoxClass } from "./ui/styles";

// The first argument is the wrapper's own props (without children).
// The second one is filled in by Next.js when an error is caught.
function ErrorFallback(
  props: { title: string },
  { error, retry, reset }: ErrorInfo,
) {
  return (
    <div role="alert" className={errorBoxClass}>
      <p className="font-semibold">{props.title}</p>
      {/* error is typed as unknown: anything can be thrown. */}
      <p>{error instanceof Error ? error.message : String(error)}</p>
      <div className="flex gap-2">
        {/* retry: re-fetches from the server, then re-renders. */}
        <button onClick={() => retry()} className={buttonClass}>
          Try again
        </button>
        {/* reset: only clears the error state, no new server request. */}
        <button onClick={() => reset()} className={buttonClass}>
          Reset
        </button>
      </div>
    </div>
  );
}

export const ErrorBoundary = catchError(ErrorFallback);
