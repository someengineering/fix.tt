'use client';

import { useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import {
  Episode as SpotifyEpisode,
  EpisodesResult as SpotifyEpisodesResult,
  PageInfo as SpotifyPageInfo,
} from '@/lib/spotify';

import PodcastEpisodeListItem from '@/components/podcast/PodcastEpisodeList/PodcastEpisodeListItem';

export default function PodcastEpisodeList({
  initialEpisodes,
  initialPageInfo,
  getEpisodes,
}: {
  initialEpisodes: SpotifyEpisode[];
  initialPageInfo: SpotifyPageInfo;
  getEpisodes: (offset: number) => Promise<SpotifyEpisodesResult>;
}) {
  const [episodes, setEpisodes] = useState<SpotifyEpisode[]>(initialEpisodes);
  const [pageInfo, setPageInfo] = useState<SpotifyPageInfo>(initialPageInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: !!pageInfo.next,
    onLoadMore: async () => {
      setIsLoading(true);

      if (pageInfo.offset + pageInfo.limit < pageInfo.total) {
        const data = await getEpisodes(pageInfo.offset + pageInfo.limit);

        if (!data) {
          setError(true);
          return;
        }

        const { items, ...newPageInfo } = data;

        setEpisodes([...episodes, ...items]);
        setPageInfo(newPageInfo);
      }

      setIsLoading(false);
    },
    disabled: !!error,
    rootMargin: '0px 0px 400px 0px',
  });

  return (
    <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
      {episodes?.map((episode) => (
        <PodcastEpisodeListItem
          episode={episode}
          key={`episode-${episode.id}`}
        />
      ))}
      <div ref={sentryRef} />
    </div>
  );
}
