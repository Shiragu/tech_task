import { IBuildEnv } from "@core/types/build.types";
import type { Configuration as WDSConfiguration } from "webpack-dev-server";

export function getDevServer({ mode, port }: IBuildEnv): WDSConfiguration {
  const isDev = mode === "development";

  if (!isDev) {
    return {};
  }

  return {
    port: port ?? 3001,
    open: true,
  };
}
