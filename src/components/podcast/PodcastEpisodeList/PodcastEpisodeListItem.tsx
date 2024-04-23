'use client';

import { Episode as SpotifyEpisode } from '@/lib/spotify';

import UnstyledLink from '@/components/common/links/UnstyledLink';

import { openGraph } from '@/utils/og';
// import NextImage from '@/components/common/NextImage';

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
      itemProp="blogPost"
      itemScope
      itemType="http://schema.org/PodcastEpisode"
      itemID={episode.external_urls.spotify}
    >
      <div>
        <header className="flex items-center space-x-5 text-sm font-bold uppercase leading-7 text-gray-600">
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
        <div className="group relative space-y-4">
          <h3
            className="mt-2 text-pretty text-3xl font-extrabold text-cornflower-blue-600 group-hover:text-cornflower-blue-700"
            itemProp="headline"
          >
            <UnstyledLink href={episode.external_urls.spotify} itemProp="url">
              <span className="absolute inset-0" />
              {episode.name}
            </UnstyledLink>
          </h3>
          <p
            className="line-clamp-3 max-w-prose text-pretty text-lg font-semibold text-gray-900"
            itemProp="description"
          >
            {episode.description}
          </p>
        </div>
      </div>
    </article>
  );
}
