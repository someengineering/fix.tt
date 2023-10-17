import { Metadata } from 'next';

import BlogPostList from '@/components/blog/BlogPostList';

import {
  getHashnodePosts,
  getHashnodeTagName,
  getHashnodeTagSlugs,
} from '@/api/hashnode';
import { siteConfig } from '@/constants/config';
import { openGraph } from '@/utils/og';

export async function generateStaticParams() {
  const slugs = await getHashnodeTagSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

async function getTagName(slug: string) {
  return await getHashnodeTagName(slug);
}

async function getPosts(tag: string) {
  return await getHashnodePosts({ tag });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const tag = await getTagName(params.slug);

  const title = `${tag.charAt(0).toUpperCase()}${tag.slice(1)}`;
  const description = `Blog posts about ${tag} and the Fix platform.`;

  return {
    title,
    description,
    openGraph: {
      url: `${siteConfig.url}/blog/tag/${params.slug}`,
      title,
      description,
      images: [
        openGraph({
          title,
          description,
        }),
      ],
      tags: [tag],
    },
    twitter: {
      title: `${title} | ${siteConfig.title}`,
      description,
      images: [
        openGraph({
          title,
          description,
        }),
      ],
    },
  };
}

export default async function BlogTagPage({
  params,
}: {
  params: { slug: string };
}) {
  const tag = await getTagName(params.slug);
  const posts = await getPosts(params.slug);

  const title = `${tag.charAt(0).toUpperCase()}${tag.slice(1)}`;
  const description = `Blog posts about ${tag} and the Fix platform.`;

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
