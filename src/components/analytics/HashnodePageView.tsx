'use client';

import { useEffect } from 'react';

import { isProd } from '@/constants/env';

export default function HashnodePageView({
  publicationId,
  postId,
  seriesId,
  staticPageId,
}: {
  publicationId: string;
  postId?: string;
  seriesId?: string;
  staticPageId?: string;
}) {
  useEffect(() => {
    if (!isProd || !publicationId) {
      return;
    }

    const sendHashnodePageView = async () => {
      const blob = new Blob(
        [
          JSON.stringify({
            events: [
              {
                payload: {
                  publicationId,
                  postId: postId || null,
                  seriesId: seriesId || null,
                  pageId: staticPageId || null,
                  url: window.location.href,
                  referrer: document.referrer || null,
                  language: navigator.language || null,
                  screen: `${window.screen.width}x${window.screen.height}`,
                },
                type: 'pageview',
              },
            ],
          }),
        ],
        { type: 'application/json; charset=UTF-8' },
      );

      let beaconSent = false;

      try {
        if (navigator.sendBeacon) {
          beaconSent = navigator.sendBeacon('/api/analytics', blob);
        }
      } catch (e) {
        /* do not throw */
      }

      if (!beaconSent) {
        fetch('/api/analytics', {
          method: 'POST',
          body: blob,
          credentials: 'omit',
          keepalive: true,
        });
      }
    };

    sendHashnodePageView();
  }, [postId, publicationId, seriesId, staticPageId]);

  return null;
}
