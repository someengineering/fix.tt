import { LuPodcast, LuUserCircle2 } from 'react-icons/lu';

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

export default function Header({
  url,
  title,
  summary,
  host,
  guest,
  publishedAt,
  updatedAt,
  duration,
}: {
  url?: string;
  title: string;
  summary: string;
  host?: HashnodeUser;
  guest?: {
    name?: string | undefined;
    title?: string | undefined;
  };
  series?: HashnodeSeries;
  tags?: (HashnodeTag | HashnodeDraftTag)[];
  publishedAt: string;
  updatedAt: string;
  duration: number;
}) {
  const hostLink = host ? getUserLink(host) : undefined;
  const hostDescription = host ? getUserTitle(host) : undefined;
  const durationHours = Math.floor(duration / 60 / 60);
  const durationMinutes = Math.floor((duration / 60) % 60);

  return (
    <header className="space-y-4">
      <div className="flex flex-row items-center justify-between gap-x-10">
        <span className="flex flex-wrap items-center gap-x-6 gap-y-1 whitespace-nowrap text-base font-bold uppercase leading-7 text-gray-600 sm:text-lg">
          <span className="flex flex-wrap items-center gap-x-6">
            <time dateTime={publishedAt} itemProp="datePublished">
              {new Date(publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span className="flex items-center space-x-2">
              <LuPodcast className="h-5 w-5" aria-hidden="true" />
              <span>{`${durationHours > 0 ? `${durationHours} hr ` : ''}${durationMinutes} min`}</span>
            </span>
          </span>
        </span>
        <link
          itemProp="image"
          href={openGraph({
            title: title,
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
                hashtags={['fix', 'securitycloudpodcast']}
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
      <meta itemProp="description" content={summary} />
      <div className="flex flex-col gap-y-2 sm:flex-row sm:items-center sm:justify-start sm:gap-x-20">
        {host ? (
          <div
            className="flex items-center gap-x-4 pt-2"
            itemProp="director"
            itemScope
            itemType="https://schema.org/Person"
          >
            {host.profilePicture ? (
              <NextImage
                src={host.profilePicture}
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
              <p
                className="text-lg font-semibold text-gray-900"
                itemProp="name"
              >
                {hostLink ? (
                  <UnstyledLink href={hostLink} itemProp="url">
                    {host.name}
                  </UnstyledLink>
                ) : (
                  <>{host.name}</>
                )}
              </p>
              {hostDescription ? (
                <p
                  className="line-clamp-1 text-base font-medium text-gray-600"
                  itemProp="description"
                >
                  {hostDescription}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}
        {guest ? (
          <div
            className="flex items-center gap-x-4 pt-2"
            itemProp="director"
            itemScope
            itemType="https://schema.org/Person"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-50 text-gray-300">
              <LuUserCircle2 className="h-[110%] w-[110%] shrink-0" />
            </div>
            <div>
              <p
                className="text-lg font-semibold text-gray-900"
                itemProp="name"
              >
                {guest.name}
              </p>
              <p
                className="line-clamp-1 text-base font-medium text-gray-600"
                itemProp="description"
              >
                {guest.title}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
