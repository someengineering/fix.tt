'use client';

import { useEffect } from 'react';

export default function Analytics({
  publicationId,
  postId,
  url,
}: {
  publicationId: string;
  postId: string;
  url: string;
}) {
  useEffect(() => {
    const pingHashnodeAnalytics = async () => {
      try {
        await fetch(`/api/blog/view`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              publicationId,
              postId,
              url,
              timestamp: Date.now(),
              timezoneOffset: new Date().getTimezoneOffset(),
            },
          }),
        });
      } catch (e) {
        /* do not throw */
      }
    };

    pingHashnodeAnalytics();
  }, [postId, publicationId, url]);

  return null;
}
