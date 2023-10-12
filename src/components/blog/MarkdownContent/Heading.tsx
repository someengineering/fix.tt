import { ReactNode } from 'react';

import { cn } from '@/utils/css';

const headingClasses = {
  h2: 'mt-16 mb-8 text-2xl',
  h3: 'mt-12 mb-8 text-xl',
  h4: 'my-8 text-lg',
  h5: 'my-8 text-base',
  h6: 'my-8 text-base',
};

export default function Heading({
  as: As,
  children,
  ...props
}: {
  as: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: ReactNode;
}) {
  return (
    <As
      {...props}
      className={cn(
        'font-bold tracking-tight text-gray-900',
        headingClasses[As],
      )}
    >
      {children}
    </As>
  );
}
