import { getFeed } from '@/utils/hashnode';

export async function GET() {
  const feed = await getFeed();

  return new Response(feed.rss2(), { headers: { 'Content-Type': 'text/xml' } });
}
