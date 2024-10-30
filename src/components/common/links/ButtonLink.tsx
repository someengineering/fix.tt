import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/common/links/UnstyledLink';
import { cn } from '@/utils/css';
import { forwardRef } from 'react';
import { IconType } from 'react-icons';

type ButtonLinkVariant = 'default' | 'outline' | 'ghost' | 'light' | 'dark';
type ButtonLinkSize = 'sm' | 'base' | 'lg';

type ButtonLinkProps = {
  variant?: ButtonLinkVariant;
  size?: ButtonLinkSize;
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
      variant = 'default',
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
          'inline-flex items-center whitespace-nowrap font-bold',
          'focus:outline-none focus-visible:ring focus-visible:ring-purple-500',
          'disabled:opacity-50',
          'transition-colors duration-75',
          //#region  //*=========== Size ===========
          [
            size === 'lg' && ['rounded-lg px-5 py-2.5', 'text-lg'],
            size === 'base' && ['rounded-md px-4 py-2', 'text-base'],
            size === 'sm' && ['rounded px-3 py-1.5', 'text-sm'],
          ],
          //#endregion  //*======== Size ===========
          //#region  //*=========== Variants ===========
          [
            variant === 'default' && [
              'border-purple-600 bg-purple-600 text-white',
              'hover:border-purple-700 hover:bg-purple-700 hover:text-white',
              'active:border-purple-800 active:bg-purple-800',
              'disabled:border-purple-600 disabled:bg-purple-600',
            ],
            variant === 'outline' && [
              'text-purple-600',
              'border border-purple-600',
              'hover:bg-purple-50 active:bg-purple-100 disabled:bg-purple-100',
            ],
            variant === 'ghost' && [
              'text-purple-600',
              'border border-transparent',
              'hover:border-purple-600 active:border-purple-700',
            ],
            variant === 'light' && [
              'bg-white text-gray-700',
              'border border-white',
              'hover:border-white/75 hover:bg-white/75 hover:text-gray-800',
              'active:border-white/50 active:bg-white/50 disabled:border-gray-200 disabled:bg-gray-200',
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

ButtonLink.displayName = 'ButtonLink';

export default ButtonLink;
