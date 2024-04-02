import Image, { StaticImageData } from 'next/image';

import cloudzoneLogo from '@/assets/testimonials/cloudzone.png';
import fernandoCarlettiPhoto from '@/assets/testimonials/fernandocarletti.jpg';
import KavakLogo from '@/assets/testimonials/kavak.svg';
import lineajeLogo from '@/assets/testimonials/lineaje.png';
import nickMistryPhoto from '@/assets/testimonials/nickmistry.jpg';
import rotemLeviPhoto from '@/assets/testimonials/rotemlevi.jpg';

const testimonials: {
  authorName: string;
  authorTitle: string;
  authorPhoto: StaticImageData;
  quote: string;
  companyName: string;
  companyLogo:
    | ((
        props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
      ) => JSX.Element)
    | StaticImageData;
}[] = [
  {
    authorName: 'Fernando Carletti',
    authorPhoto: fernandoCarlettiPhoto,
    authorTitle: 'Senior Software Engineer',
    companyName: 'Kavak',
    companyLogo: (props) => <KavakLogo {...props} />,
    quote:
      'The major ‘click’ for me was when I saw how Fix allows you to just search for all relationships for all resources. And that was magical, to be honest.',
  },
  {
    authorName: 'Nick Mistry',
    authorPhoto: nickMistryPhoto,
    authorTitle: 'CISO',
    companyName: 'Lineaje',
    companyLogo: lineajeLogo,
    quote:
      'What I like about Fix is that I can actually see the test. What is the config setting that you’re auditing, what are the results you’re looking for, and how do you determine pass or fail? When the rubber meets the road, what I want to know is: what’s the call you’re making on the API?',
  },
  {
    authorName: 'Rotem Levi',
    authorPhoto: rotemLeviPhoto,
    authorTitle: 'Security Engineer',
    companyName: 'CloudZone',
    companyLogo: cloudzoneLogo,
    quote:
      'I’ve never found use in tools that just give me an asset list. With Fix, I get filters and scenarios, like public instances with admin rights or IAM users without MFA. And then, in one click, I get the recommendation.',
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="mx-auto -mt-10 grid max-w-2xl grid-cols-1 gap-y-10 divide-y divide-gray-900/10 sm:-mt-16 sm:gap-y-16 lg:mx-0 lg:-ml-8 lg:mt-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:divide-x lg:divide-y-0"
          id="testimonials"
        >
          {testimonials.map((testimonial, index) => (
            <div
              className="flex flex-col space-y-8 pt-10 sm:pt-16 lg:pl-8 lg:pt-0"
              key={`testimonial-${index}`}
            >
              <span className="sr-only">{testimonial.companyName}</span>
              {typeof testimonial.companyLogo === 'object' ? (
                <Image
                  src={testimonial.companyLogo}
                  className="h-8 w-auto self-start"
                  alt=""
                />
              ) : (
                <testimonial.companyLogo className="h-8 max-w-[6rem] self-start" />
              )}
              <figure className="flex flex-auto flex-col justify-between space-y-8">
                <blockquote className="text-lg font-medium leading-8 text-gray-900">
                  <p>&ldquo;{testimonial.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="flex items-center gap-x-4">
                  <Image
                    className="h-12 w-12 rounded-full bg-gray-50"
                    src={testimonial.authorPhoto}
                    alt=""
                  />
                  <div>
                    <div className="text-lg font-semibold text-gray-900">
                      {testimonial.authorName}
                    </div>
                    <div className="line-clamp-1 text-base text-gray-600">
                      {testimonial.authorTitle} at {testimonial.companyName}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
