# sample-monorepo
[![Build Status](https://travis-ci.com/wixplosives/sample-monorepo.svg?branch=master)](https://travis-ci.com/wixplosives/sample-monorepo)

Sample monorepo setup with yarn workspaces, typescript, and lerna

## Current setup explained

Tooling used:
  - monorepo linked setup: `yarn` workspace
  - script running and publishing: `lerna`
  - building: `typescript`, `node-typescript-support`
  - testing: `mocha`, `chai`
  - running scripts: `npm-run-all`
  - cleaning: `rimraf`
  - bundling: `webpack`, `webpack-cli`, `webpack-dev-server`, `html-webpack-plugin`, `ts-loader`

This monorepo has 3 packages:
  - `app` - Sample react app
  - `components` - Sample react components library
  - `server` - Sample react ssr express app

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
