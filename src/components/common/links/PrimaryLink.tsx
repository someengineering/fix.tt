import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/common/links/UnstyledLink';
import { cn } from '@/utils/css';
import { forwardRef } from 'react';

type PrimaryLinkVariant = 'default' | 'basic' | 'light';
type PrimaryLinkProps = {
  variant?: PrimaryLinkVariant;
} & UnstyledLinkProps;

const PrimaryLink = forwardRef<HTMLAnchorElement, PrimaryLinkProps>(
  ({ className, children, variant = 'default', ...rest }, ref) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={cn(
          'focus:outline-none focus-visible:rounded focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-offset-2',
          'font-semibold',
          //#region  //*=========== Variant ===========
          variant === 'default' && [
            'text-purple-500 hover:text-purple-600 active:text-purple-700',
            'disabled:text-purple-200',
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

PrimaryLink.displayName = 'PrimaryLink';

export default PrimaryLink;
