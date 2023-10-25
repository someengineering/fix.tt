/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://fix.tt',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  changefreq: 'weekly',
  autoLastmod: false,

  transform: async (config, path) => {
    /** @type {import('next-sitemap').ISitemapField} */
    const sitemapField = {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };

    if (path === '/') {
      return {
        ...sitemapField,
        priority: 1,
      };
    }

    if (path === '/code-of-conduct' || path === '/cookie-policy') {
      return {
        ...sitemapField,
        changefreq: 'yearly',
        priority: 0.1,
      };
    }

    return sitemapField;
  },

  additionalPaths: async (config) =>
    await Promise.all(
      ['/', '/blog', '/code-of-conduct', '/cookie-policy'].map(
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
          '/blog/preview/*',
        ],
      },
    ],
  },
};
