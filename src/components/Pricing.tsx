import { LuCheck } from 'react-icons/lu';

import ButtonLink from '@/components/links/ButtonLink';

const pricingTiers: {
  name: string;
  id: string;
  price: string;
  priceUnit?: string;
  description: string;
  features: (string | JSX.Element)[];
}[] = [
  {
    name: 'Cloud',
    id: 'tier-cloud',
    price: '$5',
    priceUnit: 'cloud account per month',
    description:
      'For security teams who want a hosted solution to take control of cloud misconfigurations.',
    features: [
      <>
        <abbr title="Cloud Security and Posture Management">CSPM</abbr> &amp;{' '}
        <abbr title="Kubernetes Security Posture Management">KSPM</abbr>
      </>,
      'Compliance checks',
      'Jira integrations',
      'PagerDuty integrations',
      'Chat integrations (Slack, Discord)',
    ],
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    price: 'Custom',
    description:
      'For security teams in regulated industries who need on-prem deployment and a full view of cloud assets and security posture.',
    features: [
      'Everything in Cloud',
      'Asset inventory',
      'Attack surface discovery',
      'Custom scan frequency',
      'Custom reports',
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
            There are no minimum commitments for the Cloud tier, and you can
            even self-host the open-source version for free.
          </p>
          <p className="mt-6">
            Our goal is to give everyone great cloud security, regardless of
            budget.
          </p>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 lg:mt-24 lg:px-8">
        <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10"
            >
              <div>
                <h3
                  id={tier.id}
                  className="text-xl font-semibold leading-7 text-primary-900"
                >
                  {tier.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    {tier.price}
                  </span>
                  {tier.priceUnit ? (
                    <span className="text-base font-semibold leading-7 text-gray-600">
                      / {tier.priceUnit}
                    </span>
                  ) : null}
                </div>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  {tier.description}
                </p>
              </div>
              <div>
                <ul
                  role="list"
                  className="mt-10 space-y-4 text-sm leading-6 text-gray-600"
                >
                  {tier.features.map((feature, index) => (
                    <li
                      key={`pricing-${tier}-${index}`}
                      className="flex gap-x-3"
                    >
                      <LuCheck
                        className="h-6 w-6 flex-none text-jade-600"
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  href="#request-early-access"
                  variant="tangerine"
                  className="mt-8 block text-center"
                >
                  Request early access
                </ButtonLink>
              </div>
            </div>
          ))}
          <div className="flex flex-col items-start gap-x-8 gap-y-6 rounded-3xl p-8 ring-1 ring-gray-900/10 sm:gap-y-10 sm:p-10 lg:col-span-2 lg:flex-row lg:items-center">
            <div className="lg:min-w-0 lg:flex-1">
              <h3 className="text-xl font-semibold leading-8 text-primary-900">
                Free Self-Hosted
              </h3>
              <p className="mt-1 text-base leading-7 text-gray-600">
                For software engineers and SREs who are also in charge of
                security.
              </p>
            </div>
            <ButtonLink
              href="#request-early-access"
              variant="outline"
              className="block"
            >
              Request early access <span aria-hidden="true">&rarr;</span>
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
