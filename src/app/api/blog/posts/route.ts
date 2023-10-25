import { type NextRequest, NextResponse } from 'next/server';

import { getHashnodePosts } from '@/api/hashnode';
import { isLocal } from '@/constants/env';

export const revalidate = isLocal ? 0 : 300;

export async function GET(req: NextRequest) {
  return NextResponse.json(
    await getHashnodePosts({
      first: parseInt(req.nextUrl.searchParams.get('first') ?? '5'),
      after: req.nextUrl.searchParams.get('after') ?? undefined,
      tag: req.nextUrl.searchParams.get('tag') ?? undefined,
    }),
    {
      status: 200,
    },
  );
}
