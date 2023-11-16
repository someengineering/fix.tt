import { getFeed } from '@/lib/hashnode';

import { isLocal } from '@/constants/env';

export const revalidate = isLocal ? 0 : false;

export async function GET() {
  const feed = await getFeed();

  return new Response(feed.atom1(), {
    headers: {
      'Content-Type': 'text/xml',
      'Content-Encoding': 'utf-8',
    },
  });
}
