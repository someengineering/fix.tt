import BlogPostAnalytics from '@/components/blog/BlogPost/BlogPostAnalytics';
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

  return (
    <>
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
          <BlogPostContent
            markdown={post.content?.markdown}
            tocItems={
              post.features.tableOfContents.isEnabled
                ? post.features.tableOfContents.items
                : undefined
            }
          />
          <BlogPostFooter
            url={url}
            title={post.title}
            tags={post.tags ?? undefined}
          />
        </article>
      </div>
      {isProd ? (
        <BlogPostAnalytics
          publicationId={publicationId}
          postId={post.id}
          url={url}
        />
      ) : null}
    </>
  );
}
