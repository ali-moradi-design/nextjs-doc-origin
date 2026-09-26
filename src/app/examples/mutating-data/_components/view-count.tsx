"use client";

import { useEffect, useState, useTransition } from "react";
import { incrementViews } from "../_lib/actions";

export default function ViewCount({ initialViews }: { initialViews: number }) {
  const [views, setViews] = useState(initialViews);
  const [isPending, startTransition] = useTransition();

  // Runs once after the component mounts: no click needed.
  // In development, React Strict Mode mounts twice, so it counts +2.
  useEffect(() => {
    startTransition(async () => {
      const updatedViews = await incrementViews();
      setViews(updatedViews);
    });
  }, []);

  return (
    <p className="text-sm">
      Total views: <span className="font-mono tabular-nums">{views}</span>
      {isPending && <span className="ml-2 text-xs text-zinc-500">counting…</span>}
    </p>
  );
}
