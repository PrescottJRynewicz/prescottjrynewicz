module.exports = {
  reactStrictMode: true,

  images: {
    minimumCacheTTL: 60,
    // This is used for image sizing when optimizing next images
    // Image sizes default to 100vw, and we almost never use
    // full width images. And if we do, it is probably a specific
    // use case
    deviceSizes: [640],
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
    return config;
  },
  webpackDevMiddleware: (config) => config,
};
