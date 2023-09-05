'use client';

import { Disclosure } from '@headlessui/react';
import { InlineWidget } from 'react-calendly';
import { LuBug, LuCheck, LuListChecks, LuShuffle } from 'react-icons/lu';

import ButtonLink from '@/components/links/ButtonLink';

import { siteConfig } from '@/constant/config';

// const navigation = [
//   { name: 'Product', href: '#' },
//   { name: 'Pricing', href: '#' },
//   { name: 'Resources', href: '#' },
//   { name: 'About Us', href: '#' },
// ];

const features: {
  name: string | JSX.Element;
  description: JSX.Element;
  icon: (
    props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
  ) => JSX.Element;
}[] = [
  {
    name: <abbr title="Cloud Security and Posture Management">CSPM</abbr>,
    description: (
      <>
        Monitor <abbr title="Center for Internet Security">CIS</abbr>{' '}
        benchmarks, run compliance scans, and enforce policies. Build security
        intelligence on top of your inventory to stay in control and escalate
        critical risks.
      </>
    ),
    icon: (props) => <LuListChecks {...props} />,
  },
  {
    name: 'Inventory',
    description: (
      <>
        Get a complete picture of your cloud and see what is running with visual
        maps. Fix discovers assets and collects rich configuration data for
        resources, no matter where, when, or how they were provisioned.
      </>
    ),
    icon: (props) => <LuBug {...props} />,
  },
  {
    name: 'Remediation',
    description: (
      <>
        Fix integrates with your workflow, ticketing, and messaging tools. Set
        up alerts and automations for policy violations to make it easy for your
        engineers to keep infrastructure updated and tidy.
      </>
    ),
    icon: (props) => <LuShuffle {...props} />,
  },
];

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

export default function HomePage() {
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto max-w-3xl py-16 sm:py-24 lg:py-28">
          <div className="text-center">
            <h1 className="balanced text-4xl font-bold tracking-tight text-primary-900 sm:text-6xl">
              {siteConfig.tagline}
            </h1>
            <p className="balanced mt-6 text-lg leading-8 text-gray-600">
              {siteConfig.description}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <ButtonLink href="#request-early-access" variant="tangerine">
                Request early access
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary-50 py-24 sm:py-32" id="why">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="mb-3 text-xl font-semibold uppercase leading-7 text-primary-900">
              Why Fix?
            </h2>
            <p className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Detect, prioritize, and remediate critical cloud risks.
            </p>
            <div className="text-lg leading-8 text-gray-600">
              <p className="mt-6">
                <strong>
                  Fix connects to cloud APIs to take full snapshots of your
                  cloud infrastructure and technology stack.
                </strong>{' '}
                You get a baseline inventory with a complete view of accounts,
                instances, functions, Kubernetes pods, databases, storage
                buckets, and all other resources and their configurations in a
                single place.
              </p>
              <p className="mt-6">
                The Fix Security Graph also shows relationships between
                resources, providing the context to understand critical risks
                and attack paths&mdash;so you can prioritize and fix the
                misconfigurations and vulnerabilities that matter.
              </p>
            </div>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={`feature-${index}`} className="flex flex-col">
                  <dt className="text-lg font-semibold leading-7 text-gray-900">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-jade-600">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <div className="isolate py-24 sm:py-32" id="pricing">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-3 text-xl font-semibold uppercase leading-7 text-primary-900">
              Pricing
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Build securely in the cloud without overspending.
            </p>
          </div>
          <div className="relative mx-auto max-w-2xl text-lg leading-8 text-gray-600">
            <p className="mt-6">
              Fix charges a fee per connected cloud account. Usage-based pricing
              means you only pay for the cloud accounts you actually use and
              need to keep secure.
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
      <div className="bg-primary-900 py-24 sm:py-32" id="request-early-access">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Request early access.
          </h2>
          <div className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-200">
            Schedule a call to get a demo and see Fix in action. Talk directly
            to our founders&mdash;no{' '}
            <abbr title="business development representative">BDR</abbr>s, no
            sales reps.
          </div>
          <Disclosure as="dl" className="mt-10">
            <Disclosure.Button
              as="dt"
              className="cursor-pointer text-base font-semibold leading-7 text-primary-50 underline transition hover:text-white motion-reduce:transition-none motion-reduce:hover:transform-none"
            >
              Why request early access?
            </Disclosure.Button>
            <Disclosure.Panel
              as="dd"
              unmount={false}
              className="space-y-2 pt-2 text-base leading-7 text-primary-100"
            >
              <p>
                <strong>Cloud security requires trust.</strong> That&rsquo;s why
                we establish a personal connection to determine if Fix can help.
                We work with early access partners to:
              </p>
              <ul role="list" className="space-y-1 text-sm leading-6">
                {[
                  'Understand security requirements.',
                  'Establish a security baseline.',
                  'Automate security operations.',
                ].map((goal) => (
                  <li
                    key={goal}
                    className="flex items-center justify-center gap-x-2"
                  >
                    <LuCheck className="h-4 w-4 flex-none" aria-hidden="true" />
                    {goal}
                  </li>
                ))}
              </ul>
            </Disclosure.Panel>
          </Disclosure>
        </div>
        <div className="mt-10 flex h-[72rem] items-center justify-center px-6 sm:h-[76rem] md:mt-0 md:px-0 lg:h-[44rem]">
          <InlineWidget
            url="https://calendly.com/larskamp/fix-early-access"
            pageSettings={{
              primaryColor: 'f78400',
            }}
            styles={{
              flexGrow: 1,
              height: '100%',
              width: '100%',
              minWidth: '320px',
            }}
          />
        </div>
      </div>
    </>
  );
}
