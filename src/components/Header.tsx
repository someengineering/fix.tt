'use client';

import { Dialog } from '@headlessui/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LuMenu, LuX } from 'react-icons/lu';

import '@/styles/globals.css';

import ButtonLink from '@/components/common/links/ButtonLink';

import Logo from '@/assets/logo.svg';
import { siteConfig } from '@/constants/config';

const navigation = [
  { name: 'Why Fix?', href: '/#why' },
  { name: 'Pricing', href: '/#pricing' },
  { name: 'FAQ', href: '/#faq' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={pathname === '/' ? 'bg-marian-blue-50' : ''}>
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a
            href="/"
            className="-m-1.5 p-1.5 text-marian-blue-900 hover:text-marian-blue-800"
          >
            <span className="sr-only">{siteConfig.title}</span>
            <Logo className="h-16 w-auto" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-full p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <LuMenu className="h-10 w-10" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden text-base font-semibold leading-6 text-gray-900 lg:flex lg:gap-x-6">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`${
                pathname === '/'
                  ? 'hover:bg-marian-blue-200'
                  : 'hover:bg-marian-blue-50'
              } rounded-full px-3 py-1.5`}
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {pathname !== '/' ? (
            <ButtonLink href="/#request-early-access" variant="cornflower-blue">
              Request early access
            </ButtonLink>
          ) : null}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">{siteConfig.title}</span>
              <Logo className="h-16 w-auto text-marian-blue-900 hover:text-marian-blue-800" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-full p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <LuX className="h-10 w-10" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-full border border-transparent px-3 py-2 text-lg font-medium leading-7 text-gray-900 hover:border-cornflower-blue-100 hover:bg-cornflower-blue-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <ButtonLink
                  href="/#request-early-access"
                  variant="cornflower-blue"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Request early access
                </ButtonLink>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
