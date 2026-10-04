"use client";

import { useState } from "react";
import { Button } from "./ui/button";

// The session cookie is httpOnly: JavaScript in the page can't read it, so
// an XSS bug can't steal it. The browser still sends it with each request.
export function CookiePeek() {
  const [cookies, setCookies] = useState<string>();

  return (
    <div className="space-y-2">
      <Button variant="outline" onClick={() => setCookies(document.cookie)}>
        Read document.cookie
      </Button>
      {cookies !== undefined && (
        <pre className="overflow-x-auto rounded-lg bg-zinc-100 p-3 text-xs whitespace-pre-wrap dark:bg-zinc-900">
          {cookies || "(empty)"}
        </pre>
      )}
    </div>
  );
}
