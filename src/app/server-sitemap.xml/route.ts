import { getServerSideSitemap, ISitemapField } from 'next-sitemap';

import { getAllPosts, getAllTagSlugs } from '@/lib/hashnode';

import { siteConfig } from '@/constants/config';
import { isLocal } from '@/constants/env';

export const revalidate = isLocal ? 0 : false;

export async function GET() {
  const postsData = await getAllPosts();
  const tagSlugsData = await getAllTagSlugs();

  const [posts, tagSlugs] = await Promise.all([postsData, tagSlugsData]);

  return getServerSideSitemap([
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
    ...tagSlugs
      .map((slug) => `${siteConfig.url}/blog/tag/${slug}`)
      .map(
        (loc): ISitemapField => ({
          loc,
          changefreq: 'weekly',
          priority: 0.4,
        }),
      ),
  ]);
}
