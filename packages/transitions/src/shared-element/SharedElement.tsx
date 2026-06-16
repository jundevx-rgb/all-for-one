'use client';

import { motion } from 'framer-motion';
import type { MotionProps } from 'framer-motion';
import type { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react';

export interface SharedElementProps {
  /** Unique layoutId — must match across routes for the shared transition to work. */
  id: string;
  /** HTML element or React component to render. */
  as?: ElementType;
  /** Additional motion props for fine-grained control. */
  motionProps?: Omit<MotionProps, 'layoutId'>;
  children: ReactNode;
}

/**
 * SharedElement — Shared element transition using Framer Motion layoutId.
 * Wrap any element on multiple pages with the same `id` to animate
 * its position, size, and content across route changes.
 *
 * Usage:
 *   // Page A
 *   <SharedElement id="hero-image" as="div">
 *     <img src="/hero.jpg" />
 *   </SharedElement>
 *
 *   // Page B
 *   <SharedElement id="hero-image" as="div">
 *     <img src="/hero-large.jpg" />
 *   </SharedElement>
 */
export function SharedElement<T extends ElementType = 'div'>({
  id,
  as,
  motionProps,
  children,
}: SharedElementProps & Omit<ComponentPropsWithoutRef<T>, keyof SharedElementProps>) {
  const Component = as ?? 'div';

  return (
    <motion.div
      layoutId={id}
      style={{ display: 'contents' }}
      {...motionProps}
    >
      <Component>{children}</Component>
    </motion.div>
  );
}
