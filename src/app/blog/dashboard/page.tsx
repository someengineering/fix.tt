import { notFound, redirect } from 'next/navigation';

import { getPublicationId } from '@/lib/hashnode';

export default async function DashboardPage() {
  const publicationId = await getPublicationId();

  if (!publicationId) {
    notFound();
  }

  redirect(`https://hashnode.com/${publicationId}/dashboard`);
}
