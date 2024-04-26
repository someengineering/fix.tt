import { LuBookOpen, LuUserCircle2 } from 'react-icons/lu';

import SocialShareButtons from '@/components/blog/SocialShareButtons';
import UnstyledLink from '@/components/common/links/UnstyledLink';
import NextImage from '@/components/common/NextImage';

import {
  DraftTagFragment as HashnodeDraftTag,
  SeriesFragment as HashnodeSeries,
  TagFragment as HashnodeTag,
  UserFragment as HashnodeUser,
} from '@/generated/hashnode/graphql';
import { getUserLink, getUserTitle } from '@/utils/hashnode';
import { openGraph } from '@/utils/og';

export default function BlogPostHeader({
  url,
  title,
  subtitle,
  brief,
  author,
  series,
  tags,
  publishedAt,
  updatedAt,
  readTimeInMinutes,
}: {
  url?: string;
  title: string;
  subtitle?: string;
  brief?: string;
  author: HashnodeUser;
  series?: HashnodeSeries;
  tags?: (HashnodeTag | HashnodeDraftTag)[];
  publishedAt: string;
  updatedAt?: string;
  readTimeInMinutes?: number;
}) {
  const authorLink = getUserLink(author);
  const authorDescription = getUserTitle(author);

  return (
    <header className="space-y-4">
      <div className="flex flex-row items-center justify-between gap-x-10">
        <span className="flex flex-wrap items-center gap-x-6 gap-y-1 whitespace-nowrap text-base font-bold uppercase leading-7 text-gray-600 sm:text-lg">
          {series ? (
            <UnstyledLink
              href={`/blog/series/${series.slug}`}
              title="This post is part of a series"
              className="rounded-md bg-cornflower-blue-800 px-3 py-1.5 font-extrabold leading-none text-white hover:bg-cornflower-blue-900"
            >
              {series.name}
            </UnstyledLink>
          ) : null}
          <span className="flex flex-wrap items-center gap-x-6">
            <time dateTime={publishedAt} itemProp="datePublished">
              {new Date(publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {readTimeInMinutes ? (
              <span className="flex items-center space-x-2">
                <LuBookOpen className="h-5 w-5" aria-hidden="true" />
                <span>{readTimeInMinutes} min read</span>
              </span>
            ) : null}
          </span>
        </span>
        <link
          itemProp="image"
          href={openGraph({
            title: title,
            description: subtitle,
          })}
        />
        {updatedAt ? (
          <meta itemProp="dateModified" content={updatedAt} />
        ) : null}
        {url ? (
          <>
            <link itemProp="url" href={url} />
            <div className="flex shrink-0">
              <SocialShareButtons
                url={url}
                title={title}
                hashtags={[
                  'fix',
                  ...(tags ?? []).map((tag) => tag.slug.replaceAll('-', '')),
                ]}
              />
            </div>
          </>
        ) : null}
      </div>
      <h1
        className="text-pretty text-4xl font-extrabold text-cornflower-blue-600 sm:text-5xl"
        itemProp="headline"
      >
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-6 text-pretty text-lg font-semibold text-gray-900 sm:text-xl">
          {subtitle}
        </p>
      ) : (
        <meta itemProp="description" content={brief} />
      )}
      <div
        className="relative flex items-center gap-x-4 pt-2"
        itemProp="author"
        itemScope
        itemType="https://schema.org/Person"
      >
        {author.profilePicture ? (
          <NextImage
            src={author.profilePicture}
            alt=""
            className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-50"
            classNames={{ image: 'w-full h-full object-cover' }}
            width={40}
            height={40}
            itemProp="image"
          />
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-50 text-gray-300">
            <LuUserCircle2 className="h-[110%] w-[110%] shrink-0" />
          </div>
        )}
        <div>
          <p className="text-lg font-semibold text-gray-900" itemProp="name">
            {authorLink ? (
              <UnstyledLink href={authorLink} itemProp="url">
                {author.name}
              </UnstyledLink>
            ) : (
              <>{author.name}</>
            )}
          </p>
          {authorDescription ? (
            <p
              className="line-clamp-1 text-base font-medium text-gray-600"
              itemProp="description"
            >
              {authorDescription}
            </p>
          ) : null}
        </div>
      </div>
    </header>
  );
}
