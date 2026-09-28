"use client";

import { useActionState } from "react";
import { createProduct, type ProductFormState } from "../_lib/actions";
import { buttonClass, inputClass } from "./ui/styles";

const initialState: ProductFormState = {};

export function ProductForm() {
  const [state, formAction, pending] = useActionState(
    createProduct,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <input
          name="name"
          placeholder="Name (try Mouse)"
          aria-label="Name"
          className={inputClass}
        />
        <input
          name="price"
          placeholder="Price"
          aria-label="Price"
          inputMode="decimal"
          className={`${inputClass} max-w-28`}
        />
        <button type="submit" disabled={pending} className={buttonClass}>
          {pending ? "Creating…" : "Create"}
        </button>
      </div>
      <p aria-live="polite" className="min-h-5 text-sm">
        {state.error && (
          <span className="text-red-600 dark:text-red-400">{state.error}</span>
        )}
        {state.message && (
          <span className="text-emerald-600 dark:text-emerald-400">
            {state.message}
          </span>
        )}
      </p>
    </form>
  );
}
