import { flatten } from 'lodash';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.hashnode.com' },
      { protocol: 'https', hostname: 'i.scdn.co' },
      { protocol: 'https', hostname: 'img.transistor.fm' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // {
          //   key: 'Strict-Transport-Security',
          //   value: 'max-age=31536000; includeSubDomains; preload',
          // },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/faq',
        permanent: true,
        destination: `/frequently-asked-questions`,
      },
      {
        source: '/privacy',
        permanent: true,
        destination: `/privacy-policy`,
      },
      {
        source: '/terms',
        permanent: true,
        destination: `/terms-and-conditions`,
      },
      {
        source: '/customer(s?)/:path*',
        permanent: true,
        destination: `/blog/series/customer-stories/:path*`,
      },
      {
        source: '/blog/category/:path*',
        permanent: true,
        destination: `/blog/series/:path*`,
      },
      ...flatten(
        ['/rss.xml', '/atom.xml', '/feed.json'].map((path) => [
          {
            source: path,
            permanent: false,
            destination: `/blog${path}`,
          },
          {
            source: path.replace(/\.(xml|json)$/, ''),
            permanent: false,
            destination: `/blog${path}`,
          },
          {
            source: `/blog${path.replace(/\.(xml|json)$/, '')}`,
            permanent: false,
            destination: `/blog${path}`,
          },
        ]),
      ),
      {
        source: '/blog/sitemap.xml',
        permanent: false,
        destination: `/sitemap.xml`,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value:
              '(www\\.fix\\.security|(www\\.)?fix\\.tt|fix-(git-main-)?some-engineering\\.vercel\\.app|(www\\.)?some\\.engineering)',
          },
        ],
        permanent: true,
        destination: 'https://fix.security/:path*',
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: '(blog\\.fix\\.(security|tt))' }],
        permanent: true,
        destination: 'https://fix.security/blog/:path*',
      },
      {
        source: '/podcasts/:path*',
        permanent: true,
        destination: `/podcast/:path*`,
      },
      {
        source: '/episodes/:path*',
        has: [{ type: 'host', value: '(podcasts?\\.fix\\.(security|tt))' }],
        permanent: true,
        destination: 'https://fix.security/podcast/:path*',
      },
      {
        source: '/people/lars-kamp',
        has: [{ type: 'host', value: '(podcasts?\\.fix\\.(security|tt))' }],
        permanent: false,
        destination: 'https://linkedin.com/in/larskamp',
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: '(podcasts?\\.fix\\.(security|tt))' }],
        permanent: true,
        destination: 'https://fix.security/podcast',
      },
      {
        source: '/docs/:path*',
        permanent: true,
        destination: 'https://docs.fix.security/:path*',
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/js/uc.js',
        destination: 'https://plausible.io/js/script.outbound-links.js',
      },
      {
        source: '/js/script.js',
        destination: 'https://plausible.io/js/script.outbound-links.js',
      },
      {
        source: '/api/event',
        destination: 'https://plausible.io/api/event',
      },
      {
        source: '/api/analytics',
        destination: 'https://user-analytics.hashnode.com/api/analytics',
      },
      {
        source: '/api/ingest/static/:path*',
        destination: 'https://eu-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/api/ingest/:path*',
        destination: 'https://eu.i.posthog.com/:path*',
      },
    ];
  },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: { not: /\.(css|scss|sass)$/ },
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        loader: '@svgr/webpack',
        options: {
          dimensions: false,
          titleProp: true,
        },
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  compiler:
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
      ? {
          reactRemoveProperties: true,
          removeConsole: true,
        }
      : undefined,

  experimental: {
    staleTimes: {
      dynamic: 30,
    },
    taint: true,
    webpackBuildWorker: true,
  },
};

export default nextConfig;
