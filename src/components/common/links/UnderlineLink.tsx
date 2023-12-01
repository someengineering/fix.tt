import { forwardRef } from 'react';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/common/links/UnstyledLink';

import { cn } from '@/utils/css';

const UnderlineLink = forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={cn(
          'animated-underline custom-link inline-flex items-center font-medium',
          'focus:outline-none focus-visible:rounded focus-visible:ring focus-visible:ring-marian-blue-500 focus-visible:ring-offset-2',
          'border-dark border-b border-dotted hover:border-black/0',
          className,
        )}
      >
        {children}
      </UnstyledLink>
    );
  },
);

export default UnderlineLink;
