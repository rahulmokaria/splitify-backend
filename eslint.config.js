// eslint.config.js
const { Linter } = require("eslint");

const config = {
  env: {
    node: true,
    es2021: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    "no-undef": "error",
    "no-unused-vars": "warn"
  }
};

module.exports = config;
