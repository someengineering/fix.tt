'use client';

import useSWR from 'swr';

import BlogPostContent from '@/components/blog/BlogPost/BlogPostContent';
import BlogPostFooter from '@/components/blog/BlogPost/BlogPostFooter';
import BlogPostHeader from '@/components/blog/BlogPost/BlogPostHeader';

import { siteConfig } from '@/constants/config';
import { HashnodeDraft } from '@/interfaces/hashnode';

export default function BlogDraft({ draft }: { draft: HashnodeDraft }) {
  const { data } = useSWR<HashnodeDraft>(`/api/blog/draft?id=${draft.id}`, {
    fallbackData: draft,
  });

  if (!data) {
    return null;
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
      >
        <BlogPostHeader
          title={data.title}
          subtitle={data.subtitle}
          author={data.author}
          tags={data.tags}
          publishedAt={data.dateUpdated}
        />
        <BlogPostContent markdown={data.content?.markdown} />
        <BlogPostFooter title={data.title} tags={data.tags} />
      </article>
    </div>
  );
}
