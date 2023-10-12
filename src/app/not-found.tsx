import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-auto flex-col justify-center px-6 py-24 sm:py-64 lg:px-8">
      <p className="text-lg font-semibold leading-8 text-primary-900">404</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-6 text-lg leading-7 text-gray-600">
        Sorry, we couldn&rsquo;t find the page you&rsquo;re looking for.
      </p>
      <div className="mt-10">
        <a
          href="/"
          className="text-base font-semibold leading-7 text-primary-900"
        >
          <span aria-hidden="true">&larr;</span> Back to home
        </a>
      </div>
    </div>
  );
}
