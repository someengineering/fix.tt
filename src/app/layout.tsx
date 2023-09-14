import { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import Script from 'next/script';
import { Suspense } from 'react';

import '@/styles/globals.css';

import { openGraph } from '@/lib/og';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { NavigationEvents } from '@/components/NavigationEvents';

import { siteConfig } from '@/constant/config';
import { isProd } from '@/constant/env';
import { gtagId } from '@/constant/env';

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito-sans',
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.title}: ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: isProd
    ? { index: true, follow: true }
    : { index: false, follow: false },
  themeColor: '#1946b4',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [
      openGraph({
        title: siteConfig.tagline,
        metadata: siteConfig.url,
      }),
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      openGraph({
        title: siteConfig.tagline,
        metadata: siteConfig.url,
      }),
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunitoSans.variable}>
      <body className="bg-white">
        <Header />
        <main>{children}</main>
        <Footer />
        {gtagId ? (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag() { dataLayer.push(arguments); }
                gtag('js', new Date());
                
                gtag('config', '${gtagId}', {
                  'anonymize_ip': true
                });
              `,
              }}
            />
            <Suspense fallback={null}>
              <NavigationEvents />
            </Suspense>
          </>
        ) : null}
      </body>
    </html>
  );
}
