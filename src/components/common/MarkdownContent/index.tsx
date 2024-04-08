import { YouTubeEmbed } from '@next/third-parties/google';
import GithubSlugger from 'github-slugger';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkSmartypants from 'remark-smartypants';

import PrimaryLink from '@/components/common/links/PrimaryLink';
import Heading from '@/components/common/MarkdownContent/Heading';
import NextImage from '@/components/common/NextImage';

import { cn } from '@/utils/css';
import { sanitizeMarkdown } from '@/utils/hashnode';

export default function MarkdownContent({
  children,
  className,
}: {
  children?: string;
  className?: string;
}) {
  if (!children) {
    return null;
  }

  const slugger = new GithubSlugger();

  return (
    <Markdown
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkSmartypants]}
      components={{
        a: (props) => (
          <PrimaryLink href={props.href ?? ''}>{props.children}</PrimaryLink>
        ),
        h1: 'h2',
        h2: (props) => (
          <Heading
            as="h2"
            slug={slugger.slug(props.children?.toString() ?? '')}
          >
            {props.children}
          </Heading>
        ),
        h3: (props) => (
          <Heading
            as="h3"
            slug={slugger.slug(props.children?.toString() ?? '')}
          >
            {props.children}
          </Heading>
        ),
        h4: (props) => (
          <Heading
            as="h4"
            slug={slugger.slug(props.children?.toString() ?? '')}
          >
            {props.children}
          </Heading>
        ),
        h5: (props) => (
          <Heading
            as="h5"
            slug={slugger.slug(props.children?.toString() ?? '')}
          >
            {props.children}
          </Heading>
        ),
        h6: (props) => (
          <Heading
            as="h6"
            slug={slugger.slug(props.children?.toString() ?? '')}
          >
            {props.children}
          </Heading>
        ),
        img: (props) => (
          <NextImage
            src={props.src ?? ''}
            alt={props.alt ?? ''}
            title={props.title}
            className="h-max w-full"
            classNames={{
              image: 'h-auto w-auto object-contain mx-auto rounded-xl',
            }}
            width={0}
            height={0}
            sizes="350vw"
          />
        ),
        p: (props) => {
          const youtubeEmbed = props.children
            ?.toString()
            .match(/^%\[https:\/\/youtu\.be\/(?<videoId>[\w\d\-_]{11})]$/);

          if (youtubeEmbed?.groups?.videoId) {
            return (
              <YouTubeEmbed
                videoid={youtubeEmbed.groups.videoId}
                params="controls=0&rel=0"
              />
            );
          }

          return <p>{props.children}</p>;
        },
      }}
      className={cn('markdown', className)}
    >
      {sanitizeMarkdown(children)}
    </Markdown>
  );
}
