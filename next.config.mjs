/** @type {import('next').NextConfig} */

import additional from './src/additional.next.config.mjs';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      loader: 'url-loader',
      options: {
        limit: 8192,
        name: 'static/assets/[name].[hash].[ext]',
      },
    });
    return config;
  },
  ...additional
};
export default nextConfig;