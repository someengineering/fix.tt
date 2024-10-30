import { metadata as rootMetadata } from '@/app/layout';
import Customers from '@/components/sections/Customers';
import Faq from '@/components/sections/Faq';
import Hero from '@/components/sections/Hero';
import Pricing from '@/components/sections/Pricing';
import WhyFix from '@/components/sections/WhyFix';
import { siteConfig } from '@/constants/config';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import Script from 'next/script';
import { WebSite, WithContext } from 'schema-dts';

export const metadata: Metadata = {
  alternates: {
    ...rootMetadata.alternates,
    canonical: siteConfig.url,
  },
};

export default async function HomePage() {
  const nonce = (await headers()).get('x-nonce') ?? undefined;
  const jsonLd: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${siteConfig.title}: ${siteConfig.tagline}`,
    url: siteConfig.url,
  };

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        nonce={nonce}
      />
      <Hero />
      <Customers />
      <WhyFix />
      <Pricing />
      <Faq />
    </>
  );
}
