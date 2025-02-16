/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: { config: './src/design/tailwind.config.js' },
  },
};

export default config;
