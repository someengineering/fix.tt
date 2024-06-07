import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST() {
  revalidateTag('transistor');

  revalidatePath('/podcast', 'layout');
  revalidatePath('/podcast/rss.xml');

  return new Response();
}
