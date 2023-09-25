import { forwardRef } from 'react';
import { IconType } from 'react-icons';

import { cn } from '@/lib/utils';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';

const ButtonLinkVariant = [
  'primary',
  'tangerine',
  'outline',
  'ghost',
  'light',
  'dark',
] as const;
const ButtonLinkSize = ['sm', 'base'] as const;

type ButtonLinkProps = {
  variant?: (typeof ButtonLinkVariant)[number];
  size?: (typeof ButtonLinkSize)[number];
  leftIcon?: IconType;
  rightIcon?: IconType;
  classNames?: {
    leftIcon?: string;
    rightIcon?: string;
  };
} & UnstyledLinkProps;

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'base',
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      classNames,
      ...rest
    },
    ref,
  ) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={cn(
          'inline-flex items-center whitespace-nowrap rounded-md font-bold',
          'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
          'shadow-sm',
          'disabled:opacity-50',
          'transition-colors duration-75',
          //#region  //*=========== Size ===========
          [
            size === 'base' && ['px-4 py-2', 'text-base'],
            size === 'sm' && ['px-3 py-1.5', 'text-sm'],
          ],
          //#endregion  //*======== Size ===========
          //#region  //*=========== Variants ===========
          [
            variant === 'primary' && [
              'bg-primary-800 text-white',
              'hover:bg-primary-900 hover:text-white',
              'active:bg-primary-950',
              'disabled:bg-primary-800',
            ],
            variant === 'tangerine' && [
              'bg-tangerine-600 text-white',
              'hover:bg-tangerine-700 hover:text-white',
              'active:bg-tangerine-800',
              'disabled:bg-tangerine-600',
            ],
            variant === 'outline' && [
              'text-tangerine-600',
              'border border-tangerine-600',
              'hover:bg-tangerine-50 active:bg-tangerine-100 disabled:bg-tangerine-100',
            ],
            variant === 'ghost' && [
              'text-primary-900',
              'shadow-none',
              'hover:bg-primary-50 active:bg-primary-100 active:text-primary-950 disabled:bg-primary-100',
            ],
            variant === 'light' && [
              'bg-white text-gray-700',
              'border border-gray-300',
              'hover:text-dark hover:bg-gray-100',
              'active:bg-white/80 disabled:bg-gray-200',
            ],
            variant === 'dark' && [
              'bg-gray-900 text-white',
              'border border-gray-600',
              'hover:bg-gray-800 active:bg-gray-700 disabled:bg-gray-700',
            ],
          ],
          //#endregion  //*======== Variants ===========
          'disabled:cursor-not-allowed',
          className,
        )}
      >
        {LeftIcon && (
          <div
            className={cn([
              size === 'base' && 'mr-1',
              size === 'sm' && 'mr-1.5',
            ])}
          >
            <LeftIcon
              size="1em"
              className={cn(
                [
                  size === 'base' && 'md:text-md text-md',
                  size === 'sm' && 'md:text-md text-sm',
                ],
                classNames?.leftIcon,
              )}
            />
          </div>
        )}
        {children}
        {RightIcon && (
          <div
            className={cn([
              size === 'base' && 'ml-1',
              size === 'sm' && 'ml-1.5',
            ])}
          >
            <RightIcon
              size="1em"
              className={cn(
                [
                  size === 'base' && 'text-md md:text-md',
                  size === 'sm' && 'md:text-md text-sm',
                ],
                classNames?.rightIcon,
              )}
            />
          </div>
        )}
      </UnstyledLink>
    );
  },
);

export default ButtonLink;
