import MarkdownContent from '@/components/common/MarkdownContent';

export default function BlogPostContent({ markdown }: { markdown?: string }) {
  return (
    <div
      className="w-prose my-8 border-y border-gray-900/5"
      itemProp="articleBody"
    >
      <MarkdownContent>{markdown}</MarkdownContent>
    </div>
  );
}
