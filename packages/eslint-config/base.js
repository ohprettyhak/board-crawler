const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json", "tsconfig.paths.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "plugin:import/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  rules: {
    "prettier/prettier": "error",
    "import/order": [
      "error",
      {
        groups: [["builtin", "external", "internal"]],
        "newlines-between": "always",
        pathGroups: [
          {
            pattern: "@/**",
            group: "internal",
            position: "after",
          },
        ],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "no-console": "warn",
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: [project],
        },
      },
    },
  },
  ignorePatterns: [".*.js", "node_modules/"],
};
