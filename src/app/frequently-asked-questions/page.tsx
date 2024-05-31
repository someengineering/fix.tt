import { Metadata } from 'next';

import { metadata as rootMetadata } from '@/app/layout';
import Faq from '@/components/Faq';
import { siteConfig } from '@/constants/config';
import { openGraph } from '@/utils/og';

const url = `${siteConfig.url}/frequently-asked-questions`;
const title = 'Frequently asked questions';
const description = siteConfig.description;
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

export default async function FaqPage() {
  return <Faq />;
}
