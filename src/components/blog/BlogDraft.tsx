import BlogPostContent from '@/components/blog/BlogPost/BlogPostContent';
import BlogPostFooter from '@/components/blog/BlogPost/BlogPostFooter';
import BlogPostHeader from '@/components/blog/BlogPost/BlogPostHeader';

import { siteConfig } from '@/constants/config';
import { DraftFragment as HashnodeDraft } from '@/generated/hashnode/graphql';

export default function BlogDraft({ draft }: { draft: HashnodeDraft }) {
  if (!draft.title || !draft.author) {
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
          title={draft.title}
          subtitle={draft.subtitle ?? undefined}
          author={draft.author}
          tags={draft.tagsV2}
          publishedAt={draft.updatedAt}
        />
        <BlogPostContent markdown={draft.content?.markdown} />
        <BlogPostFooter title={draft.title} tags={draft.tagsV2} />
      </article>
    </div>
  );
}
