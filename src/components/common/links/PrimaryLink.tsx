import { forwardRef } from 'react';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/common/links/UnstyledLink';

import { cn } from '@/utils/css';

const PrimaryLinkVariant = ['default', 'basic', 'light'] as const;
type PrimaryLinkProps = {
  variant?: (typeof PrimaryLinkVariant)[number];
} & UnstyledLinkProps;

const PrimaryLink = forwardRef<HTMLAnchorElement, PrimaryLinkProps>(
  ({ className, children, variant = 'default', ...rest }, ref) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={cn(
          'inline-flex items-center',
          'focus:outline-none focus-visible:rounded focus-visible:ring focus-visible:ring-marian-blue-500 focus-visible:ring-offset-2',
          'font-semibold',
          //#region  //*=========== Variant ===========
          variant === 'default' && [
            'text-marian-blue-500 hover:text-marian-blue-600 active:text-marian-blue-700',
            'disabled:text-marian-blue-200',
          ],
          variant === 'basic' && [
            'text-black hover:text-gray-600 active:text-gray-800',
            'disabled:text-gray-300',
          ],
          variant === 'light' && [
            'text-white hover:text-gray-100 active:text-white/80',
            'disabled:text-gray-200',
          ],
          //#endregion  //*======== Variant ===========
          className,
        )}
      >
        {children}
      </UnstyledLink>
    );
  },
);

export default PrimaryLink;
