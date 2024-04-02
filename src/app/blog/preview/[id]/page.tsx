import type { Metadata } from 'next';

import { getDraft } from '@/lib/hashnode';

import BlogDraft from '@/components/blog/BlogDraft';
import PrimaryLink from '@/components/common/links/PrimaryLink';

import { metadata as rootMetadata } from '@/app/layout';
import { siteConfig } from '@/constants/config';
import { openGraph } from '@/utils/og';

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const draft = await getDraft(params.id);

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

export default async function BlogPreviewPage({
  params,
}: {
  params: { id: string };
}) {
  const draft = await getDraft(params.id);

  if (!draft) {
    return (
      <div className="mx-auto flex w-full max-w-7xl flex-auto flex-col justify-center px-6 py-24 sm:py-64 lg:px-8">
        <p className="mb-2 text-xl font-semibold leading-8 text-marian-blue-900">
          404
        </p>
        <h1 className="text-4xl font-extrabold sm:text-5xl">Draft not found</h1>
        <p className="mt-6 text-lg leading-7 text-gray-600">
          Was this content published or deleted?
        </p>
        <div className="mt-10">
          <PrimaryLink href="/blog">
            <span aria-hidden="true">&larr;</span> Back to blog
          </PrimaryLink>
        </div>
      </div>
    );
  }

  return <BlogDraft draft={draft} />;
}
