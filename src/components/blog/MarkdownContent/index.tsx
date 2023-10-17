'use client';

import Markdown from 'marked-react';

import Heading from '@/components/blog/MarkdownContent/Heading';
import PrimaryLink from '@/components/common/links/PrimaryLink';
import NextImage from '@/components/common/NextImage';

import { sanitizeMarkdown } from '@/utils/hashnode';

export default function MarkdownContent({ children }: { children?: string }) {
  if (!children) {
    return null;
  }

  return (
    <Markdown
      renderer={{
        heading: (text: string, level: number) => (
          <Heading as={`h${level}` as 'h2' | 'h3' | 'h4' | 'h5' | 'h6'}>
            {text}
          </Heading>
        ),
        paragraph: (text: string) => <p className="my-8">{text}</p>,
        list: (body: string, ordered: boolean, start?: number) =>
          ordered ? (
            <ol
              role="list"
              className="mb-8 ml-8 mt-4 list-outside list-decimal space-y-4 text-gray-600"
              start={start}
            >
              {body}
            </ol>
          ) : (
            <ul
              role="list"
              className="mb-8 ml-8 mt-4 list-disc space-y-4 text-gray-600"
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
            classNames={{
              image: 'h-auto w-auto object-contain mx-auto rounded-xl',
            }}
            width={0}
            height={0}
            sizes="100vw"
          />
        ),
      }}
    >
      {sanitizeMarkdown(children)}
    </Markdown>
  );
}
