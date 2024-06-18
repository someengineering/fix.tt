import MarkdownContent from '@/components/common/MarkdownContent';
import CustomerLogo, { hasLogo } from '@/components/customers/CustomerLogo';

export default function CustomerStory({
  slug,
  markdown,
}: {
  slug: string;
  markdown: string;
}) {
  const [about, challenge, solution, ...rest] = markdown.split('\n## ') ?? [];
  const content = `\n## ${rest.join('\n## ')}`;

  return (
    <div className="w-prose my-8 border-y border-gray-900/5 py-8">
      <div className="mb-8 flex flex-col gap-x-8 rounded-2xl p-8 text-base ring-1 ring-gray-900/10 sm:flex-row sm:p-0 sm:ring-0">
        <div className="shrink-0 rounded-2xl sm:w-1/2 sm:p-8 sm:ring-1 sm:ring-gray-900/10 md:w-2/5">
          {hasLogo(slug) ? (
            <CustomerLogo
              slug={slug}
              className="mb-8 h-auto max-h-16 max-w-full"
            />
          ) : null}
          <MarkdownContent linkHeadings={false} className="about">
            {about}
          </MarkdownContent>
        </div>
        <div className="mt-8 space-y-8 border-t border-gray-900/5 pt-8 sm:m-0 sm:border-none sm:p-0">
          <MarkdownContent linkHeadings={false}>
            {`## ${challenge}`}
          </MarkdownContent>
          <MarkdownContent linkHeadings={false}>
            {`## ${solution}`}
          </MarkdownContent>
        </div>
      </div>
      <MarkdownContent itemProp="articleBody">{content}</MarkdownContent>
    </div>
  );
}
