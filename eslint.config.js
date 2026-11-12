// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*", "node_modules/*", ".expo/*", "patches/*"],
  },
  {
    rules: {
      // Hooks misuse causes real runtime bugs -> hard error.
      "react-hooks/rules-of-hooks": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
]);
