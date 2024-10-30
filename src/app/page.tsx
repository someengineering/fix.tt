import { metadata as rootMetadata } from '@/app/layout';
import inventoryScreenshot from '@/assets/screenshots/inventory.png';
import Customers from '@/components/sections/Customers';
import Faq from '@/components/sections/Faq';
import Hero from '@/components/sections/Hero';
import Pricing from '@/components/sections/Pricing';
import WhyFix from '@/components/sections/WhyFix';
import { siteConfig } from '@/constants/config';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import Image from 'next/image';
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
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Image
            src={inventoryScreenshot}
            sizes="(max-width: 1140px) 100vw, 1140px"
            placeholder="blur"
            alt="Fix Security's Inventory view showing cloud resources. Left sidebar displays resource categories. Main panel shows a filtered list of resources across AWS, Azure, and GCP, with dropdown filters for clouds, accounts, regions, and kinds."
            className="rounded-xl shadow-md"
          />
        </div>
      </section>
      <WhyFix />
      <Pricing />
      <Faq />
    </>
  );
}
