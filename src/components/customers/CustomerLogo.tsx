import ArangodbLogo from '@/assets/customers/arangodb.svg';
import DlthubLogo from '@/assets/customers/dlthub.svg';

const logos: {
  [slug: string]: (
    props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
  ) => JSX.Element;
} = {
  arangodb: (props) => <ArangodbLogo {...props} />,
  dlthub: (props) => <DlthubLogo {...props} />,
};

export const hasLogo = (slug: string) => slug in logos;

export default function CustomerLogo({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  return hasLogo(slug) ? logos[slug]({ className }) : null;
}
