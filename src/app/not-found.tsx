import { Metadata } from 'next';

import PrimaryLink from '@/components/common/links/PrimaryLink';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function NotFoundPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <p className="mb-2 text-lg font-bold leading-8 text-cornflower-blue-600 sm:text-xl">
            404
          </p>
          <h1 className="text-pretty text-4xl font-extrabold sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-pretty text-lg font-semibold text-gray-900 sm:text-xl">
            Sorry, we couldn&rsquo;t find the page you&rsquo;re looking for.
          </p>
          <div className="mt-10">
            <PrimaryLink href="/">
              <span aria-hidden="true">&larr;</span> Back to home
            </PrimaryLink>
          </div>
        </div>
      </div>
    </div>
  );
}
