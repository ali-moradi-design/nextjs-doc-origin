import { connection } from "next/server";
import { readAppEnvName, readBuildLabel } from "../_lib/env";
import { ValueList } from "./value-list";

// connection() makes the page dynamic, so this runs on every request and
// reads process.env of the running server.
export async function RuntimeEnv() {
  await connection();

  return (
    <ValueList
      rows={[
        ["APP_ENV_NAME", readAppEnvName()],
        ["NEXT_PUBLIC_BUILD_LABEL", readBuildLabel()],
        ["rendered at", new Date().toISOString()],
      ]}
    />
  );
}
