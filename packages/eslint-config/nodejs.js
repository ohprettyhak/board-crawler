module.exports = {
  extends: ["./base"],
  env: {
    node: true,
    browser: true,
  },
  rules: {
    "no-console": "off",
    "no-empty-function": "off",
  },
  ignorePatterns: ["lib/**", "node_modules/**"],
};
