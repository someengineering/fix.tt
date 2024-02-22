import { FaGithub, FaLinkedin, FaSquareRss } from 'react-icons/fa6';

import '@/styles/globals.css';

import UnstyledLink from '@/components/common/links/UnstyledLink';

import { siteConfig } from '@/constants/config';

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Pricing', href: '/#pricing' },
  { name: 'FAQ', href: '/#faq' },
  { name: 'Docs', href: 'https://docs.fix.security' },
  { name: 'Blog', href: '/blog' },
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
              className="text-sm font-bold uppercase leading-6 text-gray-600 hover:text-gray-900"
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
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">{item.name}</span>
            <item.icon className="h-6 w-6" aria-hidden="true" />
          </UnstyledLink>
        ))}
      </div>
      <p className="mt-10 text-center text-xs font-semibold uppercase leading-5 text-gray-500">
        {siteConfig.copyright}
      </p>
    </footer>
  );
}
