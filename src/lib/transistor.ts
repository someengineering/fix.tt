import 'server-only';

import { isLocal } from '@/constants/env';
import { TRANSISTOR_API_KEY, TRANSISTOR_SHOW_ID } from '@/constants/transistor';

export type Show = {
  id: string;
  type: 'show';
  attributes: {
    apple_podcasts: string;
    description: string;
    spotify: string;
    title: string;
    updated_at: string;
  };
};

export type Episode = {
  id: string;
  type: 'episode';
  attributes: {
    alternate_url: string;
    duration: number;
    formatted_description: string;
    formatted_summary: string;
    media_url: string;
    number: string;
    published_at: string;
    slug: string;
    title: string;
    updated_at: string;
    video_url: string;
  };
};

export type PageInfo = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
};

export type EpisodesResult = {
  data: Episode[];
  meta: PageInfo;
};

export const getShow = async (): Promise<Show> => {
  const params = new URLSearchParams();
  params.append('fields[show][]', 'apple_podcasts');
  params.append('fields[show][]', 'description');
  params.append('fields[show][]', 'spotify');
  params.append('fields[show][]', 'title');
  params.append('fields[show][]', 'updated_at');

  const data = await fetch(
    `https://api.transistor.fm/v1/shows/${TRANSISTOR_SHOW_ID}?${params}`,
    {
      headers: {
        'x-api-key': TRANSISTOR_API_KEY!,
        'Content-Type': 'application/json',
      },
      next: { revalidate: isLocal ? 0 : 3600, tags: ['transistor'] },
    },
  ).then((res) => res.json());

  return data.data;
};

export const getEpisodes = async ({
  query,
  pageNumber = 1,
  pageSize = 10,
}: {
  query?: string;
  pageNumber?: number;
  pageSize?: number;
}): Promise<EpisodesResult> => {
  const params = new URLSearchParams({
    show_id: TRANSISTOR_SHOW_ID!,
    status: 'published',
    query: query ?? '',
    'pagination[page]': pageNumber.toString(),
    'pagination[per]': pageSize.toString(),
  });
  params.append('fields[episode][]', 'alternate_url');
  params.append('fields[episode][]', 'duration');
  params.append('fields[episode][]', 'formatted_description');
  params.append('fields[episode][]', 'formatted_summary');
  params.append('fields[episode][]', 'media_url');
  params.append('fields[episode][]', 'number');
  params.append('fields[episode][]', 'published_at');
  params.append('fields[episode][]', 'slug');
  params.append('fields[episode][]', 'title');
  params.append('fields[episode][]', 'updated_at');
  params.append('fields[episode][]', 'video_url');

  const data = await fetch(`https://api.transistor.fm/v1/episodes?${params}`, {
    headers: {
      'x-api-key': TRANSISTOR_API_KEY!,
      'Content-Type': 'application/json',
    },
    next: { revalidate: isLocal ? 0 : 3600, tags: ['transistor'] },
  }).then((res) => res.json());

  return data;
};

export const getAllEpisodeSlugs = async () => {
  const data = await getEpisodes({ pageSize: 20 });

  let slugs: string[] = [];

  if (data.data.length) {
    slugs = data.data.map((episode) => episode.attributes.slug);

    const fetchMore = async (pageNumber?: number) => {
      const data = await getEpisodes({ pageNumber, pageSize: 20 });

      if (!data.data.length || data.meta.currentPage >= data.meta.totalPages) {
        return;
      }

      slugs = [
        ...slugs,
        ...data.data.map((episode) => episode.attributes.slug),
      ];

      if (data.meta.currentPage >= data.meta.totalPages) {
        await fetchMore(data.meta.currentPage + 1);
      }
    };

    if (data.meta.currentPage >= data.meta.totalPages) {
      await fetchMore(data.meta.currentPage + 1);
    }
  }

  return slugs;
};

export const getAllEpisodes = async () => {
  const data = await getEpisodes({ pageSize: 20 });

  let episodes: Episode[] = [];

  if (data.data.length) {
    episodes = data.data;

    const fetchMore = async (pageNumber?: number) => {
      const data = await getEpisodes({ pageNumber, pageSize: 20 });

      if (!data.data.length || data.meta.currentPage >= data.meta.totalPages) {
        return;
      }

      episodes = [...episodes, ...data.data];

      if (data.meta.currentPage >= data.meta.totalPages) {
        await fetchMore(data.meta.currentPage + 1);
      }
    };

    if (data.meta.currentPage >= data.meta.totalPages) {
      await fetchMore(data.meta.currentPage + 1);
    }
  }

  return episodes;
};

export const getEpisode = async (query: string): Promise<Episode | null> => {
  const data = await getEpisodes({
    query,
    pageNumber: 1,
    pageSize: 1,
  });

  return data.data[0] ?? null;
};
