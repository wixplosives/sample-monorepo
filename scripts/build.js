// @ts-check

import { build, context } from "esbuild";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import open from "open";

const port = 8000;
const isWatch = process.argv.includes("--watch") || process.argv.includes("-w");

const packageBuildDefinitions = {
  components: {
    entry: "src/index.ts",
  },
  app: {
    entry: "src/client-main.tsx",
  },
  server: {
    entry: "src/server-main.ts",
    externals: true,
    target: "node20",
  },
};

/** @type {import('esbuild').Plugin} */
const externalsPlugin = {
  name: "external react",
  setup(build) {
    build.onResolve({ filter: /^(react$|react\/.+)/ }, (args) => ({ path: args.path, external: true }));
    build.onResolve({ filter: /^(react-dom$|react-dom\/.+)/ }, (args) => ({ path: args.path, external: true }));
  },
};
for (const [packageFolderName, { entry, externals, target }] of Object.entries(packageBuildDefinitions)) {
  const packageURL = new URL(`../packages/${packageFolderName}/`, import.meta.url);
  const outPath = new URL(`dist/`, packageURL);
  await fs.rm(outPath, { recursive: true, force: true });
  await fs.mkdir(outPath, { recursive: true });

  /** @type {import('esbuild').BuildOptions} */
  const buildOptions = {
    logLevel: "info",
    color: true,
    outdir: fileURLToPath(outPath),
    format: "esm",
    legalComments: "none",
    bundle: true,
    target: target ?? 'es2022',
    entryPoints: [fileURLToPath(new URL(entry, packageURL))],
    entryNames: "[name]",
    loader: {
      ".json": "json",
      ".png": "file",
      ".jpeg": "file",
      ".jpg": "file",
      ".svg": "file",
    },
    assetNames: "assets/[name]-[hash]",
    minify: false, //!isWatch,
    sourcemap: isWatch,
    jsx: "automatic",
    jsxDev: isWatch,
    packages: externals ? "external" : undefined,
    plugins: [externalsPlugin],
  };
  if (isWatch) {
    const buildContext = await context(buildOptions);
    // await buildContext.serve({ servedir: "packagesdist", port });
    await buildContext.watch();
    await open(`http://localhost:${port}`);
  } else {
    await build(buildOptions);
  }
}
