import { forwardRef } from 'react';
import { IconType } from 'react-icons';
import { ImSpinner2 } from 'react-icons/im';

import { cn } from '@/utils/css';

const ButtonVariant = [
  'marian-blue',
  'cornflower-blue',
  'outline',
  'ghost',
  'light',
  'dark',
] as const;
const ButtonSize = ['sm', 'base'] as const;

type ButtonProps = {
  isLoading?: boolean;
  variant?: (typeof ButtonVariant)[number];
  size?: (typeof ButtonSize)[number];
  leftIcon?: IconType;
  rightIcon?: IconType;
  classNames?: {
    leftIcon?: string;
    rightIcon?: string;
  };
} & React.ComponentPropsWithRef<'button'>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = 'marian-blue',
      size = 'base',
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      classNames,
      ...rest
    },
    ref,
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          'inline-flex items-center whitespace-nowrap rounded-full font-bold',
          'focus:outline-none focus-visible:ring focus-visible:ring-marian-blue-500',
          'border',
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
            variant === 'marian-blue' && [
              'border-marian-blue-900 bg-marian-blue-800 text-white',
              'hover:border-marian-blue-950 hover:bg-marian-blue-900 hover:text-white',
              'active:border-black active:bg-marian-blue-950',
              'disabled:border-marian-blue-900 disabled:bg-marian-blue-800',
            ],
            variant === 'cornflower-blue' && [
              'border-cornflower-blue-700 bg-cornflower-blue-600 text-white',
              'hover:border-cornflower-blue-800 hover:bg-cornflower-blue-700 hover:text-white',
              'active:border-cornflower-blue-900 active:bg-cornflower-blue-800',
              'disabled:border-cornflower-blue-700 disabled:bg-cornflower-blue-600',
            ],
            variant === 'outline' && [
              'text-cornflower-blue-600',
              'border border-cornflower-blue-600',
              'hover:bg-cornflower-blue-50 active:bg-cornflower-blue-100 disabled:bg-cornflower-blue-100',
            ],
            variant === 'ghost' && [
              'text-marian-blue-900',
              'shadow-none',
              'hover:bg-marian-blue-50 active:bg-marian-blue-100 active:text-marian-blue-950 disabled:bg-marian-blue-100',
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
          isLoading &&
            'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait',
          className,
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={cn(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              {
                'text-white': ['marian-blue', 'dark'].includes(variant),
                'text-black': ['light'].includes(variant),
                'text-marian-blue-500': ['outline', 'ghost'].includes(variant),
              },
            )}
          >
            <ImSpinner2 className="animate-spin" />
          </div>
        )}
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
      </button>
    );
  },
);

export default Button;
