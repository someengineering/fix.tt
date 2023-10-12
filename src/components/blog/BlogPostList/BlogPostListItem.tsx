'use client';

import UnstyledLink from '@/components/common/links/UnstyledLink';
import NextImage from '@/components/common/NextImage';

import { HashnodePost } from '@/interfaces/hashnode';
import { getUserLink } from '@/utils/hashnode';

export default function BlogPostListItem({ post }: { post: HashnodePost }) {
  if (!post) {
    return null;
  }

  const authorLink = post.author ? getUserLink(post.author) : undefined;

  return (
    <article
      className="relative isolate flex flex-col gap-8 lg:flex-row"
      itemProp="blogPost"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
        {post.coverImage ? (
          <NextImage
            src={post.coverImage.url}
            alt=""
            className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl bg-gray-50"
            classNames={{ image: 'object-cover' }}
            layout="fill"
            itemProp="image"
          />
        ) : (
          <div className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover" />
        )}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div>
        <header className="flex items-center gap-x-4 text-sm">
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
        </header>
        <div className="group relative max-w-xl">
          <h3
            className="mt-3 text-xl font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
            itemProp="headline"
          >
            <UnstyledLink href={`/blog/${post.slug}`} itemProp="url">
              <span className="absolute inset-0" />
              {post.title}
            </UnstyledLink>
          </h3>
          <p
            className="mt-5 text-base leading-6 text-gray-600"
            itemProp="description"
          >
            {post.brief}
          </p>
        </div>
        <footer className="mt-6 flex border-t border-gray-900/5 pt-6">
          <div className="relative flex items-center gap-x-4">
            <NextImage
              src={post.author.profilePicture}
              alt=""
              className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-50"
              classNames={{ image: 'w-full h-full object-cover' }}
              width={40}
              height={40}
            />
            <div className="text-base leading-6">
              <p className="font-semibold text-gray-900">
                {authorLink ? (
                  <UnstyledLink href={authorLink}>
                    <span className="absolute inset-0" />
                    {post.author.name}
                  </UnstyledLink>
                ) : (
                  <>{post.author.name}</>
                )}
              </p>
              <p className="line-clamp-1 text-gray-600">
                {post.author.tagline}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}
