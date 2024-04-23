import { BlogPostTableOfContentsItem } from '@/components/blog/BlogPost/BlogPostTableOfContents';
import PrimaryLink from '@/components/common/links/PrimaryLink';

export default function BlogPostTableOfContentsRow({
  slug,
  title,
  childItems,
}: {
  slug: string;
  title: string;
  childItems: BlogPostTableOfContentsItem[];
}) {
  return (
    <li>
      <PrimaryLink href={`#${slug}`}>{title}</PrimaryLink>
      {childItems.length ? (
        <ul className="my-2 ml-6 space-y-2">
          {childItems.map((child) => (
            <BlogPostTableOfContentsRow
              key={child.id}
              slug={child.slug}
              title={child.title}
              childItems={child.children}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}
