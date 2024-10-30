import { siteConfig } from '@/constants/config';
import type { MetadataRoute } from 'next';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { title: name, shortTitle: short_name, description } = siteConfig;

  return {
    name,
    short_name,
    description,
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#7640eb',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
