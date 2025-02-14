import nextPlugin from "@next/eslint-plugin-next";
export default [
  {
    ignores: ["node_modules/"], // Adjust as needed
  },
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
    },
  },
];
