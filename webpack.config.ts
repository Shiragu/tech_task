import path from "path";

import { IBuildEnv, IBuildPaths } from "@core/types/build.types";
import { Configuration } from "webpack";

import { getDevServer } from "./config/getDevServer";
import { getLoaders } from "./config/getLoaders";
import { getPlugins } from "./config/getPlugins";

const config = (env: IBuildEnv): Configuration => {
  const paths: IBuildPaths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: path.resolve(__dirname, "build"),
    html: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, "src"),
  };

  const isDev = env.mode === "development";

  return {
    mode: env.mode ?? "development",
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: "[name].[contenthash].js",
      clean: true,
    },
    devtool: isDev && "inline-source-map",
    module: { rules: getLoaders(env) },
    plugins: getPlugins({ paths, mode: env.mode, port: env.port }),
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      alias: {
        "@core": paths.src,
      },
    },
    devServer: getDevServer(env),
  };
};

export default config;
