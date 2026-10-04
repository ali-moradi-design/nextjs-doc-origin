"use client";

import { useState, useTransition } from "react";
import {
  logoutOtherSessions,
  revokeSession,
  type ActionResult,
} from "../_lib/actions";
import { Button } from "./ui/button";

// With a sessionId: revoke that session. Without: all except the current.
export function RevokeSessionButton({ sessionId }: { sessionId?: string }) {
  const [result, setResult] = useState<ActionResult>();
  const [pending, startTransition] = useTransition();

  function onClick() {
    startTransition(async () => {
      setResult(
        await (sessionId ? revokeSession(sessionId) : logoutOtherSessions()),
      );
    });
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <Button variant="outline" onClick={onClick} disabled={pending}>
        {pending
          ? "Revoking…"
          : sessionId
            ? "Revoke"
            : "Log out everywhere else"}
      </Button>
      {result && !result.ok && (
        <span className="text-xs text-red-600 dark:text-red-400">
          {result.message}
        </span>
      )}
    </span>
  );
}
