import GithubSlugger from 'github-slugger';
import {
  LuArmchair,
  LuBuilding,
  LuBuilding2,
  LuCheck,
  LuPencilRuler,
  LuPersonStanding,
  LuWarehouse,
} from 'react-icons/lu';

import ButtonLink from '@/components/common/links/ButtonLink';
import UnstyledLink from '@/components/common/links/UnstyledLink';

import { cn } from '@/utils/css';

const tiers: {
  name: string;
  href: string;
  icon: (
    props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
  ) => JSX.Element;
  cta: string;
  price: string | { monthly: string; annually?: string };
  description: string;
  cloudAccounts:
    | { maximum: number }
    | {
        included: number;
        additionalCost: number;
      };
  scanFrequency: string;
  seats: { included?: number; maximum?: number };
  features: string[];
  support: string[];
  mostPopular?: boolean;
}[] = [
  {
    name: 'Free',
    href: 'https://app.fix.security/auth/register',
    icon: (props) => <LuPersonStanding {...props} />,
    cta: 'Get started',
    price: '$0',
    description:
      'For solo software engineers who want to secure a single cloud account.',
    cloudAccounts: { maximum: 1 },
    scanFrequency: 'Monthly',
    seats: { maximum: 1 },
    features: [
      '1-month history',
      'Asset inventory',
      'Inventory search',
      'Neighborhood view',
      'Security benchmarks',
      'Monthly email report',
      'Remediation recommendations',
      'Core CSPM scanning capabilities',
    ],
    support: ['Community support'],
  },
  {
    name: 'Plus',
    href: 'https://app.fix.security/workspace-settings/billing-receipts?tier=Plus',
    icon: (props) => <LuWarehouse {...props} />,
    cta: 'Get started',
    price: { monthly: '$90' },
    description:
      'For growing teams looking to stay secure as they build out infrastructure.',
    cloudAccounts: { included: 3, additionalCost: 30 },
    scanFrequency: 'Daily',
    seats: { included: 2, maximum: 20 },
    features: [
      '3-month history',
      'Email alerts',
      'Weekly email report',
      'Data export (CSV, JSON, PDF)',
    ],
    support: ['Product support via email'],
  },
  {
    name: 'Business',
    href: 'https://app.fix.security/workspace-settings/billing-receipts?tier=Business',
    icon: (props) => <LuBuilding {...props} />,
    cta: 'Get started',
    price: { monthly: '$400' },
    description:
      'For engineering teams looking to automate cloud infrastructure security.',
    cloudAccounts: { included: 10, additionalCost: 40 },
    scanFrequency: 'Hourly',
    seats: { included: 5, maximum: 50 },
    features: [
      '6-month history',
      'Custom policies (coming soon!)',
      'Alerting integrations (PD, Slack, Discord, Teams)',
      'Task management integrations (coming soon!)',
    ],
    support: ['Product support via email and live chat'],
    mostPopular: true,
  },
  {
    name: 'Enterprise',
    href: 'https://app.fix.security/workspace-settings/billing-receipts?tier=Enterprise',
    icon: (props) => <LuBuilding2 {...props} />,
    cta: 'Get started',
    price: { monthly: '$1250' },
    description:
      'For dedicated security teams looking to built an integrated security toolchain.',
    cloudAccounts: { included: 25, additionalCost: 50 },
    scanFrequency: 'Hourly',
    seats: { included: 20 },
    features: [
      '18-month history',
      'API access',
      'Custom alerting webhooks',
      'Single Sign on (coming soon!)',
      'Workspace analytics (coming soon!)',
      'Snowflake data export (coming soon!)	',
    ],
    support: [
      'Product support via email, live chat, and video call',
      'Integration advice for your specific cloud environment via video call',
      'Optional professional services',
    ],
  },
];

