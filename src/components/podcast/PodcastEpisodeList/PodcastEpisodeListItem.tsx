'use client';

import { Episode as SpotifyEpisode } from '@/lib/spotify';

import UnstyledLink from '@/components/common/links/UnstyledLink';
import NextImage from '@/components/common/NextImage';

import { openGraph } from '@/utils/og';

export default function PodcastEpisodeListItem({
  episode,
}: {
  episode: SpotifyEpisode;
}) {
  if (!episode) {
    return null;
  }

  return (
    <article
      className="relative isolate flex flex-col items-center gap-8 lg:flex-row"
      itemProp="blogPost"
      itemScope
      itemType="http://schema.org/PodcastEpisode"
      itemID={episode.external_urls.spotify}
    >
      <div className="relative aspect-square lg:w-64 lg:shrink-0">
        {episode.images.length ? (
          <NextImage
            src={episode.images[0].url}
            alt=""
            className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl bg-gray-50"
            classNames={{ image: 'object-cover' }}
            fill
          />
        ) : (
          <div className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover" />
        )}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div>
        <header className="flex items-center space-x-5 text-sm font-bold uppercase leading-7 text-gray-500">
          <time dateTime={episode.release_date} itemProp="datePublished">
            {new Date(episode.release_date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <link
            itemProp="image"
            href={openGraph({
              title: episode.name,
            })}
          />
        </header>
        <div className="group relative max-w-xl space-y-4">
          <h3
            className="mt-2 text-pretty font-display text-3xl font-medium uppercase text-marian-blue-900 group-hover:text-marian-blue-800"
            itemProp="headline"
          >
            <UnstyledLink href={episode.external_urls.spotify} itemProp="url">
              <span className="absolute inset-0" />
              {episode.name}
            </UnstyledLink>
          </h3>
          <p
            className="line-clamp-3 text-pretty text-base font-semibold leading-6 text-gray-900"
            itemProp="description"
          >
            {episode.description}
          </p>
        </div>
      </div>
    </article>
  );
}
