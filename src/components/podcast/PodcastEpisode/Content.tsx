import parse from 'html-react-parser';

import { sanitizeHtml } from '@/utils/transistor';

export default function Content({ html }: { html: string }) {
  return (
    <div className="w-prose html my-8 border-y border-gray-900/5 pt-8">
      {parse(sanitizeHtml(html))}
    </div>
  );
}
