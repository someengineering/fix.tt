import { type NextRequest, NextResponse } from 'next/server';

import { getHashnodePosts, getHashnodePostsByTag } from '@/lib/hashnode';

import { isLocal } from '@/constants/env';

export const revalidate = isLocal ? 0 : 300;

export async function GET(req: NextRequest) {
  const tag = req.nextUrl.searchParams.get('tag');

  return NextResponse.json(
    tag
      ? await getHashnodePostsByTag({
          tagSlug: tag,
          first: parseInt(req.nextUrl.searchParams.get('first') ?? '5'),
          after: req.nextUrl.searchParams.get('after') ?? undefined,
        })
      : await getHashnodePosts({
          first: parseInt(req.nextUrl.searchParams.get('first') ?? '5'),
          after: req.nextUrl.searchParams.get('after') ?? undefined,
        }),
    {
      status: 200,
    },
  );
}
