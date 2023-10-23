'use client';

import { redirect } from 'next/navigation';
import { LuBookOpen } from 'react-icons/lu';
import useSWR from 'swr';

import MarkdownContent from '@/components/blog/MarkdownContent';
import SocialShareButtons from '@/components/blog/SocialShareButtons';
import UnstyledLink from '@/components/common/links/UnstyledLink';
import NextImage from '@/components/common/NextImage';

import { siteConfig } from '@/constants/config';
import { HashnodePost } from '@/interfaces/hashnode';
import { getUserLink } from '@/utils/hashnode';
import { openGraph } from '@/utils/og';

export default function BlogPost({ post }: { post: HashnodePost }) {
  const { data } = useSWR<HashnodePost>(`/api/blog/post?slug=${post.slug}`, {
    fallbackData: post,
  });

  if (!data) {
    redirect('/blog');
  }

  const url = `${siteConfig.url}/blog/${data.slug}`;
  const authorLink = getUserLink(data.author);

  return (
    <div
      className="px-6 py-32 lg:px-8"
      itemScope
      itemType="http://schema.org/Blog"
    >
      <article
        className="mx-auto max-w-3xl text-lg leading-7 text-gray-700"
        itemProp="blogPost"
        itemScope
        itemType="http://schema.org/BlogPosting"
      >
        <header className="space-y-4">
          <div className="flex flex-row items-center justify-between gap-x-8">
            <span className="flex items-center space-x-6 text-base font-semibold leading-7 text-gray-500">
              <time
                dateTime={data.publishedAt}
                className="font-bold text-primary-900"
                itemProp="datePublished"
              >
                {new Date(data.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span className="flex items-center space-x-2">
                <LuBookOpen className="h-5 w-5" aria-hidden="true" />
                <span>{data.readTimeInMinutes} min read</span>
              </span>
            </span>
            <link itemProp="url" href={url} />
            <link
              itemProp="image"
              href={openGraph({
                title: data.title,
                description: data.subtitle,
              })}
            />
            {data.updatedAt ? (
              <meta itemProp="dateModified" content={data.updatedAt} />
            ) : null}
            <div className="flex shrink-0">
              <SocialShareButtons
                url={url}
                title={data.title}
                hashtags={[
                  'fix',
                  ...(data.tags ?? []).map((tag) =>
                    tag.slug.replaceAll('-', ''),
                  ),
                ]}
              />
            </div>
          </div>
          <h1
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            itemProp="headline"
          >
            {data.title}
          </h1>
          {data.subtitle ? (
            <p className="text-xl leading-8">{data.subtitle}</p>
          ) : (
            <meta itemProp="description" content={data.brief} />
          )}
          <div
            className="relative flex items-center gap-x-4"
            itemProp="author"
            itemScope
            itemType="https://schema.org/Person"
          >
            <NextImage
              src={data.author.profilePicture}
              alt=""
              className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-50"
              classNames={{ image: 'w-full h-full object-cover' }}
              width={40}
              height={40}
              itemProp="image"
            />
            <div className="text-base leading-6">
              <p className="font-semibold text-gray-900" itemProp="name">
                {authorLink ? (
                  <UnstyledLink href={authorLink} itemProp="url">
                    <span className="absolute inset-0" />
                    {data.author.name}
                  </UnstyledLink>
                ) : (
                  <>{data.author.name}</>
                )}
              </p>
              {data.author.tagline ? (
                <p
                  className="line-clamp-1 text-gray-600"
                  itemProp="description"
                >
                  {data.author.tagline}
                </p>
              ) : null}
            </div>
          </div>
        </header>
        <div
          className="w-prose my-8 border-y border-gray-900/5"
          itemProp="articleBody"
        >
          <MarkdownContent>{data.content?.markdown}</MarkdownContent>
        </div>
        <footer className="flex flex-col gap-y-8 md:flex-row md:justify-between md:gap-x-8 md:gap-y-0">
          <div className="flex flex-wrap justify-center gap-2 text-base font-medium text-primary-900 md:justify-start">
            {data.tags?.map((tag) => (
              <UnstyledLink
                href={`/blog/tag/${tag.slug}`}
                className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 hover:bg-primary-50"
                key={`tag-${tag.slug}`}
              >
                {tag.name}
              </UnstyledLink>
            ))}
          </div>
          <div className="flex shrink-0 justify-center md:items-start">
            <SocialShareButtons
              url={url}
              title={data.title}
              hashtags={[
                'fix',
                ...(data.tags ?? []).map((tag) => tag.slug.replaceAll('-', '')),
              ]}
            />
          </div>
        </footer>
      </article>
    </div>
  );
}
