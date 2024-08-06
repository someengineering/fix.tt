import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
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
          {blok.leftColumn && blok.leftColumn.map((nestedBlok) => (
              <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
          <div className="mt-6 space-x-5">
            <ButtonLink href={siteConfig.registerUrl} size="lg">
              Start for free
            </ButtonLink>
          </div>

        </div>
        {blok.picture && (
            <Image
                className="mx-auto hidden w-full max-w-3xl flex-shrink-0 sm:flex lg:w-7/12"
                src={blok.picture.filename}
                alt={blok.picture.alt || 'Hero Image'}
                width={625}
                height={420}
            />
        )}
        {blok.pictureMobile && (
            <Image
                className="w-full sm:hidden"
                src={blok.pictureMobile.filename}
                alt={blok.pictureMobile.alt || 'Hero Image'}
                width={625}
                height={420}
            />
        )}
      </>
  );
};

export default Hero;