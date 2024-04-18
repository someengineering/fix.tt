'use client';

import { useCookies } from 'next-client-cookies';
import { usePostHog } from 'posthog-js/react';
import { useEffect, useState } from 'react';

import Button from '@/components/common/buttons/Button';
import PrimaryLink from '@/components/common/links/PrimaryLink';

import { isLocal, isProd } from '@/constants/env';

export default function CookieConsent() {
  const posthog = usePostHog();
  const cookies = useCookies();
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    if (posthog.has_opted_in_capturing()) {
      setShowConsent(false);
    } else {
      setShowConsent(cookies.get('cookie_consent') !== 'false');
    }

    if (
      posthog.has_opted_in_capturing() ||
      cookies.get('cookie_consent') !== 'false'
    ) {
      cookies.remove('cookie_consent', {
        domain: isProd ? '.fix.security' : undefined,
        secure: !isLocal,
      });
    }
  }, [cookies, posthog]);

  if (!showConsent) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 px-6 pb-6">
      <div className="pointer-events-auto ml-auto max-w-xl rounded-xl bg-white p-6 ring-1 ring-gray-900/10">
        <p className="text-base leading-6 text-gray-900">
          We use cookies and other tracking technologies to analyze site usage
          and assist in marketing efforts. For details, see our{' '}
          <PrimaryLink href="/cookie-policy">cookie policy</PrimaryLink>.
        </p>
        <div className="mt-4 flex items-center gap-x-5">
          <Button
            onClick={(e) => {
              e.preventDefault();
              setShowConsent(false);
              posthog.opt_in_capturing({ enable_persistence: true });
            }}
          >
            Accept
          </Button>
          <Button
            variant="ghost"
            onClick={(e) => {
              e.preventDefault();
              setShowConsent(false);
              cookies.set('cookie_consent', 'false', {
                expires: 30,
                domain: isProd ? '.fix.security' : undefined,
                secure: !isLocal,
              });
              posthog.opt_out_capturing();
            }}
          >
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
}
