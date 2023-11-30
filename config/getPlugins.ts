import { IBuildEnv } from "@core/types/build.types";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { WebpackPluginInstance } from "webpack";

export function getPlugins({ paths }: IBuildEnv): WebpackPluginInstance[] {
  const htmlPlugin = new HtmlWebpackPlugin({
    template: paths.html,
  });

  const cssPlugin = new MiniCssExtractPlugin({
    filename: "css/[name].[contenthash:8].css",
    chunkFilename: "css/[name].[contenthash:8].css",
  });

  return [htmlPlugin, cssPlugin];
}
