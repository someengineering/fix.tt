import AmperityLogo from '@/assets/customers/amperity.svg';
import AnzenLogo from '@/assets/customers/anzen.svg';
import ArangodbLogo from '@/assets/customers/arangodb.svg';
import CloudzoneLogo from '@/assets/customers/cloudzone.svg';
import DlthubLogo from '@/assets/customers/dlthub.svg';
import PaybackLogo from '@/assets/customers/payback.svg';

const customers: {
  name: string;
  logo: (
    props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
  ) => JSX.Element;
}[] = [
  {
    name: 'Anzen',
    logo: (props) => <AnzenLogo {...props} />,
  },
  {
    name: 'dltHub',
    logo: (props) => <DlthubLogo {...props} />,
  },
  {
    name: 'CloudZone',
    logo: (props) => <CloudzoneLogo {...props} />,
  },
  {
    name: 'Amperity',
    logo: (props) => <AmperityLogo {...props} />,
  },
  {
    name: 'Payback',
    logo: (props) => <PaybackLogo {...props} />,
  },
  {
    name: 'ArangoDB',
    logo: (props) => <ArangodbLogo {...props} />,
  },
];

export default function Customers() {
  return (
    <div className="bg-gray-50 py-16 sm:py-24" id="customers">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-balance text-center text-lg/8 font-semibold text-gray-900">
          Fix Security is used by startups and IT departments at large
          companies:
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 text-gray-500 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none">
          {customers.map((customer, index) => (
            <div key={`customer-${index}`} className="col-span-2 lg:col-span-1">
              <span className="sr-only">{customer.name}</span>
              <customer.logo
                className="max-h-7 w-full object-contain"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
