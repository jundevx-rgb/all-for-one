'use client';

import { motion, type Variants, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

export type StaggerDirection = 'up' | 'down' | 'left' | 'right' | 'none';

export interface StaggerChildrenProps {
  children: ReactNode;
  staggerDelay?: number;
  direction?: StaggerDirection;
  animation?: 'fade' | 'fade-up' | 'fade-down' | 'slide-left' | 'slide-right' | 'scale' | 'blur';
  className?: string;
  as?: React.ElementType;
}

const directionOffsets: Record<StaggerDirection, { offsetKey: 'x' | 'y'; value: number }> = {
  up: { offsetKey: 'y', value: 30 },
  down: { offsetKey: 'y', value: -30 },
  left: { offsetKey: 'x', value: 30 },
  right: { offsetKey: 'x', value: -30 },
  none: { offsetKey: 'x', value: 0 },
};

export function StaggerChildren({
  children,
  staggerDelay = 0.1,
  direction = 'up',
  animation = 'fade-up',
  className,
  as: Component = 'div',
}: StaggerChildrenProps) {
  const prefersReducedMotion = useReducedMotion();

  const { offsetKey, value } = directionOffsets[direction];

  const baseOpacity = animation.includes('fade') || animation === 'blur' ? 0 : 1;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: baseOpacity,
      [offsetKey]: value,
      ...(animation === 'scale' && { scale: 0.8 }),
      ...(animation === 'blur' && { filter: 'blur(8px)' }),
    },
    visible: {
      opacity: 1,
      [offsetKey]: 0,
      scale: 1,
      filter: 'blur(0px)',
    },
  };

  if (prefersReducedMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component className={className}>
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
        {Array.isArray(children)
          ? children.map((child, index) => (
              <motion.div key={index} variants={itemVariants} transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}>
                {child}
              </motion.div>
            ))
          : children}
      </motion.div>
    </Component>
  );
}
