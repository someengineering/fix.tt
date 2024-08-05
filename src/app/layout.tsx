import { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import PlausibleProvider from 'next-plausible';
import React, { Suspense } from 'react';

import '@/styles/globals.css';

import { plusJakartaSans } from '@/app/fonts';
import CookieConsent from '@/components/analytics/CookieConsent';
import PosthogPageView from '@/components/analytics/PosthogPageView';
import BlogNewsletterForm from '@/components/blog/BlogNewsletterForm';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { siteConfig } from '@/constants/config';
import { isProd } from '@/constants/env';
import PosthogProvider from '@/providers/posthog';
import { openGraph } from '@/utils/og';
import "../../storyblok";
import {apiPlugin, storyblokInit} from "@storyblok/react";
import components from "../../storyblok";
import StoryblokBridgeLoader from "@storyblok/react/bridge-loader";
import Script from "next/script";

const url = siteConfig.url;
const title = siteConfig.title;
const description = siteConfig.description;
const ogImage = openGraph({
  title: siteConfig.tagline,
  description,
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
        { url: '/blog/rss.xml', title: 'Fix Security blog RSS feed' },
      ],
      'application/atom+xml': [
        { url: '/blog/atom.xml', title: 'Fix Security blog Atom feed' },
      ],
      'application/json': [
        { url: '/blog/feed.json', title: 'Fix Security blog JSON feed' },
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

storyblokInit({
  accessToken: process.env.STORYBLOK_OAUTH_TOKEN,
  use: [apiPlugin],
  components,
  apiOptions: {
    cache: { type: 'memory', clear: 'auto' }  // Set cache to memory and clear it automatically
  },
  experimental: {
    readOptions: {
      cache: 'no-store'
    }
  }
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nonce = headers().get('x-nonce') ?? undefined;

  return (
    <html lang="en" className={`scroll-smooth ${plusJakartaSans.variable}`}>
    <head>
      <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid={process.env.COOKIEBOT_ID}
          data-blockingmode="auto"
          type="text/javascript"
          strategy="afterInteractive"
      />
      <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.GOOGLE_TAG_MANAGER_CODE}');
              `,
          }}
      />
      <PlausibleProvider domain="fix.security" scriptProps={{nonce}}/>
      <Script
          src="https://app.storyblok.com/f/storyblok-v2-latest.js"
          async
          strategy="afterInteractive"
      />
    </head>
    <body className="bg-white">
    <noscript>
      <iframe src={`https://www.googletagmanager.com/ns.html?id=${process.env.GOOGLE_TAG_MANAGER_CODE}`}
              height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}>
      </iframe>
    </noscript>
    <PosthogProvider>
      <Header/>
      <main>
        {children}
        <Suspense>
          <BlogNewsletterForm nonce={nonce}/>
        </Suspense>
      </main>
      <Footer/>
      {/*<CookieConsent/>*/}
      <Suspense>
        <PosthogPageView/>
      </Suspense>
    </PosthogProvider>
    </body>
    <StoryblokBridgeLoader options={{}}/>
    </html>
  );
}
