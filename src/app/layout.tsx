import { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import Script from 'next/script';
import { Suspense } from 'react';
import { FaGithub } from 'react-icons/fa6';

import '@/styles/globals.css';

import { openGraph } from '@/lib/og';

import { NavigationEvents } from '@/components/NavigationEvents';

import Logo from '@/assets/logo.svg';
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

const social: {
  name: string;
  href: string;
  icon: (
    props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
  ) => JSX.Element;
}[] = [
  // {
  //   name: 'LinkedIn',
  //   href: 'https://linkedin.com/company/fix',
  //   icon: (props) => <FaLinkedin {...props} />,
  // },
  {
    name: 'GitHub',
    href: 'https://github.com/someengineering',
    icon: (props) => <FaGithub {...props} />,
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunitoSans.variable}>
      <body className="bg-white">
        <header>
          <nav
            className="flex items-center justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <a
                href="#"
                className="-m-1.5 p-1.5 text-primary-900 hover:text-primary-950"
              >
                <span className="sr-only">{siteConfig.title}</span>
                <Logo className="h-16 w-auto" src="/images/logo.png" />
              </a>
            </div>
            {/* <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-lg p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <LuMenu className="h-10 w-10" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium leading-6 text-gray-900"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <ButtonLink href="#request-early-access">
                Request early access
              </ButtonLink>
            </div> */}
          </nav>
          {/* <Dialog
            as="div"
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
          >
            <div className="fixed inset-0 z-50" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">{siteConfig.title}</span>
                  <img className="h-16 w-auto" src="/images/logo.png" alt="" />
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-lg p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <LuX className="h-10 w-10" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-lg font-medium leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">
                    <ButtonLink
                      href="#request-early-access"
                      variant="tangerine"
                    >
                      Request early access
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog> */}
        </header>
        <main>{children}</main>
        <footer className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            {social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-sm leading-5 text-gray-500">
              &copy; {new Date().getFullYear()} Some Engineering Inc. All rights
              reserved.
            </p>
          </div>
        </footer>
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
