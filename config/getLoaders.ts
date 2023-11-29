import { IBuildEnv } from "@core/types/build.types";
import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function getLoaders({ mode }: IBuildEnv): ModuleOptions["rules"] {
  const isDev = mode === "development";
  console.log(isDev, mode);
  const imageLoader = {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };

  const moduleCssLoader = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isDev ? "[path][name]_[local]" : "[hash:base64:8]",
      },
    },
  };

  const cssLoader = {
    test: /\.css$/i,
    use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, moduleCssLoader],
  };

  const tsLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  return [imageLoader, cssLoader, tsLoader];
}
