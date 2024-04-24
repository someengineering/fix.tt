import { LuPodcast } from 'react-icons/lu';

import { Episode as SpotifyEpisode } from '@/lib/spotify';

import UnstyledLink from '@/components/common/links/UnstyledLink';
import NextImage from '@/components/common/NextImage';

import { UserFragment as HashnodeUser } from '@/generated/hashnode/graphql';
import { getUserLink, getUserTitle } from '@/utils/hashnode';
import { openGraph } from '@/utils/og';
import { parseEpisodeTitle } from '@/utils/spotify';

export default function PodcastEpisodeListItem({
  episode,
  host,
}: {
  episode: SpotifyEpisode;
  host?: HashnodeUser;
}) {
  if (!episode) {
    return null;
  }

  const episodeInfo = parseEpisodeTitle(episode.name);
  const hostLink = host ? getUserLink(host) : undefined;
  const hostDescription = host ? getUserTitle(host) : undefined;
  const duration_hours = Math.floor(episode.duration_ms / 1000 / 60 / 60);
  const duration_minutes = Math.floor((episode.duration_ms / 1000 / 60) % 60);

  return (
    <article
      itemType="http://schema.org/PodcastEpisode"
      itemID={episode.external_urls.spotify}
    >
      <div>
        <header className="flex items-center space-x-5 text-sm font-bold uppercase leading-7 text-gray-600">
          <span className="flex flex-wrap items-center gap-x-5">
            <time dateTime={episode.release_date} itemProp="datePublished">
              {new Date(episode.release_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span className="flex items-center space-x-1.5 whitespace-nowrap">
              <LuPodcast className="h-4 w-4" aria-hidden="true" />
              <span>{`${duration_hours > 0 ? `${duration_hours} hr ` : ''}${duration_minutes} min`}</span>
            </span>
          </span>
          <link
            itemProp="image"
            href={openGraph({
              title: episode.name,
            })}
          />
        </header>
        <div className="group relative space-y-4">
          <h3
            className="mt-2 text-pretty text-3xl font-extrabold text-cornflower-blue-600 group-hover:text-cornflower-blue-700"
            itemProp="headline"
          >
            <UnstyledLink href={episode.external_urls.spotify} itemProp="url">
              <span className="absolute inset-0" />
              {episodeInfo.title}
            </UnstyledLink>
          </h3>
          <p
            className="line-clamp-3 max-w-prose text-pretty text-lg font-semibold text-gray-900"
            itemProp="description"
          >
            {episode.description}
          </p>
          <div className="flex items-center justify-start gap-x-16">
            {host ? (
              <div
                className="relative flex items-center gap-x-3 pt-2"
                itemProp="director"
                itemScope
                itemType="https://schema.org/Person"
              >
                {host?.profilePicture ? (
                  <NextImage
                    src={host.profilePicture}
                    alt=""
                    className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-gray-50"
                    classNames={{ image: 'w-full h-full object-cover' }}
                    width={40}
                    height={40}
                    itemProp="image"
                  />
                ) : (
                  <div className="h-11 w-11 shrink-0 rounded-full bg-gray-50" />
                )}
                <div>
                  <p
                    className="text-base font-semibold text-gray-900"
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
                      className="line-clamp-1 text-sm font-medium text-gray-600"
                      itemProp="description"
                    >
                      {hostDescription}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}
            <div
              className="relative flex items-center gap-x-3 pt-2"
              itemProp="actor"
              itemScope
              itemType="https://schema.org/Person"
            >
              <div className="h-11 w-11 shrink-0 rounded-full bg-gray-100" />
              <div>
                <p
                  className="text-base font-semibold text-gray-900"
                  itemProp="name"
                >
                  {episodeInfo.guest.name}
                </p>
                {episodeInfo.guest.title ? (
                  <p
                    className="line-clamp-1 text-sm font-medium text-gray-600"
                    itemProp="description"
                  >
                    {episodeInfo.guest.title}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
