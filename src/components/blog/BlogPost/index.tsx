'use client';

import Markdown from 'marked-react';
import useSWR from 'swr';

import PrimaryLink from '@/components/common/links/PrimaryLink';
import NextImage from '@/components/common/NextImage';

import { siteConfig } from '@/constants/config';
import { HashnodePost } from '@/interfaces/hashnode';

export default function BlogPostList({ slug }: { slug: string }) {
  const url = `${siteConfig.url}/blog/${slug}`;
  const { data, error } = useSWR<HashnodePost>(`/api/blog/post?slug=${slug}`);

  if (!data && !error) {
    return null;
  }

  if (!data) {
    return null;
  }

  return (
    <article
      className="mx-auto max-w-3xl text-lg leading-7 text-gray-700"
      itemProp="blogPost"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <header>
        <h1
          className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          itemProp="headline"
        >
          {data.title}
        </h1>
        <time dateTime={data.publishedAt} itemProp="datePublished">
          {new Date(data.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <meta itemProp="description" content={data.brief} />
        <meta itemProp="url" content={url} />
        <meta itemProp="identifier" content={url} />
        {data.coverImage ? (
          <meta itemProp="image" content={data.coverImage.url} />
        ) : null}
      </header>
      <div className="w-prose" itemProp="articleBody">
        <Markdown
          renderer={{
            paragraph: (text: string) => <p className="mt-8">{text}</p>,
            list: (body: string, ordered: boolean, start?: number) =>
              ordered ? (
                <ol
                  role="list"
                  className="mt-8 max-w-xl space-y-8 text-gray-600"
                  start={start}
                >
                  {body}
                </ol>
              ) : (
                <ul
                  role="list"
                  className="mt-8 max-w-xl space-y-8 text-gray-600"
                >
                  {body}
                </ul>
              ),
            link: (href: string, text: string) => (
              <PrimaryLink href={href}>{text}</PrimaryLink>
            ),
            image: (href: string, title: string, text: string) => (
              <NextImage
                src={href}
                alt={title}
                title={text}
                className="h-max w-full"
                classNames={{ image: 'h-auto w-auto object-none mx-auto' }}
                width={0}
                height={0}
                sizes="100vw"
              />
            ),
          }}
        >
          {data.content?.markdown}
        </Markdown>
      </div>
    </article>
  );
}
