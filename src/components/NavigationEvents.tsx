'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import * as gtag from '@/lib/gtag';

import { siteConfig } from '@/constant/config';
import { gtagId } from '@/constant/env';

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (gtagId) {
      gtag.pageview(new URL(`${siteConfig.url}${pathname}?${searchParams}`));
    }
  }, [pathname, searchParams]);

  return null;
}
