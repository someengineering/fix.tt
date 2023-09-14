import { FaGithub } from 'react-icons/fa6';

import '@/styles/globals.css';

const social: {
  name: string;
  href: string;
  icon: (
    props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
  ) => JSX.Element;
}[] = [
  // {
  //   name: 'LinkedIn',
  //   href: 'https://linkedin.com/company/fix',
  //   icon: (props) => <FaLinkedin {...props} />,
  // },
  {
    name: 'GitHub',
    href: 'https://github.com/someengineering',
    icon: (props) => <FaGithub {...props} />,
  },
];

export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
      <div className="flex justify-center space-x-6 md:order-2">
        {social.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">{item.name}</span>
            <item.icon className="h-6 w-6" aria-hidden="true" />
          </a>
        ))}
      </div>
      <div className="mt-8 md:order-1 md:mt-0">
        <p className="text-center text-sm leading-5 text-gray-500">
          &copy; {new Date().getFullYear()} Some Engineering Inc. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
