import SocialShareButtons from '@/components/blog/SocialShareButtons';
import UnstyledLink from '@/components/common/links/UnstyledLink';

import { HashnodeTag } from '@/interfaces/hashnode';

export default function BlogPost({
  url,
  title,
  tags,
}: {
  url?: string;
  title: string;
  tags?: HashnodeTag[];
}) {
  return (
    <footer className="flex flex-col gap-y-8 md:flex-row md:justify-between md:gap-x-8 md:gap-y-0">
      <div className="flex flex-wrap justify-center gap-2 text-base font-medium text-primary-900 md:justify-start">
        {tags?.map((tag) => (
          <UnstyledLink
            href={`/blog/tag/${tag.slug}`}
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 hover:bg-primary-50"
            key={`tag-${tag.slug}`}
          >
            {tag.name}
          </UnstyledLink>
        ))}
      </div>
      {url ? (
        <div className="flex shrink-0 justify-center md:items-start">
          <SocialShareButtons
            url={url}
            title={title}
            hashtags={[
              'fix',
              ...(tags ?? []).map((tag) => tag.slug.replaceAll('-', '')),
            ]}
          />
        </div>
      ) : null}
    </footer>
  );
}
