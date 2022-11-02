// @ts-check

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const plugins = [new MiniCssExtractPlugin()];

/** @type import('webpack').Configuration */
export default {
  devtool: "source-map",
  context: dirname(fileURLToPath(import.meta.url)),
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        loader: "source-map-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: "asset",
      },
    ],
  },
  plugins,
};
