module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
    // "eslint:recommended",
    // "plugin:react/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "react/jsx-no-bind": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "import/no-cycle": "off",
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",
  },
};
