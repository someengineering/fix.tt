import { MetadataRoute } from 'next';

import { siteConfig } from '@/constants/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules:
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
        ? [
            { userAgent: '*', allow: '/' },
            {
              userAgent: '*',
              allow: ['/blog/feed.json'],
              disallow: [
                '/*.json$',
                '/*_buildManifest.js$',
                '/*_middlewareManifest.js$',
                '/*_ssgManifest.js$',
                '/*.js$',
                '/blog/preview/*',
                '/blog/dashboard',
              ],
            },
          ]
        : { userAgent: '*', disallow: '/' },
    sitemap:
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
        ? `${siteConfig.url}/sitemap.xml`
        : undefined,
  };
}
