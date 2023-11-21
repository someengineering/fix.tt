import { forwardRef } from 'react';
import { IconType } from 'react-icons';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/common/links/UnstyledLink';

import { cn } from '@/utils/css';

const IconLinkVariant = [
  'marian-blue',
  'outline',
  'ghost',
  'light',
  'dark',
] as const;

type IconLinkProps = {
  isDarkBg?: boolean;
  variant?: (typeof IconLinkVariant)[number];
  icon?: IconType;
  classNames?: {
    icon?: string;
  };
} & Omit<UnstyledLinkProps, 'children'>;

const IconLink = forwardRef<HTMLAnchorElement, IconLinkProps>(
  (
    {
      className,
      icon: Icon,
      variant = 'outline',
      isDarkBg = false,
      classNames,
      ...rest
    },
    ref,
  ) => {
    return (
      <UnstyledLink
        ref={ref}
        type="button"
        className={cn(
          'inline-flex items-center justify-center rounded font-medium',
          'focus:outline-none focus-visible:ring focus-visible:ring-marian-blue-500',
          'shadow-sm',
          'transition-colors duration-75',
          'min-h-[28px] min-w-[28px] p-1 md:min-h-[34px] md:min-w-[34px] md:p-2',
          //#region  //*=========== Variants ===========
          [
            variant === 'marian-blue' && [
              'bg-marian-blue-500 text-white',
              'border border-marian-blue-600',
              'hover:bg-marian-blue-600 hover:text-white',
              'active:bg-marian-blue-700',
              'disabled:bg-marian-blue-700',
            ],
            variant === 'outline' && [
              'text-marian-blue-500',
              'border border-marian-blue-500',
              'hover:bg-marian-blue-50 active:bg-marian-blue-100 disabled:bg-marian-blue-100',
              isDarkBg &&
                'hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800',
            ],
            variant === 'ghost' && [
              'text-marian-blue-500',
              'shadow-none',
              'hover:bg-marian-blue-50 active:bg-marian-blue-100 disabled:bg-marian-blue-100',
              isDarkBg &&
                'hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800',
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
        {...rest}
      >
        {Icon && <Icon size="1em" className={cn(classNames?.icon)} />}
      </UnstyledLink>
    );
  },
);

export default IconLink;
