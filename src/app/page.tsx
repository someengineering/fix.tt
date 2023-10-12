import Faq from '@/components/Faq';
import Pricing from '@/components/Pricing';
import { RequestEarlyAccessForm } from '@/components/RequestEarlyAccessForm';
import Why from '@/components/Why';

import { siteConfig } from '@/constants/config';

export default function Home() {
  return (
    <>
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
