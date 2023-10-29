import { isLocal } from '@/constants/env';
import { getFeed } from '@/utils/hashnode';

export const revalidate = isLocal ? 0 : false;

export async function GET() {
  const feed = await getFeed();

  return new Response(feed.atom1(), {
    headers: { 'Content-Type': 'text/xml' },
  });
}
