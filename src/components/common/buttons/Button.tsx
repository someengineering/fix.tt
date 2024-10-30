import { cn } from '@/utils/css';
import { forwardRef } from 'react';
import { IconType } from 'react-icons';
import { ImSpinner2 } from 'react-icons/im';

type ButtonVariant = 'default' | 'outline' | 'ghost' | 'light' | 'dark';
type ButtonSize = 'sm' | 'base' | 'lg';

type ButtonProps = {
  isLoading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
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
      variant = 'default',
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
          'inline-flex items-center whitespace-nowrap font-bold',
          'focus:outline-none focus-visible:ring focus-visible:ring-purple-500',
          'border',
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
                'text-white': ['default', 'dark'].includes(variant),
                'text-black': ['light'].includes(variant),
                'text-purple-500': ['outline', 'ghost'].includes(variant),
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

Button.displayName = 'Button';

export default Button;
