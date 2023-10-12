/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
module.exports = {
  siteUrl: 'https://fix.tt',
  generateRobotsTxt: true,
  additionalPaths: async (config) =>
    await Promise.all(
      ['/', '/code-of-conduct', '/cookie-policy'].map(
        async (path) => await config.transform(config, path),
      ),
    ),
  robotsTxtOptions: {
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
