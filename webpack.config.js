// @ts-check

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/** @type import('webpack').Configuration */
export default {
  devtool: "source-map",
  context: dirname(fileURLToPath(import.meta.url)),
  experiments: {
    css: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        loader: "source-map-loader",
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
        type: "asset",
      },
    ],
  },
};
