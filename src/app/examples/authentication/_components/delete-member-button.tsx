"use client";

import { useState, useTransition } from "react";
import { deleteMember, type ActionResult } from "../_lib/actions";
import { Button } from "./ui/button";

export function DeleteMemberButton({
  memberId,
  label = "Delete",
  variant = "danger",
}: {
  memberId: string;
  label?: string;
  variant?: "danger" | "outline";
}) {
  const [result, setResult] = useState<ActionResult>();
  const [pending, startTransition] = useTransition();

  function onClick() {
    startTransition(async () => {
      setResult(await deleteMember(memberId));
    });
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <Button variant={variant} onClick={onClick} disabled={pending}>
        {pending ? "Deleting…" : label}
      </Button>
      {result && !result.ok && (
        <span className="text-xs text-red-600 dark:text-red-400">
          {result.message}
        </span>
      )}
    </span>
  );
}
