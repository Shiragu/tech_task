export type BuildMode = "development" | "production";

export interface IBuildPaths {
  entry: string;
  output: string;
  html: string;
  src: string;
}

export interface IBuildEnv {
  mode: BuildMode;
  paths: IBuildPaths;
  port: number;
}
