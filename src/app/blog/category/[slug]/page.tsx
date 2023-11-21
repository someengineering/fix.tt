import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getAllSeriesSlugs, getPostsBySeries, getSeries } from '@/lib/hashnode';

import BlogPostList from '@/components/blog/BlogPostList';

import { metadata as rootMetadata } from '@/app/layout';
import { siteConfig } from '@/constants/config';
import { openGraph } from '@/utils/og';

export async function generateStaticParams() {
  const slugs = await getAllSeriesSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const series = await getSeries(params.slug);

  if (!series || !series.posts.totalDocuments) {
    return {};
  }

  const url = `${siteConfig.url}/blog/category/${params.slug}`;
  const title = `${series.name} | Blog`;
  const description = series.description?.text;
  const ogImage = openGraph({
    title,
    description,
  });

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
  };
}

export default async function BlogSeriesPage({
  params,
}: {
  params: { slug: string };
}) {
  const seriesInfoData = getSeries(params.slug);
  const postsData = getPostsBySeries({ seriesSlug: params.slug });

  const [seriesInfo, posts] = await Promise.all([seriesInfoData, postsData]);

  if (!seriesInfo || !seriesInfo.posts.totalDocuments || !posts) {
    redirect('/blog');
  }

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="mx-auto max-w-2xl lg:max-w-4xl"
          itemScope
          itemType="http://schema.org/Blog"
          itemID={`${siteConfig.url}/blog`}
        >
          <meta itemProp="name" content={siteConfig.blogTitle} />
          <meta itemProp="description" content={siteConfig.blogDescription} />
          <p className="mb-2 text-lg font-semibold uppercase leading-8 text-marian-blue-800 sm:text-xl">
            From the blog
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {seriesInfo.name}
          </h1>
          {seriesInfo.description ? (
            <p className="mt-2 text-xl leading-8 text-gray-600 sm:text-2xl sm:leading-9">
              {seriesInfo.description.text}
            </p>
          ) : null}
          <BlogPostList
            initialPosts={posts.edges.map((edge) => edge.node)}
            initialPageInfo={posts.pageInfo}
            getPosts={async (after: string) => {
              'use server';

              return await getPostsBySeries({
                seriesSlug: params.slug,
                after,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
