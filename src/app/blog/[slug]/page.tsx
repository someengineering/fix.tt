import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import BlogPost from '@/components/blog/BlogPost';

import { getHashnodePost, getHashnodePostSlugs } from '@/api/hashnode';
import { siteConfig } from '@/constants/config';
import { openGraph } from '@/utils/og';

export async function generateStaticParams() {
  const slugs = await getHashnodePostSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

async function getPost(slug: string) {
  return await getHashnodePost(slug);
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {};
  }

  const title = post.title;
  const description = post.subtitle ?? post.brief;

  return {
    title,
    description,
    openGraph: {
      url: `${siteConfig.url}/blog/${post.slug}`,
      title,
      description,
      images: [
        openGraph({
          title,
          description: post.subtitle,
        }),
      ],
      type: 'article',
      tags: post.tags?.map((tag) => tag.name),
      publishedTime: post.publishedAt,
    },
    twitter: {
      title: `${post.title} | ${siteConfig.title}`,
      description,
      images: [
        openGraph({
          title,
          description: post.subtitle,
        }),
      ],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    redirect('/blog');
  }

  return <BlogPost post={post} />;
}
