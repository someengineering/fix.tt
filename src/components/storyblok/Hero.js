import { storyblokEditable } from '@storyblok/react';
import Image from 'next/image';

import ButtonLink from '@/components/common/links/ButtonLink';
import { siteConfig } from '@/constants/config';

const Hero = ({ blok }) => {
  if (!blok) {
    return <div>No content available</div>;
  }

  return (
    <>
      <div className="mx-auto pb-12 lg:p-0" {...storyblokEditable(blok)}>
        <div className="mb-3 text-lg font-bold uppercase text-gray-600 sm:text-xl">
          {blok.header}
        </div>
        <h1 className="max-w-prose text-balance text-4xl font-extrabold sm:text-5xl lg:text-pretty">
          <span className="font-extrabold text-cornflower-blue-600">
            {blok.header_1_span}
          </span>{' '}
          {blok.header_1}
        </h1>
        <p className="mx-auto mt-6 max-w-prose text-balance text-lg font-semibold text-gray-900 sm:text-xl lg:text-pretty">
          {blok.description}
        </p>
        <ul className="mx-auto mt-3 max-w-prose list-inside list-disc text-balance lg:ml-4 lg:list-outside lg:text-pretty">
          {blok.features.map((feature, index) => (
            <li key={index}>{feature.value}</li>
          ))}
        </ul>
        <div className="mt-6 space-x-5">
          <ButtonLink href={siteConfig.registerUrl} size="lg">
            Start for free
          </ButtonLink>
        </div>
      </div>
      {blok.picture && (
        <Image
          src={blok.picture.filename}
          alt={blok.picture.alt || 'Hero Image'}
          width={625}
          height={420}
          className="mx-auto hidden w-full max-w-3xl flex-shrink-0 sm:flex lg:w-7/12"
        />
      )}
    </>
  );
};

export default Hero;
