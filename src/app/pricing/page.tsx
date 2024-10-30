import { metadata as rootMetadata } from '@/app/layout';
import Customers from '@/components/sections/Customers';
import Faq from '@/components/sections/Faq';
import Pricing from '@/components/sections/Pricing';
import { siteConfig } from '@/constants/config';
import { openGraph } from '@/utils/og';
import { Metadata } from 'next';

const url = `${siteConfig.url}/pricing`;
const title = 'Pricing';
const description =
  'Fix Security pricing scales on a per-cloud-account basis, with an add-on to buy more seats for your team. We offer a free tier and two-week trials.';
const ogImage = openGraph({
  title,
  description,
});

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    ...rootMetadata.alternates,
    canonical: url,
  },
  openGraph: {
    ...rootMetadata.openGraph,
    url,
    title,
    description,
    images: [ogImage],
  },
  twitter: {
    ...rootMetadata.twitter,
    title: `${title} | ${siteConfig.title}`,
    description,
    images: [ogImage],
  },
};

export default async function PricingPage() {
  return (
    <>
      <Pricing />
      <Customers />
      <Faq />
    </>
  );
}
