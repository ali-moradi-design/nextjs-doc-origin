export function LoadedAt({ time }: { time: string }) {
  return (
    <p className="text-zinc-500">
      Cached at <span className="font-mono">{time}</span>
    </p>
  );
}
