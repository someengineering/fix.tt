import { revalidateTag } from 'next/cache';

export async function POST() {
  revalidateTag('transistor');

  return new Response();
}
