import UnstyledLink from '@/components/common/links/UnstyledLink';
import { siteConfig } from '@/constants/config';
import { UserFragment as HashnodeUser } from '@/generated/hashnode/graphql';
import { Episode as TransistorEpisode } from '@/lib/transistor';
import { getUserLink, getUserTitle } from '@/utils/hashnode';
import { openGraph } from '@/utils/og';
import { parseEpisodeTitle } from '@/utils/transistor';
import Image from 'next/image';
import { LuPodcast, LuUserCircle2 } from 'react-icons/lu';

export default function Item({
  episode,
  host,
}: {
  episode: TransistorEpisode;
  host?: HashnodeUser;
}) {
  if (!episode) {
    return null;
  }

  const { title, guest } = parseEpisodeTitle(episode.attributes.title);
  const hostLink = host ? getUserLink(host) : undefined;
  const hostDescription = host ? getUserTitle(host) : undefined;
  const durationHours = Math.floor(episode.attributes.duration / 60 / 60);
  const durationMinutes = Math.floor((episode.attributes.duration / 60) % 60);

  return (
    <article
      itemType="http://schema.org/PodcastEpisode"
      itemID={`${siteConfig.url}/podcast/${episode.attributes.slug}`}
    >
      <div>
        <header className="flex items-center space-x-5 text-sm font-bold uppercase leading-7 text-gray-600">
          <span className="flex flex-wrap items-center gap-x-5">
            <time
              dateTime={episode.attributes.published_at}
              itemProp="datePublished"
            >
              {new Date(episode.attributes.published_at).toLocaleDateString(
                'en-US',
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                },
              )}
            </time>
            <span className="flex items-center space-x-1.5 whitespace-nowrap">
              <LuPodcast className="h-4 w-4" aria-hidden="true" />
              <span>{`${durationHours > 0 ? `${durationHours} hr ` : ''}${durationMinutes} min`}</span>
            </span>
          </span>
          <link
            itemProp="image"
            href={openGraph({
              title,
            })}
          />
        </header>
        <div className="group relative space-y-4">
          <h2
            className="mt-2 text-pretty text-3xl font-extrabold text-purple-600 group-hover:text-purple-700"
            itemProp="headline"
          >
            <UnstyledLink
              href={`/podcast/${episode.attributes.slug}`}
              itemProp="url"
            >
              <span className="absolute inset-0" />
              {title}
            </UnstyledLink>
          </h2>
          <p
            className="line-clamp-3 max-w-prose text-pretty text-lg font-semibold text-gray-900"
            itemProp="description"
          >
            {episode.attributes.formatted_summary}
          </p>
          <div className="flex flex-col gap-y-2 py-2 sm:flex-row sm:items-center sm:justify-start sm:gap-x-16">
            {host ? (
              <div
                className="relative flex items-center gap-x-3"
                itemProp="director"
                itemScope
                itemType="https://schema.org/Person"
              >
                {host?.profilePicture ? (
                  <Image
                    src={host.profilePicture}
                    width={44}
                    height={44}
                    sizes="44px"
                    alt=""
                    className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-gray-50"
                    itemProp="image"
                  />
                ) : (
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-50 text-gray-300">
                    <LuUserCircle2 className="h-[110%] w-[110%] shrink-0" />
                  </div>
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
            {guest ? (
              <div
                className="relative flex items-center gap-x-3"
                itemProp="actor"
                itemScope
                itemType="https://schema.org/Person"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-50 text-gray-300">
                  <LuUserCircle2 className="h-[110%] w-[110%] shrink-0" />
                </div>
                <div>
                  <p
                    className="text-base font-semibold text-gray-900"
                    itemProp="name"
                  >
                    {guest.name}
                  </p>
                  {guest.title ? (
                    <p
                      className="line-clamp-1 text-sm font-medium text-gray-600"
                      itemProp="description"
                    >
                      {guest.title}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
          <audio
            controls
            src={episode.attributes.media_url}
            className="w-full"
          />
        </div>
      </div>
    </article>
  );
}
