'use client';

import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { LuMenu, LuX } from 'react-icons/lu';

import '@/styles/globals.css';

// import ButtonLink from '@/components/links/ButtonLink';
import Logo from '@/assets/logo.svg';
import { siteConfig } from '@/constant/config';

const navigation = [
  { name: 'Why Fix?', href: '/#why' },
  { name: 'Pricing', href: '/#pricing' },
  { name: 'FAQ', href: '/#faq' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header>
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a
            href="#"
            className="-m-1.5 p-1.5 text-primary-900 hover:text-primary-950"
          >
            <span className="sr-only">{siteConfig.title}</span>
            <Logo className="h-16 w-auto" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-lg p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <LuMenu className="h-10 w-10" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-base font-medium leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {/* <ButtonLink href="#request-early-access">
            Request early access
          </ButtonLink> */}
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
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">{siteConfig.title}</span>
              <Logo className="h-16 w-auto text-primary-900 hover:text-primary-950" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-lg p-2.5 text-gray-700"
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
                    className="-mx-3 block rounded-lg px-3 py-2 text-lg font-medium leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              {/* <div className="py-6">
                <ButtonLink href="#request-early-access" variant="tangerine">
                  Request early access
                </ButtonLink>
              </div> */}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
