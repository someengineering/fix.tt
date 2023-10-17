import { getServerSideSitemapIndex } from 'next-sitemap';

import { getHashnodePostSlugs, getHashnodeTagSlugs } from '@/api/hashnode';
import { siteConfig } from '@/constants/config';

export async function GET() {
  const blogPostUrls = (await getHashnodePostSlugs()).map(
    (slug) => `${siteConfig.url}/blog/${slug}`,
  );
  const blogTagUrls = (await getHashnodeTagSlugs()).map(
    (slug) => `${siteConfig.url}/blog/tag/${slug}`,
  );

  return getServerSideSitemapIndex([...blogPostUrls, ...blogTagUrls]);
}
