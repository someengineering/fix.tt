'use client';

import { useEffect } from 'react';

import { isProd } from '@/constants/env';

export default function BlogPostAnalytics({
  publicationId,
  postId,
  url,
}: {
  publicationId: string;
  postId: string;
  url: string;
}) {
  useEffect(() => {
    if (!isProd) {
      return;
    }

    try {
      fetch(`/api/blog/view`, {
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
  }, [postId, publicationId, url]);

  return null;
}
