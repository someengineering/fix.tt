import TableOfContents from '@/components/blog/BlogPost/TableOfContents';
import MarkdownContent from '@/components/common/MarkdownContent';
import { TableOfContentsItemFragment as HashnodeTableOfContentsItem } from '@/generated/hashnode/graphql';
import Image from 'next/image';

export default function Content({
  markdown,
  tocItems,
  coverImage,
}: {
  markdown?: string;
  tocItems?: HashnodeTableOfContentsItem[];
  coverImage?: string;
}) {
  return (
    <div className="w-prose my-8 border-y border-gray-900/5 py-8">
      {coverImage ? (
        <div className="mb-8 h-max w-full">
          <Image
            src={coverImage}
            alt=""
            fill
            className="!relative mx-auto rounded-xl object-contain"
          />
        </div>
      ) : null}
      {tocItems ? <TableOfContents items={tocItems} /> : null}
      <MarkdownContent itemProp="articleBody">{markdown}</MarkdownContent>
    </div>
  );
}
