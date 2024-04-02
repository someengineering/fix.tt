import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getAllTagSlugs, getPostsByTag, getTagName } from '@/lib/hashnode';

import BlogPostList from '@/components/blog/BlogPostList';

import { metadata as rootMetadata } from '@/app/layout';
import { siteConfig } from '@/constants/config';
import { openGraph } from '@/utils/og';

export async function generateStaticParams() {
  const slugs = await getAllTagSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const tag = await getTagName(params.slug);

  if (!tag) {
    return {};
  }

  const url = `${siteConfig.url}/blog/tag/${params.slug}`;
  const title = `${tag.charAt(0).toUpperCase()}${tag.slice(1)} | Blog`;
  const description = `Guides, how-tos, and news about ${tag} from the Fix team.`;
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

export default async function BlogTagPage({
  params,
}: {
  params: { slug: string };
}) {
  const tagNameData = getTagName(params.slug);
  const postsData = getPostsByTag({ tagSlug: params.slug });

  const [tagName, posts] = await Promise.all([tagNameData, postsData]);

  if (!tagName || !posts) {
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
          <p className="mb-3 text-lg font-bold uppercase leading-7 text-gray-600 sm:text-xl">
            From the blog
          </p>
          <h1 className="text-pretty text-4xl font-extrabold sm:text-5xl">
            {tagName.charAt(0).toUpperCase()}
            {tagName.slice(1)}
          </h1>
          <p className="mt-6 text-pretty text-lg font-semibold text-gray-900 sm:text-xl">
            Guides, how-tos, and news about {tagName} from the Fix team.
          </p>
          <BlogPostList
            initialPosts={posts.edges.map((edge) => edge.node)}
            initialPageInfo={posts.pageInfo}
            getPosts={async (after: string) => {
              'use server';

              return await getPostsByTag({
                tagSlug: params.slug,
                after,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
