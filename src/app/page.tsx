import { Metadata } from 'next';
import { WebSite, WithContext } from 'schema-dts';

import Faq from '@/components/Faq';
import Pricing from '@/components/Pricing';
import { RequestEarlyAccessForm } from '@/components/RequestEarlyAccessForm';
import Why from '@/components/Why';

import { metadata as rootMetadata } from '@/app/layout';
import { siteConfig } from '@/constants/config';

export const metadata: Metadata = {
  alternates: {
    ...rootMetadata.alternates,
    canonical: siteConfig.url,
  },
};

export default function Home() {
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
      <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto max-w-3xl py-16 sm:py-24 lg:py-28">
          <div className="text-center">
            <h1 className="balanced text-4xl font-bold tracking-tight text-primary-900 sm:text-6xl">
              {siteConfig.tagline}
            </h1>
            <p className="balanced mt-6 text-lg leading-8 text-gray-600">
              {siteConfig.description}
            </p>
            <RequestEarlyAccessForm />
          </div>
        </div>
      </div>
      <Why />
      <Pricing />
      <Faq />
    </>
  );
}
