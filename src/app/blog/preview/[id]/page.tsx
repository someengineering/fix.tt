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
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <p className="mb-2 text-lg font-bold leading-8 text-cornflower-blue-600 sm:text-xl">
              404
            </p>
            <h1 className="text-pretty text-4xl font-extrabold sm:text-5xl">
              Draft not found
            </h1>
            <p className="mt-6 text-pretty text-lg font-semibold text-gray-900 sm:text-xl">
              Was this content published or deleted?
            </p>
            <div className="mt-10">
              <PrimaryLink href="/blog">
                <span aria-hidden="true">&larr;</span> Back to blog
              </PrimaryLink>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <BlogDraft draft={draft} />;
}
