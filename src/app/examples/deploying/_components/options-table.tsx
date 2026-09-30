import { deployOptions } from "../_lib/options";

export function OptionsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="text-zinc-500">
          <tr>
            <th className="py-2 pr-4 font-medium">Option</th>
            <th className="py-2 pr-4 font-medium">Features</th>
            <th className="py-2 font-medium">How</th>
          </tr>
        </thead>
        <tbody>
          {deployOptions.map((option) => (
            <tr
              key={option.name}
              className="border-t border-zinc-200 dark:border-zinc-800"
            >
              <td className="py-2 pr-4 font-medium">{option.name}</td>
              <td className="py-2 pr-4">{option.support}</td>
              <td className="py-2 font-mono text-xs">{option.command}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
