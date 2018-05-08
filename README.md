# monorepo-test
[![Build Status](https://travis-ci.com/wixplosives/monorepo-test.svg?branch=master)](https://travis-ci.com/wixplosives/monorepo-test)

Test monorepo setups with Travis

## Current setup explained

Tooling used:
  - workspace management: lerna
  - building: typescript, ts-node
  - testing: mocha, chai
  - running scripts: npm-run-all.
  - cleaning: rimraf
  - bundling: webpack, webpack-cli, webpack-dev-server, html-webpack-plugin, ts-loader

This monorepo has 3 packages:
  - `app` - Sample react app.
  - `components` - Sample react components library.
  - `server` - Sample react ssr express app.

`components` is imported by `app`, while `app` iteself is imported by `server`.

Monorepo root has:
  - `README.md`
  - `LICENSE`
  - `package.json` - defs for common dev deps and workspace projects
  - `yarn.lock` - the only one in the repo
  - `lerna.json` - lerna configuration
  - `.travis.yml` - Travis configuration
  - `.gitignore` - GitHub's default Node gitignore with customizations

Each package has:
  - `src` and `test` folders
  - TODO
