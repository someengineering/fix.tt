'use client';

import Logo from '@/assets/logo.svg';
import ButtonLink from '@/components/common/links/ButtonLink';
import UnstyledLink from '@/components/common/links/UnstyledLink';
import { siteConfig } from '@/constants/config';
import { cn } from '@/utils/css';
import {
  Dialog,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { useState } from 'react';
import { LuChevronDown, LuMenu, LuX } from 'react-icons/lu';

export type NavigationItem = {
  name: string;
  href: string;
  children?: NavigationChildItem[];
  popoverContent?: JSX.Element;
};

type NavigationChildItem = NavigationItem & {
  description?: string;
};

export default function NavigationMenu({ items }: { items: NavigationItem[] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:gap-x-12 lg:px-8">
        <div className="flex">
          <UnstyledLink
            href="/"
            className="-m-1.5 p-1.5 text-purple-600 hover:text-purple-700"
          >
            <span className="sr-only">{siteConfig.title}</span>
            <Logo className="h-16 w-auto" />
          </UnstyledLink>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center p-2.5 text-gray-700 hover:text-gray-900"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <LuMenu className="h-10 w-10" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden text-base font-bold text-gray-700 lg:flex lg:gap-x-10">
          {items.map((item) =>
            item.popoverContent || item.children?.length ? (
              <div className="group relative" key={item.name}>
                <UnstyledLink
                  href={item.href ?? '#'}
                  className="inline-flex items-center gap-x-1 py-3 leading-6"
                >
                  <span key={item.name} className="hover:text-gray-900">
                    {item.name}
                  </span>
                  <LuChevronDown className="h-5 w-5" aria-hidden="true" />
                </UnstyledLink>
                <div
                  className={`invisible absolute -left-8 top-full z-50 w-screen overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-900/5 group-hover:visible ${item.popoverContent || item.children?.some((child) => child.description) ? 'max-w-md' : 'max-w-xs'}`}
                >
                  {item.children?.length ? (
                    <div className="p-4 text-sm">
                      {item.children?.map((child) => (
                        <UnstyledLink
                          key={child.name}
                          href={child.href}
                          className="relative block rounded-lg px-4 py-3 leading-6 hover:bg-purple-50 hover:text-gray-900"
                        >
                          <span>{child.name}</span>
                          {child.description ? (
                            <p className="mt-1 font-medium text-gray-600">
                              {child.description}
                            </p>
                          ) : null}
                        </UnstyledLink>
                      ))}
                    </div>
                  ) : null}
                  {item.popoverContent ? (
                    <div
                      className={`px-8 py-7 ${item.children?.length ? 'bg-gray-50' : ''}`}
                    >
                      {item.popoverContent}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <UnstyledLink
                key={item.name}
                href={item.href ?? '#'}
                className="py-3 hover:text-gray-900"
              >
                {item.name}
              </UnstyledLink>
            ),
          )}
        </div>
        <div className="hidden space-x-2 lg:flex lg:flex-1 lg:justify-end">
          <ButtonLink
            href={siteConfig.registerUrl}
            onClick={() => setMobileMenuOpen(false)}
          >
            Start for free
          </ButtonLink>
          <ButtonLink
            href={siteConfig.loginUrl}
            variant="ghost"
            onClick={() => setMobileMenuOpen(false)}
          >
            Log in
          </ButtonLink>
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
            <UnstyledLink href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">{siteConfig.title}</span>
              <Logo className="h-16 w-auto text-purple-600 hover:text-purple-700" />
            </UnstyledLink>
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <LuX className="h-10 w-10" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-4 flow-root">
            <div className="divide-y divide-gray-500/10">
              <div className="space-y-6 py-6 text-lg font-bold">
                {items.map((item) =>
                  item.children?.length ? (
                    <Disclosure key={item.name} as="div" className="-mx-3">
                      {({ open }) => (
                        <>
                          <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 leading-7 text-gray-700 hover:bg-purple-50 hover:text-gray-900">
                            {item.name}
                            <LuChevronDown
                              className={cn(
                                open ? 'rotate-180' : '',
                                'h-5 w-5 flex-none',
                              )}
                              aria-hidden="true"
                            />
                          </DisclosureButton>
                          <DisclosurePanel className="mt-2 space-y-2">
                            {item.children?.map((item) => (
                              <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                className="block rounded-lg py-2 pl-6 pr-3 text-base font-semibold leading-7 text-gray-700 hover:bg-purple-50 hover:text-gray-900"
                              >
                                {item.name}
                              </DisclosureButton>
                            ))}
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>
                  ) : (
                    <UnstyledLink
                      key={item.name}
                      href={item.href ?? '#'}
                      className="-mx-3 block rounded-lg px-3 py-2 text-gray-700 hover:bg-purple-50 hover:text-gray-900"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </UnstyledLink>
                  ),
                )}
              </div>
              <div className="space-x-2 py-6">
                <ButtonLink
                  href={siteConfig.registerUrl}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start for free
                </ButtonLink>
                <ButtonLink
                  href={siteConfig.loginUrl}
                  variant="ghost"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </ButtonLink>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
