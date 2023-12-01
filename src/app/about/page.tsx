import { Metadata } from 'next';

import { getStaticPage } from '@/lib/hashnode';

import MarkdownContent from '@/components/common/MarkdownContent';
import Team from '@/components/Team';

import { metadata as rootMetadata } from '@/app/layout';
import NotFoundPage, { metadata as notFoundMetadata } from '@/app/not-found';
import { siteConfig } from '@/constants/config';
import { openGraph } from '@/utils/og';

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
  const staticPage = await getStaticPage('about');

  if (!staticPage) {
    return <NotFoundPage />;
  }

  return (
    <>
      <div className="px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-lg leading-7 text-gray-700">
          <h1 className="mb-2 text-lg font-semibold uppercase leading-8 text-marian-blue-800 sm:text-xl">
            {staticPage.title}
          </h1>
          <p className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            We don&rsquo;t have a silver bullet for cloud security.
          </p>
          <MarkdownContent className="static-page">
            {staticPage.content.markdown}
          </MarkdownContent>
        </div>
      </div>
      <Team />
    </>
  );
}
