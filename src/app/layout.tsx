import '@/styles/cookiebot.css';
import '@/styles/globals.css';

import BlogNewsletterForm from '@/components/blog/BlogNewsletterForm';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { siteConfig } from '@/constants/config';
import { COOKIEBOT_ID } from '@/constants/cookiebot';
import { isProd } from '@/constants/env';
import { GTM_CONTAINER_ID } from '@/constants/google';
import { openGraph } from '@/utils/og';
import { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { headers } from 'next/headers';
import Script from 'next/script';
import { Suspense } from 'react';

const { url, title, description } = siteConfig;
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
  metadataBase: isProd ? new URL(url) : undefined,
  robots: isProd
    ? { index: true, follow: true }
    : { index: false, follow: false },
  icons: [
    {
      url: '/favicon.ico',
      type: 'image/x-icon',
      sizes: '16x16 32x32',
    },
    {
      url: '/icon.svg',
      type: 'image/svg+xml',
      sizes: 'any',
    },
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
      type: 'image/png',
      sizes: '180x180',
    },
  ],
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
};

export const viewport: Viewport = {
  themeColor: '#7640eb',
  colorScheme: 'only light',
};

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
});

const gtmScript = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return (
    <html lang="en" className={`scroll-smooth ${plusJakartaSans.variable}`}>
      <body className="bg-white">
        <Header />
        <main>
          {children}
          <Suspense>
            <BlogNewsletterForm nonce={nonce} />
          </Suspense>
        </main>
        <Footer />
        <Script
          src="/js/script.js"
          data-domain="fix.security"
          strategy="afterInteractive"
          nonce={nonce}
        />
        {COOKIEBOT_ID ? (
          <Script
            id="Cookiebot"
            src="/js/uc.js"
            data-cbid={COOKIEBOT_ID}
            data-blockingmode="auto"
            strategy="afterInteractive"
            nonce={nonce}
          />
        ) : null}
        {GTM_CONTAINER_ID ? (
          <Script
            id="google-tag-manager"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: gtmScript }}
            nonce={nonce}
          />
        ) : null}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
            className="invisible hidden"
            height={0}
            width={0}
          />
        </noscript>
      </body>
    </html>
  );
}
