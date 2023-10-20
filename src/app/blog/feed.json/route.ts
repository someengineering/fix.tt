import { NextResponse } from 'next/server';

import { getFeed } from '@/utils/hashnode';

export async function GET() {
  const feed = await getFeed();

  return NextResponse.json(JSON.parse(feed.json1()));
}
