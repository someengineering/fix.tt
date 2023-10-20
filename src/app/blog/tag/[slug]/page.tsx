import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import BlogPostList from '@/components/blog/BlogPostList';

import {
  getHashnodePosts,
  getHashnodeTagName,
  getHashnodeTagSlugs,
} from '@/api/hashnode';
import { metadata as rootMetadata } from '@/app/layout';
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

  if (!tag) {
    return {};
  }

  const url = `${siteConfig.url}/blog/tag/${params.slug}`;
  const title = `${tag.charAt(0).toUpperCase()}${tag.slice(1)}`;
  const description = `Guides, how-tos, and news about ${tag} from the Fix team.`;

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
      images: [
        openGraph({
          title,
          description,
        }),
      ],
    },
    twitter: {
      ...rootMetadata.twitter,
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

  if (!tag || !posts.length) {
    redirect('/blog');
  }

  const title = `${tag.charAt(0).toUpperCase()}${tag.slice(1)}`;
  const description = `Guides, how-tos, and news about ${tag} from the Fix team.`;

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="mx-auto max-w-2xl lg:max-w-4xl"
          itemScope
          itemType="http://schema.org/Blog"
        >
          <p className="mb-2 text-base font-semibold uppercase leading-7 text-primary-900">
            From the blog
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-2 text-xl leading-8 text-gray-600">{description}</p>
          <BlogPostList fallbackData={posts} />
        </div>
      </div>
    </div>
  );
}
