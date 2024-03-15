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
  cloudAccounts: { maximum?: number; minimum?: number };
  scanFrequency: string;
  seats: { included?: number; maximum?: number };
  features: string[];
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
  },
  {
    name: 'Plus',
    href: 'https://app.fix.security/workspace-settings/billing-receipts?tier=Plus',
    icon: (props) => <LuWarehouse {...props} />,
    cta: 'Get started',
    price: { monthly: '$30' },
    description:
      'For growing teams looking to stay secure as they build out infrastructure.',
    cloudAccounts: { minimum: 3 },
    scanFrequency: 'Daily',
    seats: { included: 2, maximum: 20 },
    features: [
      '3-month history',
      'Email alerts',
      'Weekly email report',
      'Data export (CSV, JSON, PDF)',
    ],
  },
  {
    name: 'Business',
    href: 'https://app.fix.security/workspace-settings/billing-receipts?tier=Business',
    icon: (props) => <LuBuilding {...props} />,
    cta: 'Get started',
    price: { monthly: '$40' },
    description:
      'For engineering teams looking to automate their cloud infrastructure security.',
    cloudAccounts: { minimum: 10 },
    scanFrequency: 'Hourly',
    seats: { included: 5, maximum: 50 },
    features: [
      '6-month history',
      'Custom policies (coming soon!)',
      'Alerting integrations (PD, Slack, Discord, Teams)',
      'Task management integrations (coming soon!)',
    ],
    mostPopular: true,
  },
  {
    name: 'Enterprise',
    href: 'https://app.fix.security/workspace-settings/billing-receipts?tier=Enterprise',
    icon: (props) => <LuBuilding2 {...props} />,
    cta: 'Get started',
    price: { monthly: '$50' },
    description:
      'For dedicated security teams looking to built an integrated security toolchain.',
    cloudAccounts: { minimum: 25 },
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
  },
];

export default function Pricing() {
  const slugger = new GithubSlugger();

  return (
    <section className="isolate py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2
            className="mb-3 text-lg font-bold uppercase leading-7 text-gray-500 sm:text-xl"
            id="pricing"
          >
            Pricing
          </h2>
          <p className="mx-auto max-w-prose text-balance font-display text-4xl font-medium uppercase text-marian-blue-900 sm:text-5xl">
            Foundational AWS security for your whole company.{' '}
            <span className="font-semibold text-cornflower-blue-500">
              Free for engineers to try.
            </span>
          </p>
        </div>
        <p className="relative mx-auto mt-6 max-w-prose text-balance text-lg font-semibold text-gray-900 sm:text-xl">
          Fix pricing scales on a per-cloud-account basis, with an add-on to buy
          more seats for your team. We offer a free tier and two-week trials.
        </p>
        <div className="mt-20 flow-root">
          <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 items-stretch gap-8 text-left md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
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
                  className="flex items-center gap-3 font-display text-3xl font-medium uppercase text-marian-blue-900"
                >
                  <tier.icon />
                  {tier.name}
                  {tier.mostPopular ? (
                    <span className="inline-flex items-center whitespace-nowrap rounded-md bg-marian-blue-50 px-2 py-1 font-sans text-xs font-semibold normal-case text-marian-blue-900 xl:hidden">
                      Most popular
                    </span>
                  ) : null}
                </h3>
                <p className="mt-6 text-base font-medium leading-6 text-gray-900">
                  {tier.description}
                </p>
                <div className="my-8 border-b border-gray-900/10 pb-8">
                  <p className="flex items-baseline gap-x-1 xl:flex-col">
                    {typeof tier.price === 'string' ? (
                      <>
                        <span className="font-display text-3xl font-medium uppercase tracking-tight text-gray-900">
                          {tier.price}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-3xl font-bold tracking-tight text-gray-900">
                          {tier.price.monthly}
                        </span>
                        <span className="ml-1 text-sm font-semibold leading-6 text-gray-900 xl:ml-0 xl:mt-0.5">
                          per cloud account, per month
                        </span>
                      </>
                    )}
                  </p>
                  <p
                    className={cn(
                      typeof tier.price === 'string'
                        ? 'mt-0.5 xl:mb-6'
                        : 'xl:mt-0.5',
                      'text-sm text-gray-500',
                    )}
                  >
                    (
                    {tier.cloudAccounts.maximum
                      ? `maximum of ${tier.cloudAccounts.maximum} cloud account`
                      : `minimum of ${tier.cloudAccounts.minimum} cloud accounts`}
                    )
                  </p>
                </div>
                <div className="gap-y-2 text-base leading-6 text-gray-600">
                  <p>{tier.scanFrequency} scans</p>
                  <p>
                    {tier.seats.included
                      ? `${tier.seats.included} seats included${tier.seats.maximum ? ` (${tier.seats.maximum} max)` : ''}`
                      : `${tier.seats.maximum} seat${tier.seats.maximum === 1 ? '' : 's'} max`}
                  </p>
                </div>
                <p className="mt-6 text-base font-semibold leading-6 text-gray-900">
                  {index === 0
                    ? 'Features:'
                    : `Everything in ${tiers[index - 1].name}, and:`}
                </p>
                <ul
                  role="list"
                  className="mt-1.5 grow space-y-1.5 text-sm leading-6 text-gray-600"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-2">
                      <LuCheck
                        className="my-0.5 h-5 w-5 flex-none text-cornflower-blue-500"
                        aria-hidden="true"
                      />
                      {feature}
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
              <h3 className="flex items-center gap-3 text-3xl font-semibold leading-7 text-marian-blue-900">
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
              <h3 className="flex items-center gap-3 text-3xl font-semibold leading-7 text-marian-blue-900">
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
