import Content from '@/components/blog/BlogPost/Content';
import CustomerStory from '@/components/blog/BlogPost/CustomerStory';
import Footer from '@/components/blog/BlogPost/Footer';
import Header from '@/components/blog/BlogPost/Header';
import RelatedPosts from '@/components/blog/BlogPost/RelatedPosts';
import { siteConfig } from '@/constants/config';
import {
  DraftFragment as HashnodeDraft,
  PublicationFragment as HashnodePublication,
} from '@/generated/hashnode/graphql';

export default function BlogDraft({
  draft,
  publication,
}: {
  draft: HashnodeDraft;
  publication: HashnodePublication;
}) {
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
      <meta itemProp="name" content={publication.title} />
      <meta itemProp="description" content={publication.about?.text} />
      <article
        className="mx-auto max-w-3xl"
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
        {draft.series?.slug === 'customer-stories' ? (
          <CustomerStory slug={draft.slug} markdown={draft.content.markdown} />
        ) : (
          <Content
            markdown={draft.content.markdown}
            tocItems={
              draft.features.tableOfContents.isEnabled
                ? draft.features.tableOfContents.items
                : undefined
            }
            coverImage={draft.coverImage?.url}
          />
        )}
        <Footer title={draft.title} tags={draft.tagsV2} />
      </article>
      {draft.tagsV2?.find((tag) => tag.slug === 'launch-week') ? (
        <RelatedPosts tagSlug="launch-week" />
      ) : draft.series ? (
        <RelatedPosts seriesSlug={draft.series.slug} />
      ) : null}
    </div>
  );
}
