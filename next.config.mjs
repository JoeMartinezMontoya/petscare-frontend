// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000, // Vérifie les changements toutes les secondes
      aggregateTimeout: 300, // Délai avant le redémarrage du serveur après un changement
    };
    return config;
  },
};

export default nextConfig;
