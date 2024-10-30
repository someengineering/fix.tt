import { getFeed } from '@/lib/hashnode';
import { NextResponse } from 'next/server';

export const revalidate = 300;

export async function GET() {
  const feed = await getFeed();

  return NextResponse.json(JSON.parse(feed.json1()));
}
