import { type NextRequest, NextResponse } from 'next/server';

import { getHashnodeDraft } from '@/api/hashnode';

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json(
      await getHashnodeDraft(req.nextUrl.searchParams.get('id') ?? ''),
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json({ error: 'Draft not found' }, { status: 404 });
  }
}
