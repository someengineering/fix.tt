import { max } from 'lodash';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';

import {
  getAllPosts,
  getAllSeriesSlugs,
  getAllStaticPageSlugs,
  getAllTagSlugs,
} from '@/lib/hashnode';
import { getLatestEpisode } from '@/lib/spotify';

import { siteConfig } from '@/constants/config';
import { isLocal } from '@/constants/env';

export const revalidate = isLocal ? 0 : false;

export async function GET() {
  const staticPageSlugsData = await getAllStaticPageSlugs();
  const postsData = await getAllPosts();
  const seriesSlugsData = await getAllSeriesSlugs();
  const tagSlugsData = await getAllTagSlugs();
  const latestEpisodeData = await getLatestEpisode();

  const [staticPageSlugs, posts, seriesSlugs, tagSlugs, latestEpisode] =
    await Promise.all([
      staticPageSlugsData,
      postsData,
      seriesSlugsData,
      tagSlugsData,
      latestEpisodeData,
    ]);

  return getServerSideSitemap([
    {
      loc: `${siteConfig.url}`,
      changefreq: 'monthly',
      priority: 1,
    },
    ...staticPageSlugs.map(
      (slug): ISitemapField => ({
        loc: `${siteConfig.url}/${slug}`,
        ...(slug === 'code-of-conduct' || slug === 'cookie-policy'
          ? { changefreq: 'yearly', priority: 0.1 }
          : { changefreq: 'monthly', priority: 0.7 }),
      }),
    ),
    {
      loc: `${siteConfig.url}/blog`,
      lastmod: max(
        posts.map((post) =>
          post.updatedAt ? post.updatedAt : post.publishedAt,
        ),
      ),
      changefreq: 'weekly',
      priority: 0.7,
    },
    ...posts.map(
      (post): ISitemapField => ({
        loc: `${siteConfig.url}/blog/${post.slug}`,
        lastmod: new Date(
          post.updatedAt ? post.updatedAt : post.publishedAt,
        ).toISOString(),
        changefreq: 'monthly',
        priority: 0.7,
      }),
    ),
    ...seriesSlugs
      .map((slug) => `${siteConfig.url}/blog/category/${slug}`)
      .map(
        (loc): ISitemapField => ({
          loc,
          changefreq: 'weekly',
          priority: 0.4,
        }),
      ),
    ...tagSlugs
      .map((slug) => `${siteConfig.url}/blog/tag/${slug}`)
      .map(
        (loc): ISitemapField => ({
          loc,
          changefreq: 'weekly',
          priority: 0.4,
        }),
      ),
    {
      loc: `${siteConfig.url}/podcast`,
      lastmod: new Date(latestEpisode.release_date).toISOString(),
      changefreq: 'weekly',
      priority: 0.7,
    },
  ]);
}
