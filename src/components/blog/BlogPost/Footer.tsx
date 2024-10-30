import SocialShareButtons from '@/components/blog/SocialShareButtons';
import UnstyledLink from '@/components/common/links/UnstyledLink';
import {
  DraftTagFragment as HashnodeDraftTag,
  TagFragment as HashnodeTag,
} from '@/generated/hashnode/graphql';

export default function Footer({
  url,
  title,
  tags,
}: {
  url?: string;
  title: string;
  tags?: (HashnodeTag | HashnodeDraftTag)[];
}) {
  return (
    <footer className="flex flex-col gap-y-8 md:flex-row md:justify-between md:gap-x-8 md:gap-y-0">
      <div className="flex flex-wrap justify-center gap-2 text-base font-semibold text-purple-600 md:justify-start">
        {tags?.map((tag) => (
          <UnstyledLink
            href={`/blog/tag/${tag.slug}`}
            className="z-10 text-nowrap rounded-md bg-gray-50 px-3 py-1.5 hover:bg-purple-50"
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
