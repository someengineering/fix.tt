import { Metadata } from 'next';

import Customers from '@/components/Customers';
import Faq from '@/components/Faq';
import Pricing from '@/components/Pricing';

import { metadata as rootMetadata } from '@/app/layout';
import { siteConfig } from '@/constants/config';
import { openGraph } from '@/utils/og';

const url = `${siteConfig.url}/pricing`;
const title = 'Pricing';
const description =
  'Fix pricing scales on a per-cloud-account basis, with an add-on to buy more seats for your team. We offer a free tier and two-week trials.';
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
