import WizLogo from '@/assets/compare/wiz.svg';

const logos: {
  [slug: string]: (
    props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
  ) => JSX.Element;
} = {
  wiz: (props) => <WizLogo {...props} />,
};

export const hasLogo = (slug: string) => slug in logos;

export default function CompetitorLogo({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  return logos[slug]({ className });
}
