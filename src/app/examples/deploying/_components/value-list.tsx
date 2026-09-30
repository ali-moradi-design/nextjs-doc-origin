export function ValueList({ rows }: { rows: [name: string, value: string][] }) {
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono text-sm">
      {rows.map(([name, value]) => (
        <div key={name} className="contents">
          <dt className="text-zinc-500">{name}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
