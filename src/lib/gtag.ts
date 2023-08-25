import { gtagId } from '@/constant/env';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
  if (gtagId) {
    window.gtag('config', gtagId, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value: number;
}) => {
  if (gtagId) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};
