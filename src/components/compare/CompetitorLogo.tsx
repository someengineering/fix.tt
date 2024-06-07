import AwsConfigLogo from '@/assets/compare/aws-config.svg';
import CartographyLogo from '@/assets/compare/cartography.svg';
import GoogleCloudAssetInventoryLogo from '@/assets/compare/google-cloud-asset-inventory.svg';
import SteampipeLogo from '@/assets/compare/steampipe.svg';
import WizLogo from '@/assets/compare/wiz.svg';

const logos: {
  [slug: string]: (
    props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
  ) => JSX.Element;
} = {
  'aws-config': (props) => <AwsConfigLogo {...props} />,
  cartography: (props) => <CartographyLogo {...props} />,
  'google-cloud-asset-inventory': (props) => (
    <GoogleCloudAssetInventoryLogo {...props} />
  ),
  steampipe: (props) => <SteampipeLogo {...props} />,
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
