'use client';

import { redirect } from 'next/navigation';
import { LuBookOpen } from 'react-icons/lu';
import useSWR from 'swr';

import MarkdownContent from '@/components/blog/MarkdownContent';
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
          <div className="flex items-center space-x-6 text-base text-gray-500">
            <span className="flex space-x-6 font-semibold leading-7">
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
        <footer className="flex gap-x-2 text-base font-medium text-primary-900">
          {data.tags?.map((tag) => (
            <UnstyledLink
              href={`/blog/tag/${tag.slug}`}
              className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 hover:bg-primary-50"
              key={`tag-${tag.slug}`}
            >
              {tag.name}
            </UnstyledLink>
          ))}
        </footer>
      </article>
    </div>
  );
}
