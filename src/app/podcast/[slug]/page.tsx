import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getUser } from '@/lib/hashnode';
import { getAllEpisodeSlugs, getEpisode } from '@/lib/transistor';

import PodcastEpisode from '@/components/podcast/PodcastEpisode';

import { metadata as rootMetadata } from '@/app/layout';
import { siteConfig } from '@/constants/config';
import { openGraph } from '@/utils/og';
import { parseEpisodeTitle } from '@/utils/transistor';

export async function generateStaticParams() {
  const slugs = await getAllEpisodeSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const episode = await getEpisode(params.slug);

  if (!episode) {
    return {};
  }

  const url = `${siteConfig.url}/podcast/${episode.attributes.slug}`;
  const { title } = parseEpisodeTitle(episode.attributes.title);
  const description = episode.attributes.formatted_summary;
  const ogImage = openGraph({
    title,
  });

  return {
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
      description,
      images: [ogImage],
      type: 'article',
      publishedTime: episode.attributes.published_at,
      modifiedTime: episode.attributes.updated_at,
    },
    twitter: {
      ...rootMetadata.twitter,
      title: `${episode.attributes.title} | ${siteConfig.title}`,
      description,
      images: [ogImage],
    },
  };
}

export default async function PodcastEpisodePage({
  params,
}: {
  params: { slug: string };
}) {
  const episodeData = getEpisode(params.slug);
  const hostData = getUser('scapecast');

  const [episode, host] = await Promise.all([episodeData, hostData]);

  if (!episode) {
    notFound();
  }

  return <PodcastEpisode episode={episode} host={host ?? undefined} />;
}
