import { getServerSideSitemap, ISitemapField } from 'next-sitemap';

import { getHashnodePosts, getHashnodeTagSlugs } from '@/api/hashnode';
import { siteConfig } from '@/constants/config';

export async function GET() {
  const blogPosts = (await getHashnodePosts({}))
    .map((edge) => edge.node)
    .map(
      (post): ISitemapField => ({
        loc: `${siteConfig.url}/blog/${post.slug}`,
        lastmod: new Date(
          post.updatedAt ? post.updatedAt : post.publishedAt,
        ).toISOString(),
        changefreq: 'monthly',
        priority: 0.7,
      }),
    );
  const blogTags = (await getHashnodeTagSlugs())
    .map((slug) => `${siteConfig.url}/blog/tag/${slug}`)
    .map(
      (loc): ISitemapField => ({
        loc,
        changefreq: 'weekly',
        priority: 0.4,
      }),
    );

  return getServerSideSitemap([...blogPosts, ...blogTags]);
}
