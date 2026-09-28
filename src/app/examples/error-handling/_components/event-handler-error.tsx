"use client";

import { useState } from "react";
import { buttonClass, errorBoxClass } from "./ui/styles";

// Error boundaries do not catch errors in event handlers, so we catch the
// error ourselves and keep it in state.
export function EventHandlerError() {
  const [error, setError] = useState<Error | null>(null);

  function handleClick() {
    try {
      throw new Error("Could not copy the coupon code.");
    } catch (reason) {
      setError(reason instanceof Error ? reason : new Error(String(reason)));
    }
  }

  if (error) {
    return (
      <div role="alert" className={errorBoxClass}>
        <p>{error.message}</p>
        <button onClick={() => setError(null)} className={buttonClass}>
          Dismiss
        </button>
      </div>
    );
  }

  return (
    <button type="button" onClick={handleClick} className={buttonClass}>
      Copy coupon (throws in onClick)
    </button>
  );
}
