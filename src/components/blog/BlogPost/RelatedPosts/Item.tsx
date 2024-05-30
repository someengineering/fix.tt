import Image from 'next/image';
import { LuBookOpen, LuUserCircle2 } from 'react-icons/lu';

import UnstyledLink from '@/components/common/links/UnstyledLink';

import { siteConfig } from '@/constants/config';
import { PostFragment as HashnodePost } from '@/generated/hashnode/graphql';
import { getUserLink, getUserTitle } from '@/utils/hashnode';
import { openGraph } from '@/utils/og';

export default function Item({
  post,
  index,
}: {
  post: HashnodePost;
  index: number;
}) {
  if (!post) {
    return null;
  }

  const authorLink = getUserLink(post.author);
  const authorDescription = getUserTitle(post.author);

  return (
    <article
      className={`flex flex-col space-y-5 ${index > 1 ? 'md:hidden lg:flex' : ''}`}
      itemProp="blogPost"
      itemScope
      itemType="http://schema.org/BlogPosting"
      itemID={`${siteConfig.url}/blog/${post.slug}`}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl sm:aspect-[2/1]">
        {post.coverImage ? (
          <Image
            src={post.coverImage.url}
            alt=""
            className="bg-gray-50 object-cover"
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          />
        ) : (
          <div className="h-full w-full bg-gray-50 object-cover" />
        )}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div>
        <header className="flex items-center gap-x-5 text-xs font-bold uppercase leading-7 text-gray-600">
          <time
            dateTime={post.publishedAt}
            itemProp="datePublished"
            className="whitespace-nowrap"
          >
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span className="flex items-center space-x-1.5 whitespace-nowrap">
            <LuBookOpen className="h-4 w-4" aria-hidden="true" />
            <span>{post.readTimeInMinutes} min read</span>
          </span>
          <link
            itemProp="image"
            href={openGraph({
              title: post.title,
              description: post.subtitle ?? undefined,
            })}
          />
          {post.updatedAt ? (
            <meta itemProp="dateModified" content={post.updatedAt} />
          ) : null}
        </header>
        <div className="group relative space-y-2">
          <h3
            className="mt-0.5 text-pretty text-2xl font-extrabold text-cornflower-blue-600 group-hover:text-cornflower-blue-700"
            itemProp="headline"
          >
            <UnstyledLink href={`/blog/${post.slug}`} itemProp="url">
              <span className="absolute inset-0" />
              {post.title}
            </UnstyledLink>
          </h3>
          <p
            className="text-pretty text-sm font-semibold text-gray-900"
            itemProp="description"
          >
            {post.subtitle ?? post.brief}
          </p>
        </div>
        <footer className="mt-2">
          <div
            className="flex items-center gap-x-3 pt-2"
            itemProp="author"
            itemScope
            itemType="https://schema.org/Person"
          >
            {post.author.profilePicture ? (
              <Image
                src={post.author.profilePicture}
                alt=""
                className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gray-50"
                width={36}
                height={36}
                itemProp="image"
              />
            ) : (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-50 text-gray-300">
                <LuUserCircle2 className="h-[110%] w-[110%] shrink-0" />
              </div>
            )}
            <div>
              <p
                className="text-sm font-semibold text-gray-900"
                itemProp="name"
              >
                {authorLink ? (
                  <UnstyledLink href={authorLink} itemProp="url">
                    {post.author.name}
                  </UnstyledLink>
                ) : (
                  <>{post.author.name}</>
                )}
              </p>
              {authorDescription ? (
                <p
                  className="line-clamp-1 text-xs font-medium text-gray-600"
                  itemProp="description"
                >
                  {authorDescription}
                </p>
              ) : null}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5 text-xs font-semibold text-cornflower-blue-600">
            {post.tags?.map((tag) => (
              <UnstyledLink
                href={`/blog/tag/${tag.slug}`}
                className="z-10 text-nowrap rounded-md bg-gray-50 px-3 py-1.5 hover:bg-marian-blue-50"
                key={`tag-${tag.slug}`}
              >
                {tag.name}
              </UnstyledLink>
            ))}
          </div>
        </footer>
      </div>
    </article>
  );
}
