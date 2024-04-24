import BloomreachLogo from '@/assets/customers/bloomreach.svg';
import DespegarLogo from '@/assets/customers/despegar.svg';
import ElectronicArtsLogo from '@/assets/customers/electronic-arts.svg';
import KelloggsLogo from '@/assets/customers/kelloggs.svg';
import MarsLogo from '@/assets/customers/mars.svg';
import PayplugLogo from '@/assets/customers/payplug.svg';

const customers: {
  name: string;
  logo: (
    props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
  ) => JSX.Element;
}[] = [
  {
    name: 'Mars',
    logo: (props) => <MarsLogo {...props} />,
  },
  {
    name: 'Kellogg’s',
    logo: (props) => <KelloggsLogo {...props} />,
  },
  {
    name: 'Electronic Arts',
    logo: (props) => <ElectronicArtsLogo {...props} />,
  },
  {
    name: 'Despegar',
    logo: (props) => <DespegarLogo {...props} />,
  },
  {
    name: 'Payplug',
    logo: (props) => <PayplugLogo {...props} />,
  },
  {
    name: 'Bloomreach',
    logo: (props) => <BloomreachLogo {...props} />,
  },
];

export default function Customers() {
  return (
    <div className="bg-gray-50 py-16 sm:py-24" id="customers">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-balance text-center text-2xl font-bold leading-8 text-gray-900">
          Security engineers at startups and Fortune 500 companies use Fix:
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 lg:mt-10 lg:justify-between lg:gap-x-0">
          {customers.map((customer, index) => (
            <div key={`customer-${index}`}>
              <span className="sr-only">{customer.name}</span>
              <customer.logo
                className="h-8 max-w-[8rem] lg:h-10 lg:max-w-[10rem]"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
