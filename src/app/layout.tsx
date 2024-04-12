import { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import { CookiesProvider } from 'next-client-cookies/server';
import PlausibleProvider from 'next-plausible';

import '@/styles/globals.css';

import CookieConsent from '@/components/CookieConsent';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

import { plusJakartaSans } from '@/app/fonts';
import { siteConfig } from '@/constants/config';
import { isProd } from '@/constants/env';
import PosthogProvider from '@/providers/posthog';
import { openGraph } from '@/utils/og';

const PosthogPageView = dynamic(() => import('../components/PosthogPageView'), {
  ssr: false,
});

const url = siteConfig.url;
const title = siteConfig.title;
const description = siteConfig.description;
const ogImage = openGraph({
  title: siteConfig.tagline,
  description: url,
});

export const metadata: Metadata = {
  title: {
    default: `${title}: ${siteConfig.tagline}`,
    template: `%s | ${title}`,
  },
  description,
  robots: isProd
    ? { index: true, follow: true }
    : { index: false, follow: false },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    types: {
      'application/rss+xml': [
        { url: '/blog/rss.xml', title: 'Fix blog RSS feed' },
      ],
      'application/atom+xml': [
        { url: '/blog/atom.xml', title: 'Fix blog Atom feed' },
      ],
      'application/json': [
        { url: '/blog/feed.json', title: 'Fix blog JSON feed' },
      ],
    },
  },
  openGraph: {
    url,
    title,
    description,
    siteName: title,
    images: [ogImage],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: '#3d58d3',
  colorScheme: 'only light',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${plusJakartaSans.variable}`}>
      <head>
        <PlausibleProvider domain="fix.security" />
      </head>
      <body className="bg-white">
        <CookiesProvider>
          <PosthogProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <CookieConsent />
            <PosthogPageView />
          </PosthogProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
