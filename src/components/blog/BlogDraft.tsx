import Content from '@/components/blog/BlogPost/Content';
import Footer from '@/components/blog/BlogPost/Footer';
import Header from '@/components/blog/BlogPost/Header';

import { siteConfig } from '@/constants/config';
import { DraftFragment as HashnodeDraft } from '@/generated/hashnode/graphql';

export default function BlogDraft({ draft }: { draft: HashnodeDraft }) {
  if (!draft.title || !draft.author) {
    return null;
  }

  return (
    <div
      className="px-6 pt-32 lg:px-8"
      itemScope
      itemType="http://schema.org/Blog"
      itemID={`${siteConfig.url}/blog`}
    >
      <meta itemProp="name" content={siteConfig.blogTitle} />
      <meta itemProp="description" content={siteConfig.blogDescription} />
      <article
        className="mx-auto max-w-3xl text-lg text-gray-700"
        itemProp="blogPost"
        itemScope
        itemType="http://schema.org/BlogPosting"
      >
        <Header
          title={draft.title}
          subtitle={draft.subtitle ?? undefined}
          author={draft.author}
          tags={draft.tagsV2}
          publishedAt={draft.updatedAt}
        />
        <Content markdown={draft.content?.markdown} />
        <Footer title={draft.title} tags={draft.tagsV2} />
      </article>
    </div>
  );
}
