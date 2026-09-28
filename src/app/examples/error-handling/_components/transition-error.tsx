"use client";

import { useTransition } from "react";
import { buttonClass } from "./ui/styles";

// An error thrown inside startTransition is NOT lost like an onClick error:
// it bubbles up to the nearest error boundary.
export function TransitionError() {
  const [pending, startTransition] = useTransition();

  function handleClick() {
    startTransition(() => {
      throw new Error("Checkout failed inside startTransition.");
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className={buttonClass}
    >
      Checkout (throws in startTransition)
    </button>
  );
}
