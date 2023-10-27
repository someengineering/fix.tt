'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import useSWR from 'swr';

import BlogPostContent from '@/components/blog/BlogPost/BlogPostContent';
import BlogPostFooter from '@/components/blog/BlogPost/BlogPostFooter';
import BlogPostHeader from '@/components/blog/BlogPost/BlogPostHeader';

import { siteConfig } from '@/constants/config';
import { isProd } from '@/constants/env';
import { PostWithMarkdownContentFragment as HashnodePost } from '@/generated/hashnode/graphql';

export default function BlogPost({
  post,
  publicationId,
}: {
  post: HashnodePost;
  publicationId: string;
}) {
  const url = `${siteConfig.url}/blog/${post.slug}`;

  useEffect(() => {
    if (!isProd) {
      return;
    }

    try {
      fetch(`/api/blog/view`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            publicationId,
            postId: post.id,
            url,
            timestamp: Date.now(),
            timezoneOffset: new Date().getTimezoneOffset(),
          },
        }),
      });
    } catch (e) {
      /* do not throw */
    }
  }, [post.id, publicationId, url]);

  const { data } = useSWR<HashnodePost>(`/api/blog/post?slug=${post.slug}`, {
    fallbackData: post,
  });

  if (!data) {
    redirect('/blog');
  }

  return (
    <div
      className="px-6 py-32 lg:px-8"
      itemScope
      itemType="http://schema.org/Blog"
      itemID={`${siteConfig.url}/blog`}
    >
      <meta itemProp="name" content={siteConfig.blogTitle} />
      <meta itemProp="description" content={siteConfig.blogDescription} />
      <article
        className="mx-auto max-w-3xl text-lg leading-7 text-gray-700"
        itemProp="blogPost"
        itemScope
        itemType="http://schema.org/BlogPosting"
        itemID={url}
      >
        <BlogPostHeader
          url={url}
          title={data.title}
          subtitle={data.subtitle ?? undefined}
          brief={data.brief}
          author={data.author}
          tags={data.tags ?? undefined}
          publishedAt={data.publishedAt}
          updatedAt={data.updatedAt ?? undefined}
          readTimeInMinutes={data.readTimeInMinutes}
        />
        <BlogPostContent markdown={data.content?.markdown} />
        <BlogPostFooter
          url={url}
          title={data.title}
          tags={data.tags ?? undefined}
        />
      </article>
    </div>
  );
}
