import { NextResponse } from 'next/server';

import { isLocal } from '@/constants/env';
import { getFeed } from '@/utils/hashnode';

export const revalidate = isLocal ? 0 : false;

export async function GET() {
  const feed = await getFeed();

  return NextResponse.json(JSON.parse(feed.json1()));
}
