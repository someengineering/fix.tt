import MarkdownContent from '@/components/blog/MarkdownContent';
import UnstyledLink from '@/components/common/links/UnstyledLink';
import NextImage from '@/components/common/NextImage';

import { siteConfig } from '@/constants/config';
import { HashnodePost } from '@/interfaces/hashnode';
import { getUserLink } from '@/utils/hashnode';

export default function BlogPost({ post }: { post: HashnodePost }) {
  const url = `${siteConfig.url}/blog/${post.slug}`;

  const authorLink = post.author ? getUserLink(post.author) : undefined;

  return (
    <article
      className="mx-auto max-w-3xl text-lg leading-7 text-gray-700"
      itemProp="blogPost"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <header className="flex items-center gap-x-4 text-base">
        <time
          dateTime={post.publishedAt}
          className="text-gray-500"
          itemProp="datePublished"
        >
          {new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        {/* {post.tags?.map((tag) => (
          <UnstyledLink
            href={`/blog/tags/${tag.slug}`}
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
            key={`tag-${tag.slug}`}
          >
            {tag.name}
          </UnstyledLink>
        ))} */}
        <meta itemProp="description" content={post.brief} />
        <meta itemProp="url" content={url} />
        {post.coverImage ? (
          <meta itemProp="image" content={post.coverImage.url} />
        ) : null}
      </header>
      <div>
        <h1
          className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          itemProp="headline"
        >
          {post.title}
        </h1>
      </div>
      <div className="w-prose" itemProp="articleBody">
        <MarkdownContent>{post.content?.markdown}</MarkdownContent>
      </div>
      <footer className="mt-6 flex border-t border-gray-900/5 pt-6">
        <div
          className="relative flex items-center gap-x-4"
          itemProp="author"
          itemScope
          itemType="https://schema.org/Person"
        >
          <NextImage
            src={post.author.profilePicture}
            alt=""
            className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-50"
            classNames={{ image: 'w-full h-full object-cover' }}
            width={40}
            height={40}
          />
          <div className="text-base leading-6">
            <p className="font-semibold text-gray-900" itemProp="name">
              {authorLink ? (
                <UnstyledLink href={authorLink} itemProp="url">
                  <span className="absolute inset-0" />
                  {post.author.name}
                </UnstyledLink>
              ) : (
                <>{post.author.name}</>
              )}
            </p>
            <p className="line-clamp-1 text-gray-600" itemProp="description">
              {post.author.tagline}
            </p>
          </div>
        </div>
      </footer>
    </article>
  );
}
