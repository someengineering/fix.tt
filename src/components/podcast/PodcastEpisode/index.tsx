import { Episode as TransistorEpisode } from '@/lib/transistor';

import Content from '@/components/podcast/PodcastEpisode/Content';
import Header from '@/components/podcast/PodcastEpisode/Header';

import { siteConfig } from '@/constants/config';
import { UserFragment as HashnodeUser } from '@/generated/hashnode/graphql';
import { parseEpisodeTitle } from '@/utils/transistor';

export default function PodcastEpisode({
  episode,
  host,
}: {
  episode: TransistorEpisode;
  host?: HashnodeUser;
}) {
  const url = `${siteConfig.url}/podcast/${episode.attributes.slug}`;
  const { title, guest } = parseEpisodeTitle(episode.attributes.title);

  return (
    <>
      <div className="px-6 py-16 sm:py-24 lg:px-8">
        <article
          className="mx-auto max-w-3xl text-lg text-gray-700"
          itemType="http://schema.org/PodcastEpisode"
          itemID={url}
        >
          <Header
            url={url}
            title={title}
            summary={episode.attributes.formatted_summary}
            host={host}
            guest={guest}
            publishedAt={episode.attributes.published_at}
            updatedAt={episode.attributes.updated_at}
            duration={episode.attributes.duration}
          />
          <Content
            audioUrl={episode.attributes.media_url}
            htmlDescription={episode.attributes.formatted_description}
          />
        </article>
      </div>
    </>
  );
}
