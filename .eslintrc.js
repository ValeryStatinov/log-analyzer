const prettierConfig = require('./.prettierrc.js');

module.exports = {
  parser: "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    },
    "project": "./tsconfig.json"
  },
  plugins: [
    "prettier",
    "@typescript-eslint",
    "jsx-a11y",
    "promise",
    "simple-import-sort",
    "import",
    "react-hooks",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:jsx-a11y/recommended",
    "plugin:promise/recommended",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended",
  ],

  rules: {
    "no-var": "warn",
    "no-debugger": "warn",
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      {
        blankLine: "always",
        prev: ["block-like", "class", "continue", "while", "for", "do", "if"],
        next: "*",
      },
      {
        blankLine: "always",
        prev: ["const", "let"],
        next: ["while", "for", "do", "if", "switch"],
      },
    ],
    "typescript-eslint/no-explicit-any": "off",

    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/unbound-method": "warn",
    "@typescript-eslint/require-await": "warn",
    "@typescript-eslint/member-delimiter-style": "off",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/no-var-requires": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

    // "jsx-a11y/click-events-have-key-events": "warn",
    // "jsx-a11y/no-static-element-interactions": "warn",
    // "jsx-a11y/no-autofocus": "off",

    "react/prop-types": "off",
    "react/display-name": "warn",

    "react-hooks/exhaustive-deps": [
      "error",
      { enableDangerousAutofixThisMayCauseInfiniteLoops: true },
    ],

    "promise/always-return": "off",
    "promise/catch-or-return": "off",
    "promise/no-return-wrap": "warn",

    "prettier/prettier": ["error", prettierConfig],

    "simple-import-sort/imports": "error",
    "import/first": "error",
    "import/no-duplicates": "error",
    "import/newline-after-import": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
