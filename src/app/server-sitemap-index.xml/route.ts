import { getServerSideSitemapIndex } from 'next-sitemap';

import { getHashnodePostSlugs } from '@/api/hashnode';
import { siteConfig } from '@/constants/config';

export async function GET() {
  const blogPostUrls = (await getHashnodePostSlugs()).map(
    (slug) => `${siteConfig.url}/blog/${slug}`,
  );

  return getServerSideSitemapIndex([...blogPostUrls]);
}
