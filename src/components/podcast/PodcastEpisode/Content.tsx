import parse, { DOMNode, Element, domToReact } from 'html-react-parser';

import { sanitizeHtml } from '@/utils/transistor';
import PrimaryLink from '@/components/common/links/PrimaryLink';

const parserOptions = {
  replace: (domNode: DOMNode) => {
    if (domNode instanceof Element) {
      switch (domNode.name) {
        case 'a':
          return (
            <PrimaryLink href={domNode.attribs.href}>
              {domToReact(domNode.children as DOMNode[], parserOptions)}
            </PrimaryLink>
          );
      }
    }
  },
};

export default function Content({ html }: { html: string }) {
  return (
    <div className="w-prose html my-8 border-y border-gray-900/5 pt-8">
      {parse(sanitizeHtml(html), parserOptions)}
    </div>
  );
}
