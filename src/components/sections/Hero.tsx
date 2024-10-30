import CspmDiagramMobile from '@/assets/diagrams/cspm-mobile.svg';
import CspmDiagram from '@/assets/diagrams/cspm.svg';
import ButtonLink from '@/components/common/links/ButtonLink';
import { siteConfig } from '@/constants/config';

export default function Hero() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 text-center lg:flex lg:items-center lg:gap-x-4 lg:px-8 lg:text-left">
        <div className="mx-auto pb-12 lg:p-0">
          <div className="mb-3 text-lg font-bold uppercase text-gray-600 sm:text-xl">
            For developers and security engineers
          </div>
          <h1 className="max-w-prose text-balance text-4xl font-extrabold sm:text-5xl lg:text-pretty">
            <span className="font-extrabold text-purple-600">Continuous</span>{' '}
            cloud security
          </h1>
          <p className="mx-auto mt-6 max-w-prose text-balance text-lg font-semibold text-gray-900 sm:text-xl lg:text-pretty">
            {siteConfig.description}
          </p>
          <ul className="mx-auto mt-3 max-w-prose list-inside list-disc text-balance lg:ml-4 lg:list-outside lg:text-pretty">
            <li>Agentless scanning</li>
            <li>Developer-friendly API and CLI</li>
            <li>Preconfigured benchmarks and queries</li>
          </ul>
          <div className="mt-6 space-x-5">
            <ButtonLink href={siteConfig.registerUrl} size="lg">
              Start for free
            </ButtonLink>
          </div>
        </div>
        <CspmDiagramMobile className="w-full sm:hidden" />
        <CspmDiagram className="mx-auto hidden w-full max-w-3xl flex-shrink-0 sm:flex lg:w-7/12" />
      </div>
    </section>
  );
}
