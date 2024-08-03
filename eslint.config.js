import { fixupPluginRules } from "@eslint/compat";
import pluginJs from "@eslint/js";
import configPrettier from "eslint-config-prettier";
import pluginNoOnlyTests from "eslint-plugin-no-only-tests";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginTypescript from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ["**/dist/", "**/*.{js,mjs,cjs}"] },
  pluginJs.configs.recommended,

  ...pluginTypescript.configs.recommendedTypeChecked,
  { languageOptions: { parserOptions: { projectService: true } } },

  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"],
  { settings: { react: { version: "detect" } } },

  {
    plugins: {
      "react-hooks": pluginReactHooks,
      "no-only-tests": fixupPluginRules(pluginNoOnlyTests),
    },
  },
  configPrettier,

  {
    rules: {
      "no-console": "error",
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "no-only-tests/no-only-tests": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }], // allow unused _ variables
    },
  },

  {
    files: ["**/*.test.{ts,tsx}"],
    rules: {
      // native node test runner types for describe() and it() return a promise, so disable this rule in tests
      "@typescript-eslint/no-floating-promises": "off",
    },
  },
];
