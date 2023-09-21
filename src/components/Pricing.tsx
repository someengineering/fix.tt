import { LuCheck } from 'react-icons/lu';

import ButtonLink from '@/components/links/ButtonLink';

const tiers: {
  name: string;
  id: string;
  href: string;
  price: string | { monthly: string; annually?: string };
  description: string;
  features: string[];
}[] = [
  {
    name: 'Starter',
    id: 'tier-starter',
    href: '#request-early-access',
    price: 'Free',
    description:
      'For solo engineers who want to perform security checks on a single cloud account.',
    features: [
      'Monthly scans of up to 200K resources',
      'Compliance checks',
      'Issue tracking',
      'Email reports',
    ],
  },
  {
    name: 'Cloud',
    id: 'tier-cloud',
    href: '#request-early-access',
    price: { monthly: '$5' },
    description:
      'For security teams who want to harden multiple cloud accounts.',
    features: [
      'Everything in Starter',
      'Daily scans of up to 200K resources per account',
      'Additional scans priced at $0.10 per account per scan',
    ],
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '#request-early-access',
    price: 'Custom',
    description:
      'For security teams in regulated industries who need on-prem deployment.',
    features: [
      'Everything in Cloud',
      'Custom scan frequency',
      'Deploy Fix to your VPC',
      'Workflow integrations (ticketing, chat, etc.)',
      'Dedicated onboarding support',
    ],
  },
];

export default function Pricing() {
  return (
    <div className="isolate py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2
            className="mb-3 text-xl font-semibold uppercase leading-7 text-primary-900"
            id="pricing"
          >
            Pricing
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Build securely in the cloud without overspending.
          </p>
        </div>
        <div className="relative mx-auto max-w-2xl text-lg leading-8 text-gray-600">
          <p className="mt-6">
            Fix charges a fee per connected cloud account. Usage-based pricing
            means you only pay for the cloud accounts you actually use and need
            to keep secure.
          </p>
          <p className="mt-6">
            There are no minimum commitments, and you can even start scanning a
            single cloud account for free.
          </p>
        </div>
        <div className="mt-20 flow-root">
          <div className="isolate -mt-16 grid max-w-sm grid-cols-1 gap-y-16 divide-y divide-gray-100 text-left sm:mx-auto lg:-mx-8 lg:mt-0 lg:max-w-none lg:grid-cols-3 lg:divide-x lg:divide-y-0 xl:-mx-4">
            {tiers.map((tier) => (
              <div key={tier.id} className="pt-16 lg:px-8 lg:pt-0 xl:px-14">
                <h3
                  id={tier.id}
                  className="text-xl font-semibold leading-7 text-primary-900"
                >
                  {tier.name}
                </h3>
                <p className="mt-6 flex items-baseline gap-x-1">
                  {typeof tier.price === 'string' ? (
                    <span className="text-5xl font-bold tracking-tight text-gray-900">
                      {tier.price}
                    </span>
                  ) : (
                    <>
                      <span className="text-5xl font-bold tracking-tight text-gray-900">
                        {tier.price.monthly}
                      </span>
                      <span className="text-sm font-semibold leading-6 text-gray-600">
                        / cloud account per month
                      </span>
                    </>
                  )}
                </p>
                <ButtonLink
                  href="#request-early-access"
                  variant="tangerine"
                  className="mt-10 block text-center"
                >
                  Request early access
                </ButtonLink>
                <p className="mt-10 text-base font-semibold leading-6 text-gray-900">
                  {tier.description}
                </p>
                <ul
                  role="list"
                  className="mt-6 space-y-3 text-sm leading-6 text-gray-600"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <LuCheck
                        className="h-6 w-6 flex-none text-jade-600"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
