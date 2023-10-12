import { type NextRequest, NextResponse } from 'next/server';

import { getHashnodePost } from '@/api/hashnode';

export async function GET(req: NextRequest) {
  return NextResponse.json(
    await getHashnodePost({ slug: req.nextUrl.searchParams.get('slug') ?? '' }),
    { status: 200 },
  );
}
