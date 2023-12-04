import GithubSlugger from 'github-slugger';
import { LuCheck } from 'react-icons/lu';

import ButtonLink from '@/components/common/links/ButtonLink';
import PrimaryLink from '@/components/common/links/PrimaryLink';

const tiers: {
  name: string;
  href: string;
  cta: string;
  price: string | { monthly: string; annually?: string };
  description: string;
  targetCustomer: string;
  scanFrequency: string;
  features: string[];
}[] = [
  {
    name: 'Free',
    href: '#',
    cta: 'Get started',
    price: '$0',
    description: 'Single-account security overview on a monthly basis.',
    targetCustomer:
      'Perfect for individual use or small-scale proof-of-concept trials.',
    scanFrequency: 'Monthly',
    features: [
      'Basic asset inventory',
      'Compliance scans',
      'Account risk score',
      'Fix recommendations',
      'Monthly email report',
    ],
  },
  {
    name: 'Foundational',
    href: '#',
    cta: 'Get started',
    price: { monthly: '$5' },
    description: 'Daily scans for secure, compliant operations.',
    targetCustomer:
      'Ideal for growing businesses that need a robust security baseline.',
    scanFrequency: 'Daily',
    features: [
      'Alerting integrations (Slack, PagerDuty, Discord)',
      'Graph visualization',
      'Inventory search',
      'CSV data export',
    ],
  },
  {
    name: 'High Security',
    href: '#',
    cta: 'Get started',
    price: { monthly: '$50' },
    description: 'Hourly scans for critical, fast-paced environments.',
    targetCustomer:
      'Advanced integration for top-tier security needs and IaC support.',
    scanFrequency: 'Hourly',
    features: [
      'Alerting integrations with custom HTTP webhooks',
      'Automatic inventory exports (AWS S3)',
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
            className="mb-3 text-lg font-semibold uppercase leading-7 text-marian-blue-800 sm:text-xl"
            id="pricing"
          >
            Pricing
          </h2>
          <p className="mx-auto mt-2 max-w-prose text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Start for free, upgrade as you grow.
          </p>
        </div>
        <div className="relative mx-auto max-w-prose text-balance text-lg leading-8 text-gray-600">
          <p className="mt-6">
            Fix pricing is based on the number of cloud accounts you scan. There
            is no minimum commitment, and you can even start scanning a single
            cloud account for free.
          </p>
          {/* <p className="mt-6">
            Use your existing budget to pay for Fix, with convenient billing
            through AWS Marketplace:
          </p>
          <p className="mt-3">&lt;AWS Marketplace logo here&gt;</p> */}
        </div>
        <div className="my-20 flow-root">
          <div className="isolate mx-auto -mt-16 grid max-w-sm grid-cols-1 items-stretch gap-y-16 divide-y divide-gray-100 text-left lg:-mx-8 lg:mt-0 lg:max-w-none lg:grid-cols-3 lg:divide-x lg:divide-y-0 xl:-mx-4">
            {tiers.map((tier, index) => (
              <div
                key={`tier-${slugger.slug(tier.name)}`}
                className="flex flex-col pt-16 lg:px-8 lg:pt-0 xl:px-14 "
              >
                <h3
                  id={`tier-${slugger.slug(tier.name)}`}
                  className="text-2xl font-semibold leading-7 text-marian-blue-900"
                >
                  {tier.name}
                </h3>
                <p className="mt-6 text-base leading-6 text-gray-900">
                  <span className="font-bold">{tier.description}</span>{' '}
                  {tier.targetCustomer}
                </p>
                <p className="my-9 flex items-baseline gap-x-1 border-b border-gray-900/10 pb-9">
                  {typeof tier.price === 'string' ? (
                    <>
                      <span className="text-5xl font-bold tracking-tight text-gray-900">
                        {tier.price}
                      </span>
                      <span className="ml-1.5 text-sm font-semibold leading-6 text-gray-600">
                        one cloud account included*
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-5xl font-bold tracking-tight text-gray-900">
                        {tier.price.monthly}
                      </span>
                      <span className="text-sm font-semibold leading-6 text-gray-600">
                        / cloud account per month*
                      </span>
                    </>
                  )}
                </p>
                <p className="text-base font-semibold leading-6 text-gray-900">
                  Scan frequency
                </p>
                <p className="mt-1.5 text-base leading-6 text-gray-600">
                  {tier.scanFrequency}
                </p>
                <p className="mt-6 text-base font-semibold leading-6 text-gray-900">
                  {index === 0
                    ? `${tier.name} features:`
                    : `All ${tiers[index - 1].name} features, plus:`}
                </p>
                <ul
                  role="list"
                  className="mt-1.5 grow space-y-1.5 text-sm leading-6 text-gray-600"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <LuCheck
                        className="h-6 w-6 flex-none text-cornflower-blue-500"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <ButtonLink href={tier.href} className="mt-9 block text-center">
                  {tier.cta}
                </ButtonLink>
              </div>
            ))}
          </div>
        </div>
        <p className="mx-auto my-20 max-w-prose space-y-2 text-base leading-7 text-gray-600">
          * Our fair-use policy allows for up to 200,000 resources per account.
          If your needs surpass this amount, please{' '}
          <PrimaryLink href="mailto:hi@fix.tt">reach out</PrimaryLink> to
          discuss your specific requirements.
        </p>
        <div className="flex flex-col items-start gap-x-8 gap-y-6 rounded-3xl p-8 ring-1 ring-gray-900/10 sm:gap-y-10 sm:p-10 lg:col-span-2 lg:flex-row lg:items-center">
          <div className="text-left lg:min-w-0 lg:flex-1">
            <h3 className="text-2xl font-semibold leading-8 tracking-tight text-marian-blue-900">
              Enterprise (Custom)
            </h3>
            <p className="mt-6 max-w-prose text-base leading-7 text-gray-600">
              <span className="font-semibold">
                Custom deployments in your own infrastructure (on-premises or in
                the cloud).
              </span>{' '}
              Best for government agencies and companies in regulated
              industries.
            </p>
            <p className="mt-6 max-w-prose text-base leading-7 text-gray-600">
              With the Enterprise tier, you can tailor Fix exactly to your
              requirements. You will work with a dedicated solution architect
              and security engineer to integrate Fix into your toolchain,
              workflows, and security protocols.
            </p>
          </div>
          <ButtonLink
            href="mailto:hi@fix.tt"
            variant="outline"
            className="inline"
          >
            Talk to an expert <span aria-hidden="true">&rarr;</span>
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
