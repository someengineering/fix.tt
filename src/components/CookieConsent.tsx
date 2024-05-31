'use client';

import Cookies from 'js-cookie';
import { usePostHog } from 'posthog-js/react';
import { useEffect, useState } from 'react';

import Button from '@/components/common/buttons/Button';
import PrimaryLink from '@/components/common/links/PrimaryLink';
import { isLocal, isProd } from '@/constants/env';

export default function CookieConsent() {
  const posthog = usePostHog();
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    if (Cookies.get('cookie_consent') === 'true') {
      posthog.opt_in_capturing();
    } else if (!posthog.has_opted_in_capturing()) {
      setShowConsent(Cookies.get('cookie_consent') !== 'false');
    }

    if (
      Cookies.get('cookie_consent') !== 'true' &&
      Cookies.get('cookie_consent') !== 'false'
    ) {
      Cookies.remove('cookie_consent', {
        domain: isProd ? '.fix.security' : undefined,
        secure: !isLocal,
      });
    }
  }, [posthog]);

  if (!showConsent) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 px-6 pb-6">
      <div className="pointer-events-auto ml-auto max-w-xl rounded-xl bg-white p-6 ring-1 ring-gray-900/10">
        <p className="text-base text-gray-900">
          We use cookies and other tracking technologies to analyze site usage
          and assist in marketing efforts. For details, see our{' '}
          <PrimaryLink href="/cookie-policy">cookie policy</PrimaryLink>.
        </p>
        <div className="mt-4 flex items-center gap-x-5">
          <Button
            onClick={(e) => {
              e.preventDefault();
              setShowConsent(false);
              Cookies.set('cookie_consent', 'true', {
                domain: isProd ? '.fix.security' : undefined,
                secure: !isLocal,
                expires: 365,
              });
              posthog.opt_in_capturing();
            }}
          >
            Accept
          </Button>
          <Button
            variant="ghost"
            onClick={(e) => {
              e.preventDefault();
              setShowConsent(false);
              Cookies.set('cookie_consent', 'false', {
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
