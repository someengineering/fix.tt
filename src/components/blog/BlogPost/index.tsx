import HashnodePageView from '@/components/analytics/HashnodePageView';
import Content from '@/components/blog/BlogPost/Content';
import CustomerStory from '@/components/blog/BlogPost/CustomerStory';
import Footer from '@/components/blog/BlogPost/Footer';
import Header from '@/components/blog/BlogPost/Header';
import RelatedPosts from '@/components/blog/BlogPost/RelatedPosts';
import { siteConfig } from '@/constants/config';
import { isProd } from '@/constants/env';
import {
  PostWithMarkdownContentFragment as HashnodePost,
  PublicationFragment as HashnodePublication,
} from '@/generated/hashnode/graphql';

export default function BlogPost({
  post,
  publication,
}: {
  post: HashnodePost;
  publication: HashnodePublication;
}) {
  const url = `${siteConfig.url}/blog/${post.slug}`;

  return (
    <>
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
          itemID={url}
        >
          <Header
            url={url}
            title={post.title}
            subtitle={post.subtitle ?? undefined}
            brief={post.brief}
            author={post.author}
            series={post.series ?? undefined}
            tags={post.tags ?? undefined}
            publishedAt={post.publishedAt}
            updatedAt={post.updatedAt ?? undefined}
            readTimeInMinutes={post.readTimeInMinutes}
          />
          {post.series?.slug === 'customer-stories' ? (
            <CustomerStory slug={post.slug} markdown={post.content.markdown} />
          ) : (
            <Content
              markdown={post.content.markdown}
              tocItems={
                post.features.tableOfContents.isEnabled
                  ? post.features.tableOfContents.items
                  : undefined
              }
            />
          )}
          <Footer url={url} title={post.title} tags={post.tags ?? undefined} />
        </article>
        {post.series ? (
          <RelatedPosts
            seriesSlug={post.series.slug}
            excludePostSlug={post.slug}
          />
        ) : null}
      </div>
      {isProd ? (
        <HashnodePageView
          publicationId={publication.id}
          postId={post.id}
          seriesId={post.series?.id}
        />
      ) : null}
    </>
  );
}
