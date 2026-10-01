import { setTeam } from "../_lib/actions";
import { teams } from "../_lib/data";

export function TeamSwitcher() {
  return (
    <form action={setTeam} className="flex flex-wrap gap-2">
      {teams.map((team) => (
        <button
          key={team}
          name="team"
          value={team}
          className="rounded-full border border-zinc-300 px-3 py-1 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
        >
          Switch to {team}
        </button>
      ))}
    </form>
  );
}
