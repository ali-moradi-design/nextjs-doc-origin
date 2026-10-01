"use server";

import { cookies } from "next/headers";
import { teams, type Team } from "./data";

export async function setTeam(formData: FormData) {
  const team = String(formData.get("team"));
  if (!teams.includes(team as Team)) return;

  (await cookies()).set("team", team);
}
