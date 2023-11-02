import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import type { NextRequest } from 'next/server';

import { validateSignature } from '@/lib/hashnode/webhook';

import { HASHNODE_WEBHOOK_SECRET } from '@/constants/hashnode';

export async function POST(req: NextRequest) {
  const signatureHeader = headers().get('x-hashnode-signature');

  const signatureResult = validateSignature({
    incomingSignatureHeader: signatureHeader,
    payload: await req.json(),
    secret: HASHNODE_WEBHOOK_SECRET!,
  });

  if (signatureResult.isValid) {
    revalidateTag('hashnode');
  } else {
    return new Response(signatureResult.reason, { status: 401 });
  }

  return new Response();
}
