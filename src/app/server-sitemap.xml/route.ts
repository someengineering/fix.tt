import { getServerSideSitemap } from 'next-sitemap';

import { getHashnodePostSlugs, getHashnodeTagSlugs } from '@/api/hashnode';
import { siteConfig } from '@/constants/config';

export async function GET() {
  const blogPostUrls = (await getHashnodePostSlugs()).map(
    (slug) => `${siteConfig.url}/blog/${slug}`,
  );
  const blogTagUrls = (await getHashnodeTagSlugs()).map(
    (slug) => `${siteConfig.url}/blog/tag/${slug}`,
  );

  return getServerSideSitemap(
    [...blogPostUrls, ...blogTagUrls].map((loc) => ({
      loc,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.7,
    })),
  );
}
