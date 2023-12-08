import { Metadata } from 'next';
import { WebSite, WithContext } from 'schema-dts';

import ButtonLink from '@/components/common/links/ButtonLink';
import Customers from '@/components/Customers';
import Faq from '@/components/Faq';
// import HowFixWorks from '@/components/HowFixWorks';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import WhyFix from '@/components/WhyFix';

import { metadata as rootMetadata } from '@/app/layout';
import { siteConfig } from '@/constants/config';

export const metadata: Metadata = {
  alternates: {
    ...rootMetadata.alternates,
    canonical: siteConfig.url,
  },
};

export default function HomePage() {
  const jsonLd: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${siteConfig.title}: ${siteConfig.tagline}`,
    url: siteConfig.url,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative isolate bg-marian-blue-50 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-marian-blue-900 sm:text-6xl">
              <span className="text-cornflower-blue-500">Mission control</span>{' '}
              for your AWS security.
            </h1>
            <p className="text-balance mt-6 text-lg leading-8 text-gray-600">
              {siteConfig.description}
            </p>
            <div className="mt-10 space-x-5">
              <ButtonLink
                href="https://app.global.fixcloud.io/auth/login"
                variant="light"
                size="lg"
              >
                Log in
              </ButtonLink>
              <ButtonLink
                href="https://app.global.fixcloud.io/auth/register"
                size="lg"
              >
                Get started
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
      <Customers />
      <Testimonials />
      {/* <HowFixWorks /> */}
      <WhyFix />
      <Pricing />
      <Faq />
    </>
  );
}
