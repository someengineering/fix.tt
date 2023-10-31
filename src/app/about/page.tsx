import { Metadata } from 'next';

import MeetOurLeadership from '@/components/MeetOurLeadership';

import { metadata as rootMetadata } from '@/app/layout';
import { siteConfig } from '@/constants/config';
import { openGraph } from '@/utils/og';

const url = `${siteConfig.url}/about`;
const title = 'About Fix';
const description =
  'We designed Fix to simplify the process of fixing misconfigurations and make it easier for engineering teams to align security and speed.';
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

export default function AboutPage() {
  return (
    <>
      <div className="px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-lg leading-7 text-gray-700">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            About Fix
          </h1>
          <p className="mt-8 text-xl leading-8">
            At Fix, our journey began with a simple idea&mdash;to make cloud
            security accessible and frustration-free.
          </p>
          <p className="mt-8 text-xl leading-8">
            Before we started building Fix, we interviewed and listened to the
            voices of over forty cloud security engineers.{' '}
            <strong>
              One theme resonated above all: the desire to &ldquo;fix all the
              things.&rdquo;
            </strong>
          </p>
          <p className="mt-8 text-xl leading-8">
            We all know that you can&rsquo;t fix everything or always ensure
            100% configuration, but this was their way of expressing frustration
            with existing processes. The traditional approach often paints
            security as the bad guy: security surfaces problems and engineering
            is stuck fixing them. The feedback loop is too long&mdash;security
            has to talk to engineering, but engineering doesn&rsquo;t have
            context.
          </p>
          <p className="mt-8 text-xl leading-8">
            We created Fix to bridge this gap and transform security from a
            blocker to an enabler.
          </p>
          <div className="max-w-2xl">
            <h2 className="mt-12 text-2xl font-bold tracking-tight text-gray-900">
              Why &ldquo;Fix&rdquo;?
            </h2>
            <p className="mt-4">
              We chose the name &ldquo;Fix&rdquo; because it encapsulates our
              mission. We designed Fix to simplify the process of fixing
              misconfigurations and make it easier for engineering teams to
              align security and speed.
            </p>
            <h2 className="mt-12 text-2xl font-bold tracking-tight text-gray-900">
              Turning frustration into innovation
            </h2>
            <p className="mt-4">
              With Fix, we want to create an operating model where engineering
              and security teams work hand in hand to achieve their goals. Our
              goal is to give cloud security engineers the tools to protect
              their infrastructure without compromising innovation and speed.
            </p>
          </div>
        </div>
      </div>
      <MeetOurLeadership />
    </>
  );
}
