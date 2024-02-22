import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getPosts } from '@/lib/hashnode';

import BlogPostList from '@/components/blog/BlogPostList';

import { metadata as rootMetadata } from '@/app/layout';
import { siteConfig } from '@/constants/config';
import { openGraph } from '@/utils/og';

const url = `${siteConfig.url}/blog`;
const title = 'Blog';
const description = siteConfig.blogDescription;
const ogImage = openGraph({
  title,
  description,
});

export const metadata: Metadata = {
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
    images: [ogImage],
  },
  twitter: {
    ...rootMetadata.twitter,
    title: `${title} | ${siteConfig.title}`,
    images: [ogImage],
  },
};

export default async function BlogPage() {
  const posts = await getPosts({});

  if (!posts) {
    redirect('/');
  }

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="mx-auto max-w-2xl lg:max-w-4xl"
          itemScope
          itemType="http://schema.org/Blog"
          itemID={url}
        >
          <h1 className="text-pretty font-display text-4xl font-medium uppercase text-marian-blue-900 sm:text-5xl">
            {title}
          </h1>
          <meta itemProp="name" content={siteConfig.blogTitle} />
          <p
            className="mt-6 text-pretty text-lg font-semibold text-gray-900 sm:text-xl"
            itemProp="description"
          >
            {description}
          </p>
          <BlogPostList
            initialPosts={posts.edges.map((edge) => edge.node)}
            initialPageInfo={posts.pageInfo}
            getPosts={async (after: string) => {
              'use server';

              return await getPosts({
                after,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
