import {
  FaDiscord,
  FaGithub,
  FaLinkedin,
  FaSpotify,
  FaSquareRss,
} from 'react-icons/fa6';

import '@/styles/globals.css';

import UnstyledLink from '@/components/common/links/UnstyledLink';

import { siteConfig } from '@/constants/config';

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Pricing', href: '/#pricing' },
  { name: 'FAQ', href: '/#faq' },
  { name: 'Docs', href: 'https://docs.fix.security' },
  { name: 'Blog', href: '/blog' },
  { name: 'Podcast', href: '/podcast' },
  { name: 'Privacy', href: '/privacy-policy' },
  { name: 'Terms', href: '/terms-and-conditions' },
];

const social: {
  name: string;
  href: string;
  icon: (
    props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
  ) => JSX.Element;
}[] = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/fix',
    icon: (props) => <FaLinkedin {...props} />,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/someengineering',
    icon: (props) => <FaGithub {...props} />,
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/fixsecurity',
    icon: (props) => <FaDiscord {...props} />,
  },
  {
    name: 'Spotify',
    href: 'https://podcasters.spotify.com/pod/show/the-security-cloud',
    icon: (props) => <FaSpotify {...props} />,
  },
  {
    name: 'Blog RSS feed',
    href: `${siteConfig.url}/blog/rss.xml`,
    icon: (props) => <FaSquareRss {...props} />,
  },
];

export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <nav
        className="-mb-6 flex flex-wrap justify-center space-x-8 sm:space-x-12"
        aria-label="Footer"
      >
        {navigation.map((item) => (
          <div key={item.name} className="pb-6">
            <UnstyledLink
              href={item.href}
              className="text-sm font-bold leading-6 text-gray-600 hover:text-gray-900"
            >
              {item.name}
            </UnstyledLink>
          </div>
        ))}
      </nav>
      <div className="mt-10 flex justify-center space-x-10">
        {social.map((item) => (
          <UnstyledLink
            key={item.name}
            href={item.href}
            className="text-gray-400 hover:text-gray-600"
          >
            <span className="sr-only">{item.name}</span>
            <item.icon className="h-6 w-6" aria-hidden="true" />
          </UnstyledLink>
        ))}
      </div>
      <p className="mt-10 text-center text-xs font-semibold leading-5 text-gray-600">
        {siteConfig.copyright}
      </p>
    </footer>
  );
}
