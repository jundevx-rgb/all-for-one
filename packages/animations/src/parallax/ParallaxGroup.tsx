'use client';

import { forwardRef, ReactNode } from 'react';

export interface ParallaxGroupProps {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const ParallaxGroup = forwardRef<HTMLElement, ParallaxGroupProps>(
  ({ children, className, as: Component = 'div' }, ref) => {
    return (
      <Component ref={ref} className={className} style={{ position: 'relative', overflow: 'hidden' }}>
        {children}
      </Component>
    );
  },
);

ParallaxGroup.displayName = 'ParallaxGroup';
