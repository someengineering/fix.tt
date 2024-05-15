import { Metadata } from 'next';
import Image from 'next/image';
import { WebSite, WithContext } from 'schema-dts';

import Customers from '@/components/Customers';
import Faq from '@/components/Faq';
import Hero from '@/components/Hero';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import WhyFix from '@/components/WhyFix';

import { metadata as rootMetadata } from '@/app/layout';
import dashboardScreenshot from '@/assets/screenshots/dashboard.png';
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
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Image
            src={dashboardScreenshot}
            alt="Fix dashboard displays changes detected in the last week, security score, and top 5 possible security enhancements."
            sizes="(max-width: 1280px) 100vw, 1280px"
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
