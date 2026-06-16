'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

export interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down';
  className?: string;
  as?: React.ElementType;
}

export function ParallaxLayer({
  children,
  speed = 0.3,
  direction = 'up',
  className,
  as: Component = 'div',
}: ParallaxLayerProps) {
  const ref = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const multiplier = direction === 'down' ? -1 : 1;
  const yRange = 200 * speed * multiplier;
  const y = useTransform(scrollYProgress, [0, 1], [-yRange, yRange]);

  if (prefersReducedMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component ref={ref} className={className}>
      <motion.div style={{ y, willChange: 'transform' }}>{children}</motion.div>
    </Component>
  );
}
