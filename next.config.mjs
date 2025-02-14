/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  output: 'export', // This will make our build static
  images: {
    unoptimized: true, // Image optimization is disabled in static builds
  },
  // distDir: 'build', // This will be the output directory
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      type: "asset/resource",
      generator: {
        filename: "static/assets/[hash][ext]",
      },
    });
    return config;
  },
};
export default nextConfig;
