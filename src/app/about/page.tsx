import { Metadata } from 'next';

import { getStaticPage } from '@/lib/hashnode';

import MarkdownContent from '@/components/common/MarkdownContent';
import Faq from '@/components/Faq';
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
          <h1 className="mb-3 text-lg font-bold uppercase leading-7 text-gray-600 sm:text-xl">
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
    </>
  );
}
