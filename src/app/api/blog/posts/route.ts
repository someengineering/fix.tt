import { type NextRequest, NextResponse } from 'next/server';

import { getHashnodePosts } from '@/api/hashnode';

export async function GET(req: NextRequest) {
  return NextResponse.json(
    await getHashnodePosts({
      first: parseInt(req.nextUrl.searchParams.get('first') ?? '5'),
      after: req.nextUrl.searchParams.get('after') ?? undefined,
    }),
    {
      status: 200,
    },
  );
}
