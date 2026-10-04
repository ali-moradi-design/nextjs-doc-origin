"use client";

import { useState } from "react";
import { PATHS } from "../_lib/constants";
import { Button } from "./ui/button";

// A Route Handler is a public endpoint too. fetch() sends the session
// cookie, so the handler answers 200, 401 or 403 depending on who you are.
export function AdminApiChecker() {
  const [result, setResult] = useState<string>();

  async function check() {
    setResult("Loading…");
    const response = await fetch(PATHS.adminApi);
    const body = await response.text();
    setResult(`${response.status} ${response.statusText}\n${body}`);
  }

  return (
    <div className="space-y-2">
      <Button variant="outline" onClick={check}>
        GET {PATHS.adminApi}
      </Button>
      {result && (
        <pre className="overflow-x-auto rounded-lg bg-zinc-100 p-3 text-xs whitespace-pre-wrap dark:bg-zinc-900">
          {result}
        </pre>
      )}
    </div>
  );
}
