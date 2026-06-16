'use client';

import React from 'react';

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

const variantStyles: Record<string, string> = {
  default: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700',
  elevated:
    'bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-900/30',
  bordered:
    'bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600',
  interactive:
    'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-[1.02] cursor-pointer transition-all duration-300',
  ghost: 'bg-transparent',
};

const paddingStyles: Record<string, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export interface CardProps {
  /** Visual variant */
  variant?: 'default' | 'elevated' | 'bordered' | 'interactive' | 'ghost';
  /** Inner padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Force hover elevation (for non-interactive variants) */
  hover?: boolean;
  /** Override the rendered element (e.g. 'article', 'section', 'li') */
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  role?: string;
}

export const Card = React.forwardRef<HTMLElement, CardProps>(function Card(
  {
    variant = 'default',
    padding = 'md',
    hover = false,
    as: Component = 'div',
    children,
    className,
    onClick,
    role,
    ...rest
  },
  ref,
) {
  const hoverClass = hover
    ? 'hover:shadow-xl transition-shadow duration-300'
    : '';

  const classes = [
    'rounded-xl',
    variantStyles[variant] ?? variantStyles.default,
    paddingStyles[padding] ?? paddingStyles.md,
    hoverClass,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component
      ref={ref}
      className={classes}
      onClick={onClick}
      role={role ?? (onClick ? 'button' : undefined)}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      {...rest}
    >
      {children}
    </Component>
  );
});
