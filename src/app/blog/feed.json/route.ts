import { NextResponse } from 'next/server';

import { getFeed } from '@/lib/hashnode';

import { isLocal } from '@/constants/env';

export const revalidate = isLocal ? 0 : 300;

export async function GET() {
  const feed = await getFeed();

  return NextResponse.json(JSON.parse(feed.json1()));
}
