/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://www.prescottjr.com',
  changefreq: 'hourly',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  exclude: [],
  // Default transformation function
  transform: async (config, path) => ({
    loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
    changefreq: config.changefreq,
    priority: config.priority,
    lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    alternateRefs: config.alternateRefs ?? [],
  }),
  additionalPaths: async (config) => [
    await config.transform(config, '/about-me'),
    await config.transform(config, '/blog'),
    await config.transform(config, '/'),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Googlebot-image',
        allow: '/',
      },
    ],
  },
};
