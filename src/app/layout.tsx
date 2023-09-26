import { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import { cookies } from 'next/headers';
import Script from 'next/script';

import '@/styles/globals.css';

import CookieConsent from '@/components/CookieConsent';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

import { siteConfig } from '@/constants/config';
import { isProd } from '@/constants/env';
import { GTM_CONTAINER_ID } from '@/constants/google';
import { ClientCookiesProvider } from '@/providers/ClientCookiesProvider';
import { SWRProvider } from '@/providers/SWRProvider';
import { openGraph } from '@/utils/og';

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
  const cookieStore = cookies();
  const consent = cookieStore.get('cookie_consent')?.value === 'true';

  return (
    <SWRProvider>
      <ClientCookiesProvider value={cookieStore.getAll()}>
        <html lang="en" className={`scroll-smooth ${nunitoSans.variable}`}>
          <body className="bg-white">
            <Header />
            <main>{children}</main>
            <Footer />
            {GTM_CONTAINER_ID ? (
              <>
                <Script
                  id="google-tag-manager"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('consent', 'default', {
                    'ad_storage': 'denied',
                    'analytics_storage': 'denied'
                  });
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`,
                  }}
                />
                {consent ? (
                  <>
                    <Script
                      id="consent-update"
                      strategy="afterInteractive"
                      dangerouslySetInnerHTML={{
                        __html: `
                        gtag('consent', 'update', {
                          'ad_storage': 'granted',
                          'analytics_storage': 'granted'
                        });
                      `,
                      }}
                    />
                  </>
                ) : (
                  <CookieConsent />
                )}
              </>
            ) : null}
          </body>
        </html>
      </ClientCookiesProvider>
    </SWRProvider>
  );
}
