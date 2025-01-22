/** @type {import('next').NextConfig} */
const nextConfig = {
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
