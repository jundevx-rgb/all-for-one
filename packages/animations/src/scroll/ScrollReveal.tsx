'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

export type ScrollRevealAnimation =
  | 'fade'
  | 'fade-up'
  | 'fade-down'
  | 'slide-left'
  | 'slide-right'
  | 'scale'
  | 'blur';

export interface ScrollRevealProps {
  children: ReactNode;
  animation?: ScrollRevealAnimation;
  start?: number;
  end?: number;
  offset?: [number, number];
  className?: string;
  as?: React.ElementType;
}

const defaultOffsets: Record<ScrollRevealAnimation, { x?: number; y?: number; scale?: number; filter?: string }> = {
  fade: {},
  'fade-up': { y: 60 },
  'fade-down': { y: -60 },
  'slide-left': { x: 80 },
  'slide-right': { x: -80 },
  scale: { scale: 0.85 },
  blur: { filter: 'blur(16px)' },
};

export function ScrollReveal({
  children,
  animation = 'fade-up',
  start = 0,
  end = 1,
  offset = [start, end],
  className,
  as: Component = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const defaults = defaultOffsets[animation];

  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.6], [defaults.y ?? 0, 0]);
  const x = useTransform(scrollYProgress, [0, 0.6], [defaults.x ?? 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [defaults.scale ?? 1, 1]);
  const filter = useTransform(scrollYProgress, [0, 0.6], [defaults.filter ?? 'blur(0px)', 'blur(0px)']);

  if (prefersReducedMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component ref={ref} className={className}>
      <motion.div style={{ opacity, y, x, scale, filter }}>{children}</motion.div>
    </Component>
  );
}
