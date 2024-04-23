import BlogPostTableOfContents from '@/components/blog/BlogPost/BlogPostTableOfContents';
import MarkdownContent from '@/components/common/MarkdownContent';

import { TableOfContentsItemFragment as HashnodeTableOfContentsItem } from '@/generated/hashnode/graphql';

export default function BlogPostContent({
  markdown,
  tocItems,
}: {
  markdown?: string;
  tocItems?: HashnodeTableOfContentsItem[];
}) {
  return (
    <div className="w-prose my-8 border-y border-gray-900/5">
      {tocItems ? <BlogPostTableOfContents items={tocItems} /> : null}
      <MarkdownContent itemProp="articleBody">{markdown}</MarkdownContent>
    </div>
  );
}
