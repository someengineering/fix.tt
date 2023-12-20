import ArangoDBLogo from '@/assets/customers/arangodb.svg';
import BloomreachLogo from '@/assets/customers/bloomreach.svg';
import BricomanLogo from '@/assets/customers/bricoman.svg';
import CosantaLogo from '@/assets/customers/cosanta.svg';
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
    name: 'Cosanta',
    logo: (props) => <CosantaLogo {...props} />,
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
          className="text-center text-xl font-semibold leading-8 text-gray-900"
          id="customers"
        >
          Built on our popular open-source product Resoto and trusted by:
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center space-x-12 text-gray-900 lg:space-x-14">
          {customers.map((customer, index) => (
            <>
              <span className="sr-only">{customer.name}</span>
              <customer.logo
                key={`customer-${index}`}
                className="h-16 max-w-[10rem] lg:h-20 lg:max-w-[12rem]"
                aria-hidden="true"
              />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
