import ButtonLink from '@/components/common/links/ButtonLink';

import ProcessDiagram from '@/assets/diagrams/process.svg';
import { siteConfig } from '@/constants/config';

export default function Hero() {
  return (
    <section className="isolate py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8 xl:flex xl:items-center xl:gap-x-6 xl:text-left">
        <div className="mx-auto pb-10 xl:p-0">
          <div
            className="mb-3 text-lg font-bold uppercase leading-7 text-gray-500 sm:text-xl"
            id="pricing"
          >
            For cloud security engineers
          </div>
          <h1 className="text-balance font-display text-5xl font-medium uppercase text-marian-blue-900 sm:text-6xl">
            The{' '}
            <span className="font-semibold text-cornflower-blue-500">
              asset inventory
            </span>{' '}
            for your AWS security posture.
          </h1>
          <p className="mt-6 text-balance text-lg font-semibold text-gray-900 sm:text-xl">
            {siteConfig.description}
          </p>
          <ul className="mt-2 list-inside list-disc">
            <li>Understand your cloud resources and configurations.</li>
            <li>
              Get notified of policy violations in Slack, Discord, or Teams.
            </li>
            <li>Address risks with remediation suggestions.</li>
          </ul>
          <div className="mt-10 space-x-5">
            <ButtonLink
              href="https://app.global.fixcloud.io/auth/register"
              size="lg"
            >
              Start for free
            </ButtonLink>
          </div>
        </div>
        <ProcessDiagram className="mx-auto w-full max-w-2xl flex-shrink-0 xl:w-7/12" />
      </div>
    </section>
  );
}
