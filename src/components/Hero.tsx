import ButtonLink from '@/components/common/links/ButtonLink';

import ProcessDiagram from '@/assets/diagrams/process.svg';
import { siteConfig } from '@/constants/config';

export default function Hero() {
  return (
    <section className="isolate py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 text-center lg:flex lg:items-center lg:gap-x-6 lg:px-8 lg:text-left">
        <div className="mx-auto pb-10 lg:p-0">
          <div className="mb-3 text-lg font-bold uppercase leading-7 text-gray-500 sm:text-xl">
            For cloud security engineers
          </div>
          <h1 className="max-w-prose text-balance font-display text-4xl font-medium uppercase text-marian-blue-900 sm:text-5xl lg:text-pretty">
            The{' '}
            <span className="font-semibold text-cornflower-blue-500">
              asset inventory
            </span>{' '}
            for your AWS security posture.
          </h1>
          <p className="mx-auto mt-6 max-w-prose text-balance text-lg font-semibold text-gray-900 sm:text-xl lg:text-pretty">
            {siteConfig.description}
          </p>
          <ul className="mx-auto mt-2 max-w-prose list-inside list-disc text-balance lg:ml-4 lg:list-outside lg:text-pretty">
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
        <ProcessDiagram className="mx-auto w-full max-w-2xl flex-shrink-0 lg:w-7/12" />
      </div>
    </section>
  );
}