export default function Pricing() {
  const slugger = new GithubSlugger();

  return (
    <section className="isolate py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2
            className="mb-3 text-lg font-bold uppercase leading-7 text-gray-600 sm:text-xl"
            id="pricing"
          >
            Pricing
          </h2>
          <p className="mx-auto max-w-prose text-balance text-4xl font-extrabold sm:text-5xl">
            Foundational AWS security for your whole company.{' '}
            <span className="text-cornflower-blue-600">
              Free for engineers to try.
            </span>
          </p>
        </div>
        <p className="relative mx-auto mt-6 max-w-prose text-balance text-lg font-semibold text-gray-900 sm:text-xl">
          Fix pricing scales on a per-cloud-account basis, with an add-on to buy
          more seats for your team. We offer a free tier and two-week trials.
        </p>
        <div className="mt-20 flow-root">
          <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 items-stretch gap-8 text-left md:max-w-3xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
            {tiers.map((tier, index) => (
              <div
                key={`tier-${slugger.slug(tier.name)}`}
                className={cn(
                  tier.mostPopular
                    ? 'ring-2 ring-cornflower-blue-600'
                    : 'ring-1 ring-gray-200',
                  'flex flex-col rounded-2xl p-8',
                )}
              >
                <h3
                  id={`tier-${slugger.slug(tier.name)}`}
                  className="flex items-center gap-3 text-3xl font-bold text-cornflower-blue-600"
                >
                  <tier.icon />
                  {tier.name}
                  {tier.mostPopular ? (
                    <span className="inline-flex items-center whitespace-nowrap rounded-md bg-marian-blue-50 px-2 py-1 font-sans text-xs xl:hidden">
                      Most popular
                    </span>
                  ) : null}
                </h3>
                <p className="mt-6 text-base font-medium leading-6 text-gray-900 xl:min-h-[6rem]">
                  {tier.description}
                </p>
                <div className="my-8 border-b border-gray-900/10 pb-8 text-base">
                  <p className="flex items-baseline gap-x-1">
                    {typeof tier.price === 'string' ? (
                      <>
                        <span className="text-3xl font-medium tracking-tight text-gray-900">
                          {tier.price}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-3xl font-bold tracking-tight text-gray-900">
                          {tier.price.monthly}
                        </span>
                        <span className="ml-1 text-lg font-semibold leading-6 text-gray-900 xl:ml-0 xl:mt-0.5">
                          / month
                        </span>
                      </>
                    )}
                  </p>
                  {'maximum' in tier.cloudAccounts ? (
                    <p className="mt-0.5 md:mb-6 xl:mb-12">
                      maximum of {tier.cloudAccounts.maximum} cloud account
                    </p>
                  ) : (
                    <>
                      <p className="mt-0.5">
                        {tier.cloudAccounts.included} cloud accounts included
                      </p>
                      <p>
                        (${tier.cloudAccounts.additionalCost} / month per
                        additional account)
                      </p>
                    </>
                  )}
                </div>
                <div className="gap-y-2 text-base leading-6">
                  <p>{tier.scanFrequency} scans</p>
                  <p>
                    {tier.seats.included
                      ? `${tier.seats.included} seats included${tier.seats.maximum ? ` (${tier.seats.maximum} max)` : ''}`
                      : `${tier.seats.maximum} seat${tier.seats.maximum === 1 ? '' : 's'} maximum`}
                  </p>
                </div>
                <p className="mt-6 text-base font-semibold leading-6 text-gray-900">
                  {index === 0
                    ? 'Features:'
                    : `Everything in ${tiers[index - 1].name}, and:`}
                </p>
                <ul
                  role="list"
                  className={`mt-1.5 space-y-1.5 text-sm leading-6 text-gray-600 ${index < 2 ? 'md:min-h-[14.625rem]' : 'md:min-h-[10.875rem]'} xl:min-h-[17.625rem]`}
                >
                  {tier.features.map((feature, index) => (
                    <li
                      key={`feature-${slugger.slug(tier.name)}-${index}`}
                      className="flex gap-x-2"
                    >
                      <LuCheck
                        className="my-0.5 h-5 w-5 flex-none text-cornflower-blue-600"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-base font-semibold leading-6 text-gray-900">
                  Support:
                </p>
                <ul
                  role="list"
                  className="mt-1.5 grow space-y-1.5 text-sm leading-6 text-gray-600"
                >
                  {tier.support.map((option, index) => (
                    <li
                      key={`support-${slugger.slug(tier.name)}-${index}`}
                      className="flex gap-x-2"
                    >
                      <LuCheck
                        className="my-0.5 h-5 w-5 flex-none text-cornflower-blue-600"
                        aria-hidden="true"
                      />
                      {option}
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  href={tier.href}
                  variant={tier.mostPopular ? 'default' : 'outline'}
                  className="mt-9 block text-center"
                >
                  {tier.cta}
                </ButtonLink>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-20 mt-5 flow-root">
          <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 items-stretch gap-8 text-left md:max-w-2xl lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-2">
            <div className="flex flex-col rounded-2xl p-8 ring-1 ring-gray-200">
              <h3 className="flex items-center gap-3 text-3xl font-bold leading-7 text-cornflower-blue-600">
                <LuArmchair />
                Additional seats
              </h3>
              <p className="my-8 flex items-baseline gap-x-1">
                <span className="text-3xl font-bold tracking-tight text-gray-900">
                  $5
                </span>
                <span className="ml-1 text-sm font-semibold leading-6 text-gray-600">
                  per seat, per month
                </span>
              </p>
              <p className="text-base leading-6 text-gray-600">
                Add additional seats to any paid plan.
              </p>
            </div>
            <div className="flex flex-col rounded-2xl p-8 ring-1 ring-gray-200">
              <h3 className="flex items-center gap-3 text-3xl font-bold leading-7 text-cornflower-blue-600">
                <LuPencilRuler />
                Custom plans
              </h3>
              <p className="my-8 text-xl font-semibold leading-8 text-gray-600">
                <UnstyledLink href="mailto:hi@fix.security">
                  Schedule a call with us &rarr;
                </UnstyledLink>
              </p>
              <p className="text-base leading-6 text-gray-600">
                Need more seats, support for custom data sources, or private
                deployment options?
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
