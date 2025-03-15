/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 300,
        aggregateTimeout: 200,
      };
    }
    return config;
  },
};

export default nextConfig;
