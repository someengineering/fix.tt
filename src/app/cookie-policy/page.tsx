import { Metadata } from 'next';

import PrimaryLink from '@/components/links/PrimaryLink';

export const metadata: Metadata = {
  title: 'Cookie policy',
};

export default function CookiePolicy() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Cookie policy
        </h1>
        <p className="mt-6 text-xl leading-8">
          As is common practice with professional websites, this site uses
          cookies&mdash;tiny files that are downloaded to your computer&mdash;to
          improve your experience.
        </p>
        <p className="mt-6 text-xl leading-8">
          This page describes what information they gather, how we use them, and
          why we sometimes need to store these cookies. We will also share how
          you can prevent these cookies from being stored; however, this may
          downgrade or &ldquo;break&rsquo; certain elements of the site&rsquo;s
          functionality.
        </p>
        <div className="max-w-2xl">
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            How we use cookies
          </h2>
          <p className="mt-8">
            We use cookies for a variety of reasons, detailed below.
            Unfortunately, in most cases there are no industry-standard options
            for disabling cookies without completely disabling the functionality
            and features they add to this site. It is recommended that you leave
            on all cookies if you are not sure whether you need them or not, in
            case they are used to provide a service that you use.
          </p>
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            Disabling cookies
          </h2>
          <p className="mt-8">
            You can prevent the setting of cookies by adjusting the settings on
            your browser. Be aware that disabling cookies will affect the
            functionality of this and many other websites that you visit.
            Disabling cookies will usually result in also disabling certain
            functionality and features of the this site. Therefore, it is
            recommended that you do not disable cookies.
          </p>
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            The cookies we set
          </h2>
          <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
            <li>
              <strong className="font-semibold text-gray-900">
                Account-related cookies.
              </strong>{' '}
              If you create an account with us, we will use cookies for the
              management of the signup process and general administration. These
              cookies will usually be deleted when you log out; however, in some
              cases they may remain afterwards to remember your site preferences
              when logged out.
            </li>
            <li>
              <strong className="font-semibold text-gray-900">
                Login-related cookies.
              </strong>{' '}
              We use cookies when you are logged in so that we can remember this
              fact. This prevents you from having to log in every single time
              you visit a new page. These cookies are typically removed or
              cleared when you log out to ensure that you can only access
              restricted features and areas when logged in.
            </li>
            <li>
              <strong className="font-semibold text-gray-900">
                Forms-related cookies.
              </strong>{' '}
              When you submit data to through a form such as those found on
              contact pages or comment forms, cookies may be set to remember
              your user details for future correspondence.
            </li>
            <li>
              <strong className="font-semibold text-gray-900">
                Site preferences cookies.
              </strong>{' '}
              In order to provide you with a great experience on this site, we
              provide the functionality to set your preferences for how this
              site runs when you use it. In order to remember your preferences,
              we need to set cookies so that this information can be called
              whenever you interact with a page is affected by your preferences.
            </li>
          </ul>
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            Third-party cookies
          </h2>
          <p className="mt-8">
            In some special cases, we also use cookies provided by trusted third
            parties. The following section details which third-party cookies you
            might encounter through this site.
          </p>
          <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
            <li>
              <strong className="font-semibold text-gray-900">
                Google Analytics.
              </strong>{' '}
              This site uses Google Analytics, one of the most widespread and
              trusted analytics solution on the web, for helping us to
              understand how you use the site and ways that we can improve your
              experience. These cookies may track things such as how long you
              spend on the site and the pages that you visit so we can continue
              to produce engaging content.
            </li>
          </ul>
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            More information
          </h2>
          <p className="mt-6 text-xl leading-8">
            This cookie policy was created with the help of the{' '}
            <PrimaryLink href="https://cookiepolicygenerator.com/cookie-policy-generator">
              Cookie Policy Generator
            </PrimaryLink>
            .
          </p>
          <p className="mt-6">
            If you have further questions regarding the use of cookies on this
            website, please contact us via email at{' '}
            <PrimaryLink href="mailto:hi@fix.tt">hi@fix.tt</PrimaryLink>.
          </p>
        </div>
      </div>
    </div>
  );
}
