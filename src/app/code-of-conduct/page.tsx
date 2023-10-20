import { Metadata } from 'next';

import PrimaryLink from '@/components/common/links/PrimaryLink';

import { metadata as rootMetadata } from '@/app/layout';
import { siteConfig } from '@/constants/config';
import { openGraph } from '@/utils/og';

const url = `${siteConfig.url}/code-of-conduct`;
const title = 'Code of conduct';
const description =
  'We pledge to act and interact in ways that contribute to an open, welcoming, diverse, inclusive, and healthy community.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    ...rootMetadata.alternates,
    canonical: url,
  },
  openGraph: {
    ...rootMetadata.openGraph,
    url,
    title,
    description,
    images: [
      openGraph({
        title,
        description,
      }),
    ],
  },
  twitter: {
    ...rootMetadata.twitter,
    title: `${title} | ${siteConfig.title}`,
    description,
    images: [
      openGraph({
        title,
        description,
      }),
    ],
  },
};

export default function CodeOfConduct() {
  return (
    <div className="px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Code of conduct
        </h1>
        <div className="max-w-2xl">
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            Our pledge
          </h2>
          <p className="mt-8">
            We as members, contributors, and leaders pledge to make
            participation in our community a harassment-free experience for
            everyone, regardless of age, body size, visible or invisible
            disability, ethnicity, sex characteristics, gender identity and
            expression, level of experience, education, socio-economic status,
            nationality, personal appearance, race, caste, color, religion, or
            sexual identity and orientation.
          </p>
          <p className="mt-8">
            We pledge to act and interact in ways that contribute to an open,
            welcoming, diverse, inclusive, and healthy community.
          </p>
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            Our standards
          </h2>
          <p className="mt-8">
            Examples of behavior that contributes to a positive environment for
            our community include:
          </p>
          <ul
            role="list"
            className="ml-8 mt-4 max-w-xl list-disc space-y-4 text-gray-600"
          >
            <li>Demonstrating empathy and kindness toward other people</li>
            <li>
              Being respectful of differing opinions, viewpoints, and
              experiences
            </li>
            <li>Giving and gracefully accepting constructive feedback</li>
            <li>
              Accepting responsibility and apologizing to those affected by our
              mistakes, and learning from the experience
            </li>
            <li>
              Focusing on what is best not just for us as individuals, but for
              the overall community
            </li>
          </ul>
          <p className="mt-8">Examples of unacceptable behavior include:</p>
          <ul
            role="list"
            className="ml-8 mt-4 max-w-xl list-disc space-y-4 text-gray-600"
          >
            <li>
              The use of sexualized language or imagery, and sexual attention or
              advances of any kind
            </li>
            <li>
              Trolling, insulting or derogatory comments, and personal or
              political attacks
            </li>
            <li>Public or private harassment</li>
            <li>
              Publishing others&rsquo; private information, such as a physical
              or email address, without their explicit permission
            </li>
            <li>
              Other conduct which could reasonably be considered inappropriate
              in a professional setting
            </li>
          </ul>
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            Enforcement responsibilities
          </h2>
          <p className="mt-8">
            Community leaders are responsible for clarifying and enforcing our
            standards of acceptable behavior and will take appropriate and fair
            corrective action in response to any behavior that they deem
            inappropriate, threatening, offensive, or harmful.
          </p>
          <p className="mt-8">
            Community leaders have the right and responsibility to remove, edit,
            or reject comments, commits, code, wiki edits, issues, and other
            contributions that are not aligned to this Code of Conduct, and will
            communicate reasons for moderation decisions when appropriate.
          </p>
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            Scope
          </h2>
          <p className="mt-8">
            This Code of Conduct applies within all community spaces, and also
            applies when an individual is officially representing the community
            in public spaces. Examples of representing our community include
            using an official email address, posting via an official social
            media account, or acting as an appointed representative at an online
            or offline event.
          </p>
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            Enforcement
          </h2>
          <p className="mt-8">
            Instances of abusive, harassing, or otherwise unacceptable behavior
            may be reported to the community leaders responsible for enforcement
            at <PrimaryLink href="mailto:hi@fix.tt">hi@fix.tt</PrimaryLink>. All
            complaints will be reviewed and investigated promptly and fairly.
          </p>
          <p className="mt-8">
            All community leaders are obligated to respect the privacy and
            security of the reporter of any incident.
          </p>
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            Enforcement guidelines
          </h2>
          <p className="mt-8">
            Community leaders will follow these Community Impact Guidelines in
            determining the consequences for any action they deem in violation
            of this Code of Conduct:
          </p>
          <ol
            role="list"
            className="ml-6 mt-8 max-w-xl list-outside list-decimal space-y-8 text-gray-600"
          >
            <li className="mt-12 text-xl font-bold">
              <h3 className="text-xl tracking-tight text-gray-900">
                Correction
              </h3>
              <ul
                role="list"
                className="ml-8 mt-4 max-w-xl list-disc space-y-4 text-base font-normal"
              >
                <li>
                  <strong className="font-semibold text-gray-900">
                    Community impact.
                  </strong>{' '}
                  Use of inappropriate language or other behavior deemed
                  unprofessional or unwelcome in the community.
                </li>
                <li>
                  <strong className="font-semibold text-gray-900">
                    Consequence.
                  </strong>{' '}
                  A private, written warning from community leaders, providing
                  clarity around the nature of the violation and an explanation
                  of why the behavior was inappropriate. A public apology may be
                  requested.
                </li>
              </ul>
            </li>
            <li className="mt-12 text-xl font-bold">
              <h3 className="text-xl tracking-tight text-gray-900">Warning</h3>
              <ul
                role="list"
                className="ml-8 mt-4 max-w-xl list-disc space-y-4 text-base font-normal"
              >
                <li>
                  <strong className="font-semibold text-gray-900">
                    Community impact.
                  </strong>{' '}
                  A violation through a single incident or series of actions.
                </li>
                <li>
                  <strong className="font-semibold text-gray-900">
                    Consequence.
                  </strong>{' '}
                  A warning with consequences for continued behavior. No
                  interaction with the people involved, including unsolicited
                  interaction with those enforcing the Code of Conduct, for a
                  specified period of time. This includes avoiding interactions
                  in community spaces as well as external channels like social
                  media. Violating these terms may lead to a temporary or
                  permanent ban.
                </li>
              </ul>
            </li>
            <li className="mt-12 text-xl font-bold">
              <h3 className="text-xl tracking-tight text-gray-900">
                Temporary ban
              </h3>
              <ul
                role="list"
                className="ml-8 mt-4 max-w-xl list-disc space-y-4 text-base font-normal"
              >
                <li>
                  <strong className="font-semibold text-gray-900">
                    Community impact.
                  </strong>{' '}
                  A serious violation of community standards, including
                  sustained inappropriate behavior.
                </li>
                <li>
                  <strong className="font-semibold text-gray-900">
                    Consequence.
                  </strong>{' '}
                  A temporary ban from any sort of interaction or public
                  communication with the community for a specified period of
                  time. No public or private interaction with the people
                  involved, including unsolicited interaction with those
                  enforcing the Code of Conduct, is allowed during this period.
                  Violating these terms may lead to a permanent ban.
                </li>
              </ul>
            </li>
            <li className="mt-12 text-xl font-bold">
              <h3 className="text-xl tracking-tight text-gray-900">
                Permanent ban
              </h3>
              <ul
                role="list"
                className="ml-8 mt-4 max-w-xl list-disc space-y-4 text-base font-normal"
              >
                <li>
                  <strong className="font-semibold text-gray-900">
                    Community impact.
                  </strong>{' '}
                  Demonstrating a pattern of violation of community standards,
                  including sustained inappropriate behavior, harassment of an
                  individual, or aggression toward or disparagement of classes
                  of individuals.
                </li>
                <li>
                  <strong className="font-semibold text-gray-900">
                    Consequence.
                  </strong>{' '}
                  A permanent ban from any sort of public interaction within the
                  community.
                </li>
              </ul>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
