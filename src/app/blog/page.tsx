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
  const data = await getPosts({});

  if (!data) {
    redirect('/');
  }

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="mx-auto max-w-2xl lg:max-w-4xl"
          itemScope
          itemType="http://schema.org/Blog"
          itemID={url}
        >
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <meta itemProp="name" content={siteConfig.blogTitle} />
          <p
            className="mt-2 text-xl leading-8 text-gray-600"
            itemProp="description"
          >
            {description}
          </p>
          <BlogPostList
            initialPosts={data.edges.map((edge) => edge.node)}
            initialPageInfo={data.pageInfo}
          />
        </div>
      </div>
    </div>
  );
}
