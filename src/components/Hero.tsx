import ButtonLink from '@/components/common/links/ButtonLink';

import { siteConfig } from '@/constants/config';

export default function Hero() {
  return (
    <div className="relative isolate bg-marian-blue-50 px-6 lg:px-8">
      <div className="mx-auto max-w-3xl py-16 text-center sm:py-24">
        <h1 className="text-balance text-4xl font-bold tracking-tight text-marian-blue-900 sm:text-6xl">
          The{' '}
          <span className="font-extrabold text-cornflower-blue-500">
            asset inventory
          </span>{' '}
          for your AWS security posture.
        </h1>
        <p className="mt-6 text-balance text-xl leading-8 text-gray-900">
          {siteConfig.description}
        </p>
        <div className="mt-10 space-x-5">
          <ButtonLink
            href="https://app.global.fixcloud.io/auth/register"
            size="lg"
          >
            Get started
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
