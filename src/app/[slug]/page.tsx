import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';

import { metadata as rootMetadata } from '@/app/layout';
import { metadata as notFoundMetadata } from '@/app/not-found';
import HashnodePageView from '@/components/analytics/HashnodePageView';
import MarkdownContent from '@/components/common/MarkdownContent';
import { siteConfig } from '@/constants/config';
import { isProd } from '@/constants/env';
import {
  getAllStaticPageSlugs,
  getPublicationId,
  getStaticPage,
} from '@/lib/hashnode';
import { openGraph } from '@/utils/og';

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getAllStaticPageSlugs();

  return slugs
    .filter((slug) => !slug.startsWith('fix-vs-'))
    .map((slug) => ({
      slug,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const staticPage = await getStaticPage(params.slug);

  if (!staticPage) {
    return notFoundMetadata;
  }

  const url = `${siteConfig.url}/${staticPage.slug}`;
  const title = staticPage.title;
  const description = staticPage.seo?.description ?? undefined;
  const ogImage = openGraph({ title, description });

  return {
    title,
    description,
    alternates: {
      ...rootMetadata.alternates,
      canonical: url,
    },
    openGraph: {
      ...rootMetadata.openGraph,
      url,
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      ...rootMetadata.twitter,
      title: `${title} | ${siteConfig.title}`,
      description,
      images: [ogImage],
    },
    ...(staticPage.hidden ? { robots: notFoundMetadata.robots } : {}),
  };
}

export default async function StaticPage({
  params,
}: {
  params: { slug: string };
}) {
  if (params.slug.startsWith('fix-vs-')) {
    permanentRedirect(`/compare/${params.slug}`);
  }

  const publicationIdData = getPublicationId();
  const staticPageData = getStaticPage(params.slug);

  const [publicationId, staticPage] = await Promise.all([
    publicationIdData,
    staticPageData,
  ]);

  if (!staticPage) {
    notFound();
  }

  return (
    <>
      <div className="px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-pretty text-4xl font-extrabold sm:text-5xl">
            {staticPage.title}
          </h1>
          <MarkdownContent className="static-page">
            {staticPage.content.markdown}
          </MarkdownContent>
        </div>
      </div>
      {isProd && publicationId ? (
        <HashnodePageView
          publicationId={publicationId}
          staticPageId={staticPage.id}
        />
      ) : null}
    </>
  );
}
