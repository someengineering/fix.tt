import type { Metadata } from 'next';
import { headers } from 'next/headers';

import BlogPost from '@/components/blog/BlogPost';

import { siteConfig } from '@/constants/config';
import { isVercel } from '@/constants/env';
import { HashnodePost } from '@/interfaces/hashnode';
import { openGraph } from '@/utils/og';

export const revalidate = 600; // revalidate at most every 10 minutes

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const host = headers().get('host');

  const blogPost = (await fetch(
    `${isVercel ? 'https' : 'http'}://${host}/api/blog/post?slug=${
      params.slug
    }`,
  ).then((res) => res.json())) as HashnodePost;

  return {
    title: blogPost.title,
    description: blogPost.brief,
    openGraph: {
      url: `${siteConfig.url}/blog/${params.slug}`,
      title: blogPost.title,
      description: blogPost.brief,
      images: [
        openGraph({
          title: blogPost.title,
          metadata: blogPost.subtitle,
        }),
      ],
      type: 'article',
    },
    twitter: {
      title: `${blogPost.title} | ${siteConfig.title}`,
      description: blogPost.brief,
      images: [
        openGraph({
          title: blogPost.title,
          metadata: blogPost.subtitle,
        }),
      ],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="px-6 py-32 lg:px-8">
      <BlogPost slug={params.slug} />
    </div>
  );
}
