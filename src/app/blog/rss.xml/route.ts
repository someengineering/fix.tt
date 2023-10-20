import { getFeed } from '@/utils/hashnode';

export async function GET() {
  const feed = await getFeed();

  return new Response(feed.atom1(), {
    headers: { 'Content-Type': 'text/xml' },
  });
}
