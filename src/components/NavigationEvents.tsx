'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import * as gtag from '@/lib/gtag';

import { gtagId } from '@/constant/env';

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (gtagId) {
      gtag.pageview(new URL(`${pathname}?${searchParams}`));
    }
  }, [pathname, searchParams]);

  return null;
}
