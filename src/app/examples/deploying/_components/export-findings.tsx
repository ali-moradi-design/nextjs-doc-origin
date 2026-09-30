import { staticExportFindings } from "../_lib/options";

export function ExportFindings() {
  return (
    <ul className="space-y-2 text-sm">
      {staticExportFindings.map((finding) => (
        <li
          key={finding.feature}
          className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-900"
        >
          <p className="font-medium">{finding.feature}</p>
          <p className="font-mono text-xs text-zinc-600 dark:text-zinc-400">
            {finding.result}
          </p>
        </li>
      ))}
    </ul>
  );
}
