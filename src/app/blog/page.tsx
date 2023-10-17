import { Metadata } from 'next';

import BlogPostList from '@/components/blog/BlogPostList';

import { getHashnodePosts } from '@/api/hashnode';
import { siteConfig } from '@/constants/config';
import { openGraph } from '@/utils/og';

async function getPosts() {
  return await getHashnodePosts({});
}

const title = 'Blog';
const description =
  'Guides, how-tos, and news about cloud security and the Fix platform.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    url: `${siteConfig.url}/blog`,
    title,
    images: [
      openGraph({
        title,
        description,
      }),
    ],
  },
  twitter: {
    title: `${title} | ${siteConfig.title}`,
    images: [
      openGraph({
        title,
        description,
      }),
    ],
  },
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="mx-auto max-w-2xl lg:max-w-4xl"
          itemScope
          itemType="http://schema.org/Blog"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">{description}</p>
          <BlogPostList fallbackData={posts} />
        </div>
      </div>
    </div>
  );
}
