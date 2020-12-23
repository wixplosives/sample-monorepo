# sample-monorepo

[![Build Status](https://github.com/wixplosives/sample-monorepo/workflows/tests/badge.svg)](https://github.com/wixplosives/sample-monorepo/actions)

Sample monorepo setup with yarn workspaces, typescript, and lerna.

## Webpack 5 (early 2021 note)

This repository uses the latest `webpack@5`.

If your infrastructure (loaders/plugins) still requires `webpack@4`, you can downgrade `webpack` to `^4.44.2` and `html-webpack-plugin` to `^4.5.0`.

## Setup explained

### Tooling

- Monorepo is installed using [yarn](https://github.com/yarnpkg/yarn).

  - Packages are automatically linked together, meaning you can do cross-package work within the repo.
  - `devDependencies` are common, and only appear in the root `package.json`. Easier to manage and upgrade.
  - Each package has its own `scripts` and `dependencies`. They are being installed in the root `node_modules`, using the same deduping mechanism `yarn` uses for single packages.
  - Adding new packages is as simple as dropping an existing package in the `packages` folder, and re-running `yarn`.

- Monorepo scripts are being executed using [lerna](https://github.com/lerna/lerna).

  - `lerna publish` - multi-package publishing.
  - `lerna run` - running package scripts.
  - `lerna updated` - shows changed packages (since last tag).

- Sources and tests are written in strict [TypeScript](https://github.com/Microsoft/TypeScript).

  - Common base `tsconfig.base.json`.

- Testing is done using [mocha](https://github.com/mochajs/mocha) and [chai](https://github.com/chaijs/chai).
  - Light, battle-tested, projects with few dependencies.
  - Can be bundled and used in the browser.

### Included sample packages

- **@sample/components**

  - [React](https://github.com/facebook/react) components library.

- **@sample/app**

  - [React](https://github.com/facebook/react) application.
  - Uses the `@sample/components` package (also inside monorepo).

- **@sample/server**
  - [Express](https://github.com/expressjs/express) application.
  - Uses the `@sample/app` package (also inside monorepo).
  - Listens on http://localhost:3000 (client only rendering) http://localhost:3000/server (SSR rendering).

### Basic structure and configurations

```
.github                  // CI flow configuration (GitHub Actions)
packages/
  some-package/
    src/
      index.ts
      tsconfig.json      // folder specific config, built to "dist
    test/
      test.spec.ts
      tsconfig.json      // folder specific config, built to "dist/test"
    LICENSE              // license file. included in npm artifact
    package.json         // package-specific deps and scripts
    README.md            // shown in npmjs.com. included in npm artifact

.eslintignore            // eslint (linter) ignored directories/files
.eslintrc                // eslint (linter) configuration
.gitignore               // github's default node gitignore with customizations
.mocharc.js              // mocha (test runner) configuration
lerna.json               // lerna configuration
LICENSE                  // root license file. picked up by github
package.json             // common dev deps and workspace-wide scripts
README.md                // workspace-wide information. shown in github
tsconfig.base.json       // common typescript configuration
tsconfig.json            // solution-style root typescript configuration
yarn.lock                // the only lock file in the repo. all packages combined
```

### Dependency management

Traditionally, working with projects in separate repositories makes it difficult to keep versions of `devDependencies` aligned, as each project can specify its own `devDependency` versions.

Monorepos simplify this, because `devDependencies` are shared between all packages within the monorepo.

Taking this into account, we use the following dependency structure:

- `devDependencies` are placed in the root `package.json`
- `dependencies` and `peerDependencies` are placed in the `package.json` of the relevant package requiring them, as each package is published separately

New `devDependencies` can be added to the root `package.json` using yarn:

```sh
yarn add <package name> --dev -W
```

Some packages depend on sibling packages within the monorepo. For example, in this repo, `@sample/app` depends on `@sample/components`. This relationship is just a normal dependency, and can be described in the `package.json` of `app` like so:

```json
  "dependencies": {
    "@sample/components": "<package version>"
  }
```

### Deployment

`yarn lerna publish` will publish new versions of the packages to npm.

Lerna asks for new version numbers for packages that changed since last release and their dependencies. Every package has a `prepack` script which automatically runs `build` prior to packing.

`yarn lerna publish --force-publish` will force a release of _all_ packages, regardless of which ones actually changed.

Deployment of app/server assets to any actual production servers is not shown.
