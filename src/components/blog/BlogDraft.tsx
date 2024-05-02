import Content from '@/components/blog/BlogPost/Content';
import Footer from '@/components/blog/BlogPost/Footer';
import Header from '@/components/blog/BlogPost/Header';
import RelatedPosts from '@/components/blog/BlogPost/RelatedPosts';

import { siteConfig } from '@/constants/config';
import { DraftFragment as HashnodeDraft } from '@/generated/hashnode/graphql';

export default function BlogDraft({ draft }: { draft: HashnodeDraft }) {
  if (!draft.title || !draft.author || !draft.content) {
    return null;
  }

  return (
    <div
      className="px-6 py-16 sm:py-24 lg:px-8"
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
          series={draft.series ?? undefined}
          tags={draft.tagsV2}
          publishedAt={draft.scheduledDate ?? draft.updatedAt}
          readTimeInMinutes={draft.readTimeInMinutes}
        />
        <Content
          markdown={draft.content.markdown}
          tocItems={
            draft.features.tableOfContents.isEnabled
              ? draft.features.tableOfContents.items
              : undefined
          }
        />
        <Footer title={draft.title} tags={draft.tagsV2} />
        {draft.series ? <RelatedPosts seriesSlug={draft.series.slug} /> : null}
      </article>
    </div>
  );
}
