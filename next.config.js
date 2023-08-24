module.exports = {
  reactStrictMode: true,

  images: {
    minimumCacheTTL: 60,
    domains: [
      'www.notion.so',
      's3.us-west-2.amazonaws.com',
      'images.unsplash.com',
      'www.datocms-assets.com',
    ],
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
    return config;
  },
};
