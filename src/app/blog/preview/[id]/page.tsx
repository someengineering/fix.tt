import type { Metadata } from 'next';

import BlogDraft from '@/components/blog/BlogDraft';
import PrimaryLink from '@/components/common/links/PrimaryLink';

import { getHashnodeDraft } from '@/api/hashnode';

export const revalidate = 0;

async function getDraft(id: string) {
  try {
    return await getHashnodeDraft(id);
  } catch (e) {
    return null;
  }
}

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

  const title = draft.title;
  // const description = draft.subtitle;

  return {
    title,
    // description,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const draft = await getDraft(params.id);

  if (!draft) {
    return (
      <div className="mx-auto flex w-full max-w-7xl flex-auto flex-col justify-center px-6 py-24 sm:py-64 lg:px-8">
        <p className="text-lg font-semibold leading-8 text-primary-900">404</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Draft not found
        </h1>
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
