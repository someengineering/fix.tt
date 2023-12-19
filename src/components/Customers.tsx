import Image, { StaticImageData } from 'next/image';

import AppleLogo from '@/assets/customers/apple.svg';
import ArangoDbLogo from '@/assets/customers/arangodb.svg';
import cloudzoneLogo from '@/assets/customers/cloudzone.png';
import DeloitteLogo from '@/assets/customers/deloitte.svg';
import KavakLogo from '@/assets/customers/kavak.svg';
import PaloAltoNetworksLogo from '@/assets/customers/palo-alto-networks.svg';
import WellsFargoLogo from '@/assets/customers/wells-fargo.svg';

const customers: {
  name: string;
  logo:
    | ((
        props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
      ) => JSX.Element)
    | StaticImageData;
}[] = [
  {
    name: 'CloudZone',
    logo: cloudzoneLogo,
  },
  {
    name: 'Apple',
    logo: (props) => <AppleLogo {...props} />,
  },
  {
    name: 'Deloitte',
    logo: (props) => <DeloitteLogo {...props} />,
  },
  {
    name: 'ArangoDB',
    logo: (props) => <ArangoDbLogo {...props} />,
  },
  {
    name: 'Wells Fargo',
    logo: (props) => <WellsFargoLogo {...props} />,
  },
  {
    name: 'Kavak',
    logo: (props) => <KavakLogo {...props} />,
  },
  {
    name: 'Palo Alto Networks',
    logo: (props) => <PaloAltoNetworksLogo {...props} />,
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
        <div className="mt-10 inline-flex w-full flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
          <div className="flex animate-scroll-x items-center justify-center space-x-20">
            {customers.map((customer, index) => (
              <>
                <span className="sr-only">{customer.name}</span>
                {typeof customer.logo === 'object' ? (
                  <Image
                    src={customer.logo}
                    key={`customer-${index}`}
                    className="h-12 w-auto"
                    alt=""
                  />
                ) : (
                  <customer.logo
                    key={`customer-${index}`}
                    className="h-12"
                    aria-hidden="true"
                  />
                )}
              </>
            ))}
          </div>
          <div
            className="flex animate-scroll-x items-center justify-center space-x-20"
            aria-hidden="true"
          >
            {customers.map((customer, index) =>
              typeof customer.logo === 'object' ? (
                <Image
                  src={customer.logo}
                  key={`customer-2-${index}`}
                  className="h-12 w-auto"
                  alt=""
                />
              ) : (
                <customer.logo key={`customer-2-${index}`} className="h-12" />
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
