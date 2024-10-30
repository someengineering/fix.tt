import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';

import { metadata as rootMetadata } from '@/app/layout';
import { metadata as notFoundMetadata } from '@/app/not-found';
import FixLogo from '@/assets/logo.svg';
import HashnodePageView from '@/components/analytics/HashnodePageView';
import MarkdownContent from '@/components/common/MarkdownContent';
import CompetitorLogo, { hasLogo } from '@/components/compare/CompetitorLogo';
import Customers from '@/components/sections/Customers';
import Faq from '@/components/sections/Faq';
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
    .filter((slug) => slug.startsWith('fix-vs-'))
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

  const url = `${siteConfig.url}/compare/${staticPage.slug}`;
  const title = `Fix Security vs. ${staticPage.title}`;
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

export default async function ComparisonPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!params.slug.startsWith('fix-vs-')) {
    permanentRedirect(`/${params.slug}`);
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

  const title = `Fix Security vs. ${staticPage.title}`;
  const subtitle = `Why engineers choose Fix Security over ${staticPage.title}`;
  const competitorSlug = params.slug.replace('fix-vs-', '');

  return (
    <>
      <div className="px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          {hasLogo(competitorSlug) ? (
            <>
              <h1 className="sr-only">{title}</h1>
              <div
                className="mb-12 flex items-center justify-center space-x-10"
                aria-hidden="true"
              >
                <FixLogo className="h-24 w-24 text-cornflower-blue-600" />
                <span className="h-10 w-10 rounded-full bg-marian-blue-50 text-lg font-extrabold leading-10">
                  VS
                </span>
                <CompetitorLogo slug={competitorSlug} className="h-24 w-24" />
              </div>
            </>
          ) : (
            <h1 className="mb-3 text-lg font-bold uppercase text-gray-600 sm:text-xl">
              {title}
            </h1>
          )}
          <h2 className="text-pretty text-4xl font-extrabold sm:text-5xl">
            {subtitle}
          </h2>
          <MarkdownContent className="compare-page" linkHeadings={false}>
            {staticPage.content.markdown}
          </MarkdownContent>
        </div>
      </div>
      <Customers />
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
