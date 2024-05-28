import { getFeed } from '@/lib/transistor';

export const revalidate = 300;

export async function GET() {
  const feed = await getFeed();

  return new Response(feed, {
    headers: {
      'Content-Type': 'text/xml',
      'Content-Encoding': 'utf-8',
    },
  });
}
