import { Suspense } from 'react';

import BlogNewsletterForm from '@/components/blog/BlogNewsletterForm';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Suspense>
        <BlogNewsletterForm />
      </Suspense>
    </>
  );
}
