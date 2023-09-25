'use client';

import { useCookies } from 'next-client-cookies';
import { useEffect, useState } from 'react';

import Button from '@/components/buttons/Button';

export default function CookieConsent() {
  const cookies = useCookies();
  const [showConsent, setShowConsent] = useState(false);

  useEffect(
    () =>
      setShowConsent(
        cookies.get('cookie_consent') !== 'true' &&
          cookies.get('cookie_consent') !== 'false',
      ),
    [cookies],
  );

  if (!showConsent) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 flex flex-col justify-between gap-x-8 gap-y-4 bg-white p-6 ring-1 ring-gray-900/10 md:flex-row md:items-center lg:px-8">
      <p className="max-w-4xl text-base leading-6 text-gray-900">
        We use cookies and other tracking technologies to analyze site usage and
        assist in marketing efforts.
      </p>
      <div className="flex flex-none items-center gap-x-2">
        <Button
          variant="primary"
          onClick={(e) => {
            e.preventDefault();
            cookies.set('cookie_consent', 'true', {
              expires: Date.now() + 365 * 24 * 60 * 60 * 1000,
            });
            setShowConsent(false);
            gtag('consent', 'update', {
              ad_storage: 'granted',
              analytics_storage: 'granted',
            });
          }}
        >
          Accept
        </Button>
        <Button
          variant="ghost"
          onClick={(e) => {
            e.preventDefault();
            cookies.set('cookie_consent', 'false', {
              expires: Date.now() + 24 * 60 * 60 * 1000,
            });
            setShowConsent(false);
          }}
        >
          Reject
        </Button>
      </div>
    </div>
  );
}
