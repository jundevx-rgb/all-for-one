'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export interface ScrollProgressProps {
  position?: 'top' | 'bottom';
  height?: number;
  color?: string;
  trackColor?: string;
  className?: string;
}

export function ScrollProgress({
  position = 'top',
  height = 3,
  color = 'var(--primary, #3b82f6)',
  trackColor = 'transparent',
  className,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      className={className}
      style={{
        position: 'fixed',
        [position]: 0,
        left: 0,
        right: 0,
        height: `${height}px`,
        backgroundColor: trackColor,
        zIndex: 9999,
      }}
      aria-hidden="true"
    >
      <motion.div
        style={{
          height: '100%',
          backgroundColor: color,
          transformOrigin: 'left',
          scaleX,
          width: '100%',
        }}
      />
    </div>
  );
}
