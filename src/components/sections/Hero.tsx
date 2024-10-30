import inventoryScreenshot from '@/assets/screenshots/inventory.png';
import ButtonLink from '@/components/common/links/ButtonLink';
import { siteConfig } from '@/constants/config';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 text-center sm:py-24 lg:flex lg:items-center lg:px-8 lg:text-left">
      <div className="mx-auto max-w-xl lg:mx-0 lg:flex-shrink-0">
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
      </div>
      <div className="mx-auto mt-8 flex max-w-2xl lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-16">
        <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
          <Image
            src={inventoryScreenshot}
            sizes="(min-width: 640px) 960px, 720px"
            placeholder="blur"
            alt="Fix Security's Inventory view showing cloud resources. Left sidebar displays resource categories. Main panel shows a filtered list of resources across AWS, Azure, and GCP, with dropdown filters for clouds, accounts, regions, and kinds."
            className="w-[64rem] flex-none rounded-xl shadow-2xl ring-1 ring-gray-900/10 lg:rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
