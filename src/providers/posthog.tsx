'use client';

import posthog from 'posthog-js';
import { PostHogProvider as Provider } from 'posthog-js/react';

import { isLocal } from '@/constants/env';
import {
  POSTHOG_API_HOST,
  POSTHOG_PROJECT_API_KEY,
  POSTHOG_UI_HOST,
} from '@/constants/posthog';

if (typeof window !== 'undefined' && POSTHOG_PROJECT_API_KEY) {
  posthog.init(POSTHOG_PROJECT_API_KEY, {
    api_host: POSTHOG_API_HOST,
    ui_host: POSTHOG_UI_HOST,
    debug: isLocal,
    capture_pageview: false, // Page views are captured manually

    opt_out_persistence_by_default: true,
    opt_out_capturing_by_default: true,

    disable_session_recording: true,
    disable_surveys: true,
    enable_recording_console_log: false,
  });
}

export default function PosthogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider client={posthog}>{children}</Provider>;
}
