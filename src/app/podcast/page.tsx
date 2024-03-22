import { Metadata } from 'next';

import { getEpisodes } from '@/lib/spotify';

import PodcastEpisodeList from '@/components/podcast/PodcastEpisodeList';

import { metadata as rootMetadata } from '@/app/layout';
import { siteConfig } from '@/constants/config';
import { openGraph } from '@/utils/og';

const url = `${siteConfig.url}/podcast`;
const title = siteConfig.podcastTitle;
const description = siteConfig.podcastDescription;
const ogImage = openGraph({
  title,
  description,
});

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    ...rootMetadata.alternates,
    canonical: url,
  },
  openGraph: {
    ...rootMetadata.openGraph,
    url,
    title,
    images: [ogImage],
  },
  twitter: {
    ...rootMetadata.twitter,
    title: `${title} | ${siteConfig.title}`,
    images: [ogImage],
  },
};

export default async function PodcastPage() {
  const { items: episodes, ...pageInfo } = await getEpisodes({});

  return (
    <div className="px-6 py-16 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <div itemScope itemType="http://schema.org/PodcastSeries" itemID={url}>
          <h1
            className="text-pretty font-display text-4xl font-medium uppercase text-marian-blue-900 sm:text-5xl"
            itemProp="name"
          >
            {siteConfig.podcastTitle}
          </h1>
          <p
            className="mt-6 text-pretty text-lg font-semibold text-gray-900 sm:text-xl"
            itemProp="description"
          >
            {siteConfig.podcastDescription}
          </p>
        </div>
        <PodcastEpisodeList
          initialEpisodes={episodes}
          initialPageInfo={pageInfo}
          getEpisodes={async (offset: number) => {
            'use server';

            return await getEpisodes({
              offset,
            });
          }}
        />
      </div>
    </div>
  );
}
