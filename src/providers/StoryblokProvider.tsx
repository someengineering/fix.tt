'use client';

import { apiPlugin, storyblokInit } from '@storyblok/react';

import components from '../../storyblok';

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_OAUTH_TOKEN,
  use: [apiPlugin],
  components,
  apiOptions: {
    cache: { type: 'memory', clear: 'auto' }
  },
  experimental: {
    readOptions: {
      cache: 'no-store'
    }
  }
});

export default function StoryblokProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
