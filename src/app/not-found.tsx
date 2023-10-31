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
    <div className="mx-auto flex w-full max-w-7xl flex-auto flex-col justify-center px-6 py-24 sm:py-64 lg:px-8">
      <p className="mb-2 text-xl font-semibold leading-8 text-primary-900">
        404
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-6 text-lg leading-7 text-gray-600">
        Sorry, we couldn&rsquo;t find the page you&rsquo;re looking for.
      </p>
      <div className="mt-10">
        <PrimaryLink href="/">
          <span aria-hidden="true">&larr;</span> Back to home
        </PrimaryLink>
      </div>
    </div>
  );
}
