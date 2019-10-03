# sample-monorepo
[![Build Status](https://travis-ci.com/wixplosives/sample-monorepo.svg?branch=master)](https://travis-ci.com/wixplosives/sample-monorepo)

Sample monorepo setup with yarn workspaces, typescript, and lerna.

## Setup explained

### Tooling

- Monorepo is installed using [yarn](https://github.com/yarnpkg/yarn).
  - Packages are automatically linked together, meaning you can do cross-package work within the repo.
  - devDependencies are common, and only appear in the root `package.json`.
  - Each package has its own `scripts` and `dependencies`. They are being installed in the root `node_modules`, using the same deduping mechanism `yarn` uses for single packages.
  - Adding new packages is as simple as dropping an existing package in the `packages` folder, and re-running `yarn`.

- Monorepo scripts are being executed using [lerna](https://github.com/lerna/lerna).
  - Automatically ensures order when using `lerna run [script]`, meaning that if `package-a` depends on `package-b`, it will run `package-b`'s scripts first.
  - `lerna updated` shows changed packages.
  - Easier multi-package publishing, using `lerna publish`.

- Sources and tests are written in strict [TypeScript](https://github.com/Microsoft/TypeScript).
  - We use a single, common, `tsconfig.json`.
  - We use [@ts-tools/node](https://github.com/AviVahl/ts-tools) to run tests directly from sources.

- Testing is done using [mocha](https://github.com/mochajs/mocha) and [expect](https://github.com/facebook/jest/tree/master/packages/expect).
  - Light, battle-tested, projects with few dependencies.
  - Can be bundled and used in the browser.

### Included sample packages

- **@sample/components**
  - [React](https://github.com/facebook/react) components library.
  - Built as `cjs` (Node consumption) and `esm` (bundler consumption).

- **@sample/app**
  - [React](https://github.com/facebook/react) application.
  - Uses the `@sample/components` package (also inside monorepo).
  - Built as `cjs` (Node consumption) and `umd` (browser consumption).

- **@sample/server**
  - [Express](https://github.com/expressjs/express) application.
  - Uses the `@sample/app` package (also inside monorepo).
  - Listens on http://localhost:3000 (client only rendering) http://localhost:3000/server (SSR rendering).
  - Built as `cjs` (Node consumption).

### Basic structure and configurations
```
packages/
  some-package/
    src/
      index.ts
    test/
      test.spec.ts

    LICENSE           // package-specific license. included in npm artifact
    package.json      // package-specific deps and scripts
    README.md         // shown in npmjs.com. included in npm artifact

.eslintrc             // eslint (linter) configuration
.gitignore            // github's default node gitignore with customizations
.mocharc.js           // mocha (test runner) configuration
.prettierrc.js        // prettier (formatter) configuration
.travis.yml           // travis ci configuration
lerna.json            // lerna configuration
LICENSE               // root license file. picked up by github
package.json          // common dev deps and workspace-wide scripts
README.md             // workspace-wide information. shown in github
tsconfig.json         // typescript (transpiler) configuration
yarn.lock             // the only lock file in the repo. all packages combined
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
