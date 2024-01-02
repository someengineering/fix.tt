import { Metadata } from 'next';
import { WebSite, WithContext } from 'schema-dts';

import Customers from '@/components/Customers';
import Faq from '@/components/Faq';
import Hero from '@/components/Hero';
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
      <Hero />
      <Customers />
      <Testimonials />
      {/* <HowFixWorks /> */}
      <WhyFix />
      <Pricing />
      <Faq />
    </>
  );
}
