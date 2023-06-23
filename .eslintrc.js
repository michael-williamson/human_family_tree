module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  rules: {
    "unused-imports/no-unused-imports": "error",
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
};
