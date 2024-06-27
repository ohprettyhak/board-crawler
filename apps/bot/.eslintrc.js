module.exports = {
  root: true,
  extends: ["@board-crawler/eslint-config/nodejs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  settings: {
    "import/resolver": {
      typescript: { project: ["./tsconfig.json", "./tsconfig.paths.json"] },
    },
  },
};
