import inventoryScreenshot from '@/assets/screenshots/inventory.png';
import ButtonLink from '@/components/common/links/ButtonLink';
import { siteConfig } from '@/constants/config';
import { getPosts } from '@/lib/hashnode';
import Image from 'next/image';
import Link from 'next/link';
import { LuChevronRight } from 'react-icons/lu';

export default async function Hero() {
  const latestBlogPost = (await getPosts({ first: 1 }))?.edges[0].node;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 text-center sm:py-24 lg:flex lg:items-center lg:px-8 lg:text-left">
      <div className="mx-auto max-w-xl lg:mx-0 lg:flex-shrink-0">
        <div className="mx-auto pb-12 lg:p-0">
          {latestBlogPost ? (
            <div className="mb-6">
              <Link
                href={`/blog/${latestBlogPost.slug}`}
                className="inline-flex space-x-4"
              >
                <span className="rounded-full bg-purple-600/10 px-3 py-1 text-sm/6 font-semibold text-purple-600 ring-1 ring-inset ring-purple-600/10">
                  What&rsquo;s new
                </span>
                <span className="inline-flex items-center space-x-1 text-sm/6 font-medium text-gray-600">
                  <span>{latestBlogPost?.title}</span>
                  <LuChevronRight
                    aria-hidden="true"
                    className="h-4 w-4 text-gray-400"
                  />
                </span>
              </Link>
            </div>
          ) : null}
          <h1 className="max-w-prose text-balance text-5xl font-bold sm:text-6xl lg:text-pretty">
            Get a secure and compliant cloud
          </h1>
          <p className="mx-auto mt-6 max-w-prose text-balance text-lg font-medium text-gray-900 sm:text-xl lg:text-pretty">
            {siteConfig.description}
          </p>
          <div className="mt-6 space-x-5">
            <ButtonLink
              href={siteConfig.registerUrl}
              size="lg"
              title="For SMBs & startups"
            >
              Start for free
            </ButtonLink>
            <ButtonLink
              href={siteConfig.demoUrl}
              size="lg"
              variant="outline"
              title="For enterprises"
            >
              Book a demo
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
            className="w-[76rem] flex-none rounded-xl shadow-2xl ring-1 ring-gray-900/10 lg:rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
