import UnstyledLink from '@/components/common/links/UnstyledLink';

import AmazonMusicLogo from '@/assets/podcast/apps/amazon-music.svg';
import ApplePodcastsLogo from '@/assets/podcast/apps/apple-podcasts.svg';
import DeezerLogo from '@/assets/podcast/apps/deezer.svg';
import PlayerFmLogo from '@/assets/podcast/apps/player-fm.svg';
import PodcastAddictLogo from '@/assets/podcast/apps/podcast-addict.svg';
import SpotifyLogo from '@/assets/podcast/apps/spotify.svg';

export default function ListenAnywhere({
  applePodcastsUrl,
  spotifyUrl,
  amazonMusicUrl,
  podcastAddictUrl,
  playerFmUrl,
  deezerUrl,
}: {
  applePodcastsUrl?: string;
  spotifyUrl?: string;
  amazonMusicUrl?: string;
  podcastAddictUrl?: string;
  playerFmUrl?: string;
  deezerUrl?: string;
}) {
  const apps: {
    name: string;
    logo: (
      props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
    ) => JSX.Element;
    url?: string;
  }[] = [
    {
      name: 'Apple Podcasts',
      logo: (props) => <ApplePodcastsLogo {...props} />,
      url: applePodcastsUrl,
    },
    {
      name: 'Spotify',
      logo: (props) => <SpotifyLogo {...props} />,
      url: spotifyUrl,
    },
    {
      name: 'Amazon Music',
      logo: (props) => <AmazonMusicLogo {...props} />,
      url: amazonMusicUrl,
    },
    {
      name: 'Podcast Addict',
      logo: (props) => <PodcastAddictLogo {...props} />,
      url: podcastAddictUrl,
    },
    {
      name: 'Player FM',
      logo: (props) => <PlayerFmLogo {...props} />,
      url: playerFmUrl,
    },
    {
      name: 'Deezer',
      logo: (props) => <DeezerLogo {...props} />,
      url: deezerUrl,
    },
  ];

  return (
    <div id="listen-anywhere">
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {apps.map((app, index) =>
          app.url ? (
            <UnstyledLink
              key={`app-${index}`}
              href={app.url}
              className="flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-marian-blue-500 focus-within:ring-offset-2 hover:border-gray-400"
            >
              <app.logo className="h-8 w-8 flex-shrink-0" aria-hidden="true" />
              <div className="flex flex-col pr-3 text-sm leading-tight">
                <span className="text-xs">Listen on</span>
                <span className="font-bold">{app.name}</span>
              </div>
            </UnstyledLink>
          ) : null,
        )}
      </div>
    </div>
  );
}
