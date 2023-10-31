import Markdown from 'react-markdown';
import remarkSmartypants from 'remark-smartypants';

import PrimaryLink from '@/components/common/links/PrimaryLink';
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

  return (
    <Markdown
      remarkPlugins={[remarkSmartypants]}
      components={{
        a: (props) => (
          <PrimaryLink href={props.href ?? ''}>{props.children}</PrimaryLink>
        ),
        h1: 'h2',
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
      }}
      className={cn('markdown', className)}
    >
      {sanitizeMarkdown(children)}
    </Markdown>
  );
}
