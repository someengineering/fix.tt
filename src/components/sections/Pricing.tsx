'use client';

import GithubSlugger from 'github-slugger';
import { usePathname } from 'next/navigation';
import {
  LuArmchair,
  LuBuilding,
  LuCheck,
  LuPencilRuler,
  LuPersonStanding,
} from 'react-icons/lu';

import ButtonLink from '@/components/common/links/ButtonLink';
import UnstyledLink from '@/components/common/links/UnstyledLink';
import { siteConfig } from '@/constants/config';
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
  features: string[];
  support: string[];
  mostPopular?: boolean;
}[] = [
  {
    name: 'Free',
    href: siteConfig.registerUrl,
    icon: (props) => <LuPersonStanding {...props} />,
    cta: 'Get started',
    price: '$0',
    description: 'Start your cloud compliance journey.',
    cloudAccounts: { maximum: 1 },
    scanFrequency: 'Monthly',
    features: ['Cloud Inventory', 'Compliance Benchmarks'],
    support: ['Community support'],
  },
  {
    name: 'Business',
    href: 'https://app.fix.security/workspace-settings/billing-receipts?tier=Business',
    icon: (props) => <LuBuilding {...props} />,
    cta: 'Get started',
    price: { monthly: '$400' },
    description: 'Automate cloud infrastructure security.',
    cloudAccounts: { included: 10, additionalCost: 40 },
    scanFrequency: 'Hourly',
    features: [
      'Audit History',
      'Alerting Integrations',
      'Data Export',
      'Custom Integrations',
    ],
    support: [
      'Product support via email and live chat, and video calls',
      'Optional professional services',
    ],
    mostPopular: true,
  },
];

export default function Pricing() {
  const pathname = usePathname();
  const slugger = new GithubSlugger();

  const Heading: keyof JSX.IntrinsicElements =
    pathname === '/pricing' ? 'h1' : 'h2';

  return (
    <section
      className="py-16 sm:py-24"
      id={pathname === 'pricing' ? undefined : 'pricing'}
    >
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Heading className="mb-3 text-lg font-bold uppercase text-gray-600 sm:text-xl">
            Pricing
          </Heading>
          <p className="mx-auto max-w-prose text-balance text-4xl font-extrabold sm:text-5xl">
            Foundational AWS security for your whole company.{' '}
            <span className="text-cornflower-blue-600">
              Free for engineers to try.
            </span>
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-prose text-balance text-lg font-semibold text-gray-900 sm:text-xl">
          Fix Security pricing scales on a per-cloud-account basis. We offer a
          free tier and two-week trials.
        </p>
        <div className="mt-20 flow-root">
          <div className="mx-auto mt-10 grid max-w-md grid-cols-1 items-stretch gap-8 text-left md:max-w-3xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
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
                    <span className="inline-flex items-center whitespace-nowrap rounded-md bg-marian-blue-50 px-2 py-1 text-xs xl:hidden">
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
                <div className="gap-y-2 text-base">
                  <p>{tier.scanFrequency} scans</p>
                </div>
                <p className="mt-6 text-base font-semibold text-gray-900">
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
                <p className="mt-6 text-base font-semibold text-gray-900">
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
        <div className="mx-auto mt-10 grid max-w-md grid-cols-1 items-stretch gap-8 text-left md:max-w-2xl lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-2">
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
            <p className="text-base text-gray-600">
              Add additional seats to any paid plan.
            </p>
          </div>
          <div className="flex flex-col rounded-2xl p-8 ring-1 ring-gray-200">
            <h3 className="flex items-center gap-3 text-3xl font-bold leading-7 text-cornflower-blue-600">
              <LuPencilRuler />
              Custom plans
            </h3>
            <p className="my-8 text-xl font-semibold leading-8 text-gray-600">
              <UnstyledLink href="mailto:info@fix.security">
                Schedule a call with us &rarr;
              </UnstyledLink>
            </p>
            <p className="text-base text-gray-600">
              Need more seats, support for custom data sources, or private
              deployment options?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
