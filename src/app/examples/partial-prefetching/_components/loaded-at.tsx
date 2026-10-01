export function LoadedAt({ time }: { time: string }) {
  return (
    <p className="text-zinc-500">
      Loaded on the server at <span className="font-mono">{time}</span>
    </p>
  );
}
