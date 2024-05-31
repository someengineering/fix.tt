import WizLogo from '@/assets/compare/wiz.svg';

const logos: {
  slug: string;
  svg: (
    props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
  ) => JSX.Element;
}[] = [
  {
    slug: 'wiz',
    svg: (props) => <WizLogo {...props} />,
  },
];

export const hasLogo = (slug: string) =>
  logos.some((logo) => logo.slug === slug);

export default function CompetitorLogo({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  return logos.find((logo) => logo.slug === slug)?.svg({ className });
}
