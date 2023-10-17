/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
module.exports = {
  siteUrl: 'https://fix.tt',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap-index.xml'],
  additionalPaths: async (config) =>
    await Promise.all(
      ['/', '/blog', '/code-of-conduct', '/cookie-policy'].map(
        async (path) => await config.transform(config, path),
      ),
    ),
  robotsTxtOptions: {
    additionalSitemaps: ['https://fix.tt/server-sitemap-index.xml'],
    policies: [
      process.env.VERCEL_ENV === 'production'
        ? { userAgent: '*', allow: '/' }
        : { userAgent: '*', disallow: '/' },
      {
        userAgent: '*',
        disallow: [
          '/*.json$',
          '/*_buildManifest.js$',
          '/*_middlewareManifest.js$',
          '/*_ssgManifest.js$',
          '/*.js$',
        ],
      },
    ],
  },
};
