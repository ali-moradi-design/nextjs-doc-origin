"use client";

import { useState } from "react";
import { API_KEY_HEADER, DEMO_API_KEY, PATHS } from "../_lib/constants";
import { Button } from "./ui/button";

export function SecretCaller() {
  const [result, setResult] = useState("Click a button.");

  async function call(withKey: boolean) {
    const response = await fetch(PATHS.secretApi, {
      headers: withKey ? { [API_KEY_HEADER]: DEMO_API_KEY } : {},
    });
    const body = await response.text();
    setResult(`${response.status} ${response.statusText}\n${body}`);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => call(false)}>
          GET without key
        </Button>
        <Button type="button" onClick={() => call(true)}>
          GET with {API_KEY_HEADER}
        </Button>
      </div>
      <pre className="overflow-x-auto rounded-lg bg-zinc-100 p-3 text-sm dark:bg-zinc-900">
        {result}
      </pre>
    </div>
  );
}
