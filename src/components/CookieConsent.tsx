'use client';

import { useCookies } from 'next-client-cookies';
import { useEffect, useState } from 'react';

import Button from '@/components/common/buttons/Button';
import PrimaryLink from '@/components/common/links/PrimaryLink';

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
    <div className="pointer-events-none fixed inset-x-0 bottom-0 px-6 pb-6">
      <div className="pointer-events-auto ml-auto max-w-xl rounded-full bg-white p-6 shadow-lg ring-1 ring-gray-900/10">
        <p className="text-base leading-6 text-gray-900">
          We use cookies and other tracking technologies to analyze site usage
          and assist in marketing efforts. For details, see our{' '}
          <PrimaryLink href="/cookie-policy">cookie policy</PrimaryLink>.
        </p>
        <div className="mt-4 flex items-center gap-x-5">
          <Button
            variant="cornflower-blue"
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
    </div>
  );
}
