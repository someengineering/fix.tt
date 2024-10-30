import UnstyledLink from '@/components/common/links/UnstyledLink';
import { siteConfig } from '@/constants/config';
import { PostFragment as HashnodePost } from '@/generated/hashnode/graphql';
import { getUserLink, getUserTitle } from '@/utils/hashnode';
import { openGraph } from '@/utils/og';
import Image from 'next/image';
import { LuBookOpen, LuUserCircle2 } from 'react-icons/lu';

export default function Item({ post }: { post: HashnodePost }) {
  if (!post) {
    return null;
  }

  const authorLink = getUserLink(post.author);
  const authorDescription = getUserTitle(post.author);

  return (
    <article
      className="relative flex flex-col items-center gap-8 lg:flex-row"
      itemProp="blogPost"
      itemScope
      itemType="http://schema.org/BlogPosting"
      itemID={`${siteConfig.url}/blog/${post.slug}`}
    >
      <div className="relative hidden overflow-hidden rounded-2xl lg:block lg:aspect-[7/8] lg:w-60 lg:shrink-0">
        {post.coverImage ? (
          <Image
            src={post.coverImage.url}
            sizes="240px"
            alt=""
            className="bg-gray-50 object-cover"
            fill
          />
        ) : (
          <div className="h-full w-full bg-gray-50 object-cover" />
        )}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div className="w-full">
        <header className="flex flex-wrap items-center gap-x-5 gap-y-0.5 text-sm font-bold uppercase leading-7 text-gray-600">
          {post.series ? (
            <UnstyledLink
              href={`/blog/series/${post.series.slug}`}
              title="This post is part of a series"
              className="whitespace-nowrap rounded-md bg-cornflower-blue-800 px-2 py-1 font-extrabold leading-none text-white hover:bg-cornflower-blue-900"
            >
              {post.series.name}
            </UnstyledLink>
          ) : null}
          <span className="flex flex-wrap items-center gap-x-5">
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
          <h2
            className="mt-1 text-pretty text-3xl font-extrabold text-cornflower-blue-600 group-hover:text-cornflower-blue-700"
            itemProp="headline"
          >
            <UnstyledLink href={`/blog/${post.slug}`} itemProp="url">
              <span className="absolute inset-0" />
              {post.title}
            </UnstyledLink>
          </h2>
          <p
            className="text-pretty text-base font-semibold text-gray-900"
            itemProp="description"
          >
            {post.subtitle ?? post.brief}
          </p>
          <div
            className="relative flex items-center gap-x-3 pt-2"
            itemProp="author"
            itemScope
            itemType="https://schema.org/Person"
          >
            {post.author.profilePicture ? (
              <Image
                src={post.author.profilePicture}
                width={44}
                height={44}
                sizes="44px"
                alt=""
                className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-gray-50"
                itemProp="image"
              />
            ) : (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-50 text-gray-300">
                <LuUserCircle2 className="h-[110%] w-[110%] shrink-0" />
              </div>
            )}
            <div>
              <p
                className="text-base font-semibold text-gray-900"
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
                  className="line-clamp-1 text-sm font-medium text-gray-600"
                  itemProp="description"
                >
                  {authorDescription}
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <footer className="mt-4 flex flex-wrap gap-1.5 text-sm font-semibold text-cornflower-blue-600">
          {post.tags?.map((tag) => (
            <UnstyledLink
              href={`/blog/tag/${tag.slug}`}
              className="z-10 text-nowrap rounded-md bg-gray-50 px-3 py-1.5 hover:bg-marian-blue-50"
              key={`tag-${tag.slug}`}
            >
              {tag.name}
            </UnstyledLink>
          ))}
        </footer>
      </div>
    </article>
  );
}
