import parse, { DOMNode, domToReact, Element } from 'html-react-parser';

import PrimaryLink from '@/components/common/links/PrimaryLink';

import { sanitizeHtml } from '@/utils/transistor';

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

export default function Content({
  audioUrl,
  htmlDescription,
}: {
  audioUrl: string;
  htmlDescription: string;
}) {
  return (
    <div className="w-prose html my-8 border-y border-gray-900/5 py-8">
      <audio controls src={audioUrl} className="mb-8 w-full" />
      {parse(sanitizeHtml(htmlDescription), parserOptions)}
    </div>
  );
}
