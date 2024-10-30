import { metadata as rootMetadata } from '@/app/layout';
import { metadata as notFoundMetadata } from '@/app/not-found';
import HashnodePageView from '@/components/analytics/HashnodePageView';
import MarkdownContent from '@/components/common/MarkdownContent';
import Faq from '@/components/sections/Faq';
import Team from '@/components/sections/Team';
import { siteConfig } from '@/constants/config';
import { isProd } from '@/constants/env';
import { getPublicationId, getStaticPage } from '@/lib/hashnode';
import { openGraph } from '@/utils/og';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const staticPage = await getStaticPage('about');

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
      title: `${staticPage.title} | ${siteConfig.title}`,
      description,
      images: [ogImage],
    },
    ...(staticPage.hidden ? { robots: notFoundMetadata.robots } : {}),
  };
}

export default async function AboutPage() {
  const publicationIdData = getPublicationId();
  const staticPageData = getStaticPage('about');

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
          <h1 className="mb-3 text-lg font-bold uppercase text-gray-600 sm:text-xl">
            {staticPage.title}
          </h1>
          <p className="text-pretty text-4xl font-extrabold sm:text-5xl">
            We don&rsquo;t have a{' '}
            <span className="text-cornflower-blue-600">
              silver bullet for cloud security
            </span>
            .
          </p>
          <MarkdownContent className="static-page">
            {staticPage.content.markdown}
          </MarkdownContent>
        </div>
      </div>
      <Team />
      <Faq />
      {isProd && publicationId ? (
        <HashnodePageView
          publicationId={publicationId}
          staticPageId={staticPage.id}
        />
      ) : null}
    </>
  );
}
