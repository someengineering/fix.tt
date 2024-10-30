import { metadata as rootMetadata } from '@/app/layout';
import BlogDraft from '@/components/blog/BlogDraft';
import { siteConfig } from '@/constants/config';
import { getDraft, getPublication } from '@/lib/hashnode';
import { openGraph } from '@/utils/og';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 0;

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const draft = await getDraft(id);

  if (!draft) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = draft.title ?? undefined;
  const description = draft.subtitle ?? undefined;
  const ogImage = openGraph({
    title,
    description,
  });

  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      ...rootMetadata.openGraph,
      title,
      description,
      images: [ogImage],
      type: 'article',
      tags: draft.tagsV2?.map((tag) => tag.name),
      publishedTime: draft.updatedAt,
    },
    twitter: {
      ...rootMetadata.twitter,
      title: `${draft.title} | ${siteConfig.title}`,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPreviewPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const publicationData = getPublication();
  const draftData = getDraft(id);

  const [publication, draft] = await Promise.all([publicationData, draftData]);

  if (!publication || !draft) {
    notFound();
  }

  return <BlogDraft draft={draft} publication={publication} />;
}
