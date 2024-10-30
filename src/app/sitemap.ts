import { siteConfig } from '@/constants/config';
import {
  getAllPosts,
  getAllSeriesSlugs,
  getAllStaticPageSlugs,
  getAllTagSlugs,
} from '@/lib/hashnode';
import { getAllEpisodes, getShow } from '@/lib/transistor';
import { max } from 'lodash';
import { MetadataRoute } from 'next';

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
  const staticPageSlugsData = getAllStaticPageSlugs();
  const postsData = getAllPosts();
  const seriesSlugsData = getAllSeriesSlugs();
  const tagSlugsData = getAllTagSlugs();
  const podcastData = getShow();
  const episodesData = getAllEpisodes();

  const [staticPageSlugs, posts, seriesSlugs, tagSlugs, podcast, episodes] =
    await Promise.all([
      staticPageSlugsData,
      postsData,
      seriesSlugsData,
      tagSlugsData,
      podcastData,
      episodesData,
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
        url: `${siteConfig.url}/${slug.startsWith('fix-vs-') ? 'compare/' : ''}${slug}`,
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
      lastModified: new Date(podcast.attributes.updated_at).toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...episodes.map(
      (episode): SitemapField => ({
        url: `${siteConfig.url}/podcast/${episode.attributes.slug}`,
        lastModified: new Date(
          episode.attributes.updated_at
            ? episode.attributes.updated_at
            : episode.attributes.published_at,
        ).toISOString(),
        changeFrequency: 'monthly',
        priority: 0.7,
      }),
    ),
  ];
}
