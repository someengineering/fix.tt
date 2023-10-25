import { type NextRequest, NextResponse } from 'next/server';

import { getHashnodePost } from '@/api/hashnode';
import { isLocal } from '@/constants/env';

export const revalidate = isLocal ? 0 : 300;

export async function GET(req: NextRequest) {
  return NextResponse.json(
    await getHashnodePost(req.nextUrl.searchParams.get('slug') ?? ''),
    { status: 200 },
  );
}
