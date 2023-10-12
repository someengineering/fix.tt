import type { Metadata } from 'next';

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
  return await getHashnodePost({ slug });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: post.title,
    description: post.brief,
    openGraph: {
      url: `${siteConfig.url}/blog/${post.slug}`,
      title: post.title,
      description: post.brief,
      images: [
        openGraph({
          title: post.title,
          metadata: post.subtitle,
        }),
      ],
      type: 'article',
    },
    twitter: {
      title: `${post.title} | ${siteConfig.title}`,
      description: post.brief,
      images: [
        openGraph({
          title: post.title,
          metadata: post.subtitle,
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

  return (
    <div className="px-6 py-32 lg:px-8">
      <BlogPost post={post} />
    </div>
  );
}
