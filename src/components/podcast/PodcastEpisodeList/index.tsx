'use client';

import { useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import Item from '@/components/podcast/PodcastEpisodeList/Item';
import { UserFragment as HashnodeUser } from '@/generated/hashnode/graphql';
import {
  Episode as TransistorEpisode,
  EpisodesResult as TransistorEpisodesResult,
  PageInfo as TransistorPageInfo,
} from '@/lib/transistor';

export default function PodcastEpisodeList({
  initialEpisodes,
  initialPageInfo,
  getEpisodes,
  host,
}: {
  initialEpisodes: TransistorEpisode[];
  initialPageInfo: TransistorPageInfo;
  getEpisodes: (offset: number) => Promise<TransistorEpisodesResult>;
  host?: HashnodeUser;
}) {
  const [episodes, setEpisodes] =
    useState<TransistorEpisode[]>(initialEpisodes);
  const [pageInfo, setPageInfo] = useState<TransistorPageInfo>(initialPageInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: pageInfo.currentPage < pageInfo.totalPages,
    onLoadMore: async () => {
      setIsLoading(true);

      if (pageInfo.currentPage < pageInfo.totalPages) {
        const data = await getEpisodes(pageInfo.currentPage + 1);

        if (!data) {
          setError(true);
          return;
        }

        setEpisodes([...episodes, ...data.data]);
        setPageInfo(data.meta);
      }

      setIsLoading(false);
    },
    disabled: !!error,
    rootMargin: '0px 0px 400px 0px',
  });

  return (
    <div className="-mb-20 mt-16 space-y-20 lg:mt-20">
      {episodes?.map((episode) => (
        <Item
          episode={episode}
          key={`episode-${episode.attributes.slug}`}
          host={host}
        />
      ))}
      <div ref={sentryRef} />
    </div>
  );
}
