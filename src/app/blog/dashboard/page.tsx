import { getPublicationId } from '@/lib/hashnode';
import { notFound, redirect } from 'next/navigation';

export default async function DashboardPage() {
  const publicationId = await getPublicationId();

  if (!publicationId) {
    notFound();
  }

  redirect(`https://hashnode.com/${publicationId}/dashboard`);
}
