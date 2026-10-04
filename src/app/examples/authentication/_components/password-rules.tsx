"use client";

import { useWatch, type Control } from "react-hook-form";
import type { SignupInput } from "../_lib/definitions";

const rules = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "A letter", test: (v: string) => /[a-zA-Z]/.test(v) },
  { label: "A number", test: (v: string) => /[0-9]/.test(v) },
  {
    label: "A special character",
    test: (v: string) => /[^a-zA-Z0-9]/.test(v),
  },
];

// Live checklist. useWatch (not watch()) re-renders only this component
// when the password changes, and is safe with the React Compiler.
export function PasswordRules({ control }: { control: Control<SignupInput> }) {
  const password = useWatch({ control, name: "password" }) ?? "";

  return (
    <ul className="space-y-0.5 text-xs">
      {rules.map((rule) => {
        const ok = rule.test(password);
        return (
          <li
            key={rule.label}
            className={
              ok ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-500"
            }
          >
            {ok ? "✓" : "○"} {rule.label}
          </li>
        );
      })}
    </ul>
  );
}
