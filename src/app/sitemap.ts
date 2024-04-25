import { max } from 'lodash';
import { MetadataRoute } from 'next';

import {
  getAllPosts,
  getAllSeriesSlugs,
  getAllStaticPageSlugs,
  getAllTagSlugs,
} from '@/lib/hashnode';
import { getLatestEpisode } from '@/lib/spotify';

import { siteConfig } from '@/constants/config';

type SitemapField = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  priority?: number;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  return [
    {
      url: `${siteConfig.url}`,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...['about', 'pricing', 'frequently-asked-questions'].map(
      (slug): SitemapField => ({
        url: `${siteConfig.url}/${slug}`,
        changeFrequency: 'monthly',
        priority: 0.7,
      }),
    ),
    ...staticPageSlugs.map(
      (slug): SitemapField => ({
        url: `${siteConfig.url}/${slug}`,
        ...(slug === 'code-of-conduct' ||
        slug === 'cookie-policy' ||
        slug === 'privacy-policy' ||
        slug === 'terms-and-conditions'
          ? { changeFrequency: 'yearly', priority: 0.1 }
          : { changeFrequency: 'monthly', priority: 0.7 }),
      }),
    ),
    {
      url: `${siteConfig.url}/blog`,
      lastModified: max(
        posts.map((post) =>
          post.updatedAt ? post.updatedAt : post.publishedAt,
        ),
      ),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...posts.map(
      (post): SitemapField => ({
        url: `${siteConfig.url}/blog/${post.slug}`,
        lastModified: new Date(
          post.updatedAt ? post.updatedAt : post.publishedAt,
        ).toISOString(),
        changeFrequency: 'monthly',
        priority: 0.7,
      }),
    ),
    ...seriesSlugs
      .map((slug) => `${siteConfig.url}/blog/series/${slug}`)
      .map(
        (url): SitemapField => ({
          url,
          changeFrequency: 'weekly',
          priority: 0.4,
        }),
      ),
    ...tagSlugs
      .map((slug) => `${siteConfig.url}/blog/tag/${slug}`)
      .map(
        (url): SitemapField => ({
          url,
          changeFrequency: 'weekly',
          priority: 0.4,
        }),
      ),
    {
      url: `${siteConfig.url}/podcast`,
      lastModified: new Date(latestEpisode.release_date).toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];
}
