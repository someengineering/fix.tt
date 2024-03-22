import 'server-only';

import { isLocal } from '@/constants/env';
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_SHOW_ID,
} from '@/constants/spotify';
import { getEpisodeSlug } from '@/utils/spotify';

export async function getAccessToken() {
  const data = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: SPOTIFY_CLIENT_ID!,
      client_secret: SPOTIFY_CLIENT_SECRET!,
    }),
    cache: 'no-store',
  }).then((res) => res.json());

  return data.access_token;
}

export type Episode = {
  audio_preview_url: string | null;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: {
    url: string;
    height: number | null;
    width: number | null;
  }[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  language?: string; // deprecated
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  resume_point: {
    fully_played?: boolean;
    resume_position_ms?: number;
  };
  type: 'episode';
  uri: string;
  restrictions?: { reason?: string };
};

export type PageInfo = {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
};

export type EpisodesResult = PageInfo & { items: Episode[] };

export const getEpisodes = async ({
  limit,
  offset,
}: {
  limit?: number;
  offset?: number;
}): Promise<EpisodesResult> => {
  const data = await fetch(
    `https://api.spotify.com/v1/shows/${SPOTIFY_SHOW_ID}/episodes?limit=${limit ?? 10}&offset=${offset ?? 0}`,
    {
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: isLocal ? 0 : 300, tags: ['spotify'] },
    },
  ).then((res) => res.json());

  return data;
};

export const getAllEpisodeSlugs = async () => {
  const data = await getEpisodes({ limit: 50 });

  let slugs: string[] = [];

  if (data.items.length) {
    slugs = data.items.map((episode) => getEpisodeSlug(episode.name));

    const fetchMore = async (offset?: number) => {
      const data = await getEpisodes({ limit: 50, offset });

      if (!data.items.length || !data.next) {
        return;
      }

      slugs = [
        ...slugs,
        ...data.items.map((episode) => getEpisodeSlug(episode.name)),
      ];

      if (data.offset + data.limit < data.total) {
        await fetchMore(data.offset + data.limit);
      }
    };

    if (data.offset + data.limit < data.total) {
      await fetchMore(data.offset + data.limit);
    }
  }

  return slugs;
};

export const getLatestEpisode = async () => {
  const data = await getEpisodes({ limit: 1 });

  return data.items[0];
};
