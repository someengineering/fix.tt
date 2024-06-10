import { Metadata } from 'next';
import { headers } from 'next/headers';
import Image from 'next/image';
import Script from 'next/script';
import { WebSite, WithContext } from 'schema-dts';

import { metadata as rootMetadata } from '@/app/layout';
import dashboardScreenshot from '@/assets/screenshots/dashboard.png';
import Customers from '@/components/Customers';
import Faq from '@/components/Faq';
import Hero from '@/components/Hero';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import WhyFix from '@/components/WhyFix';
import { siteConfig } from '@/constants/config';

export const metadata: Metadata = {
  alternates: {
    ...rootMetadata.alternates,
    canonical: siteConfig.url,
  },
};

export default function HomePage() {
  const nonce = headers().get('x-nonce') ?? undefined;
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
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Image
            src={dashboardScreenshot}
            sizes="(max-width: 1140px) 100vw, 1140px"
            placeholder="blur"
            alt="Fix Security dashboard displays changes detected in the last week, security score, and top 5 possible security enhancements."
            className="rounded-xl shadow-md"
          />
        </div>
      </section>
      <Testimonials />
      <WhyFix />
      <Pricing />
      <Faq />
    </>
  );
}
