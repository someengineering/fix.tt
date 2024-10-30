import { metadata as rootMetadata } from '@/app/layout';
import HashnodePageView from '@/components/analytics/HashnodePageView';
import BlogPostList from '@/components/blog/BlogPostList';
import { siteConfig } from '@/constants/config';
import { isProd } from '@/constants/env';
import {
  getAllTagSlugs,
  getPostsByTag,
  getPublication,
  getTagName,
} from '@/lib/hashnode';
import { openGraph } from '@/utils/og';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = await getAllTagSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const tag = await getTagName(slug);

  if (!tag) {
    return {};
  }

  const url = `${siteConfig.url}/blog/tag/${slug}`;
  const title = `${tag.charAt(0).toUpperCase()}${tag.slice(1)} | Blog`;
  const description = `Guides, how-tos, and news from the Fix Security team.`;
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

export default async function BlogTagPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const publicationData = getPublication();
  const tagNameData = getTagName(slug);
  const postsData = getPostsByTag({ tagSlug: slug });

  const [publication, tagName, posts] = await Promise.all([
    publicationData,
    tagNameData,
    postsData,
  ]);

  if (!publication || !tagName || !posts) {
    notFound();
  }

  return (
    <>
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className="mx-auto max-w-2xl lg:max-w-4xl"
            itemScope
            itemType="http://schema.org/Blog"
            itemID={`${siteConfig.url}/blog`}
          >
            <meta itemProp="name" content={publication.title} />
            <meta itemProp="description" content={publication.about?.text} />
            <p className="mb-2 text-lg font-bold uppercase leading-8 text-cornflower-blue-600 sm:text-xl">
              From the blog
            </p>
            <h1 className="text-pretty text-4xl font-extrabold sm:text-5xl">
              {tagName.charAt(0).toUpperCase()}
              {tagName.slice(1)}
            </h1>
            <p className="mt-6 text-pretty text-lg font-semibold text-gray-900 sm:text-xl">
              Guides, how-tos, and news about from the Fix Security team.
            </p>
            <BlogPostList
              initialPosts={posts.edges.map((edge) => edge.node)}
              initialPageInfo={posts.pageInfo}
              getPosts={async (after: string) => {
                'use server';

                return await getPostsByTag({
                  tagSlug: slug,
                  after,
                });
              }}
            />
          </div>
        </div>
      </div>
      {isProd ? <HashnodePageView publicationId={publication.id} /> : null}
    </>
  );
}
