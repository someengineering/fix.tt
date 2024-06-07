import { revalidatePath, revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import type { NextRequest } from 'next/server';

import { HASHNODE_WEBHOOK_SECRET } from '@/constants/hashnode';
import { validateSignature } from '@/lib/hashnode/webhook';

export async function POST(req: NextRequest) {
  const signatureHeader = headers().get('x-hashnode-signature');

  const signatureResult = validateSignature({
    incomingSignatureHeader: signatureHeader,
    payload: await req.json(),
    secret: HASHNODE_WEBHOOK_SECRET!,
  });

  if (signatureResult.isValid) {
    revalidateTag('hashnode');

    revalidatePath('/[slug]', 'page');
    revalidatePath('/about', 'page');
    revalidatePath('/blog', 'layout');
    revalidatePath('/blog/atom.xml');
    revalidatePath('/blog/feed.json');
    revalidatePath('/blog/rss.xml');
    revalidatePath('/compare', 'layout');
  } else {
    return new Response(signatureResult.reason, { status: 401 });
  }

  return new Response();
}
