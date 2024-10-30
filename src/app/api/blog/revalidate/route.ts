import { HASHNODE_WEBHOOK_SECRET } from '@/constants/hashnode';
import { validateSignature } from '@/lib/hashnode/webhook';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const incomingSignatureHeader = (await headers()).get('x-hashnode-signature');
  const payload = await req.json();

  const signatureResult = validateSignature({
    incomingSignatureHeader,
    payload,
    secret: HASHNODE_WEBHOOK_SECRET!,
  });

  if (signatureResult.isValid) {
    revalidateTag('hashnode');
  } else {
    return new Response(signatureResult.reason, { status: 401 });
  }

  return new Response();
}
