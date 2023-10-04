'use client';

import Markdown from 'marked-react';
import useSWR from 'swr';

import PrimaryLink from '@/components/common/links/PrimaryLink';
import NextImage from '@/components/common/NextImage';

import { HashnodePost } from '@/interfaces/hashnode';

export default function BlogPostList({ slug }: { slug: string }) {
  const { data, error } = useSWR<HashnodePost>(`/api/blog/post?slug=${slug}`);

  if (!data && !error) {
    return null;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="mx-auto max-w-3xl text-lg leading-7 text-gray-700">
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {data.title}
      </h1>
      <div className="w-prose">
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
    </div>
  );
}
