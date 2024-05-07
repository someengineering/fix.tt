import type { Metadata } from 'next';

import { getAllStaticPageSlugs, getStaticPage } from '@/lib/hashnode';

import MarkdownContent from '@/components/common/MarkdownContent';

import { metadata as rootMetadata } from '@/app/layout';
import NotFoundPage, { metadata as notFoundMetadata } from '@/app/not-found';
import { siteConfig } from '@/constants/config';
import { openGraph } from '@/utils/og';

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getAllStaticPageSlugs();

  return slugs.map((slug) => ({
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
  const staticPage = await getStaticPage(params.slug);

  if (!staticPage) {
    return <NotFoundPage />;
  }

  return (
    <div className="px-6 py-16 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-3xl text-lg text-gray-700">
        <h1 className="text-pretty text-4xl font-extrabold sm:text-5xl">
          {staticPage.title}
        </h1>
        <MarkdownContent className="static-page">
          {staticPage.content.markdown}
        </MarkdownContent>
      </div>
    </div>
  );
}
