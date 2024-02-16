import ArangoDBLogo from '@/assets/customers/arangodb.svg';
import BloomreachLogo from '@/assets/customers/bloomreach.svg';
import BricomanLogo from '@/assets/customers/bricoman.svg';
import DevoteamLogo from '@/assets/customers/devoteam.svg';
import HadrianLogo from '@/assets/customers/hadrian.svg';
import WingbackLogo from '@/assets/customers/wingback.svg';

const customers: {
  name: string;
  logo: (
    props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
  ) => JSX.Element;
}[] = [
  {
    name: 'Devoteam',
    logo: (props) => <DevoteamLogo {...props} />,
  },
  {
    name: 'ArangoDB',
    logo: (props) => <ArangoDBLogo {...props} />,
  },
  {
    name: 'Wingback',
    logo: (props) => <WingbackLogo {...props} />,
  },
  {
    name: 'Hadrian',
    logo: (props) => <HadrianLogo {...props} />,
  },
  {
    name: 'Bloomreach',
    logo: (props) => <BloomreachLogo {...props} />,
  },
  {
    name: 'Bricoman',
    logo: (props) => <BricomanLogo {...props} />,
  },
];

export default function Customers() {
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2
          className="text-center text-xl font-bold leading-8 text-gray-900"
          id="customers"
        >
          Trusted by security engineers at:
        </h2>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-8 text-gray-500 lg:mt-4 lg:justify-between lg:gap-x-0">
          {customers.map((customer, index) => (
            <div key={`customer-${index}`}>
              <span className="sr-only">{customer.name}</span>
              <customer.logo
                className="h-14 max-w-[8rem] lg:h-16 lg:max-w-[9rem]"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
