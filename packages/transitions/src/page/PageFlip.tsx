'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Easing } from 'framer-motion';
import type { ReactNode } from 'react';

export interface PageFlipProps {
  children: ReactNode;
  /** Duration of the flip animation in seconds. */
  duration?: number;
  /** Perspective value for the 3D flip effect in pixels. */
  perspective?: number;
  /** Easing curve for the animation. */
  easing?: Easing;
}

/**
 * PageFlip — 3D page flip transition using rotateY.
 * Applies a perspective container and rotates the page in/out on the Y axis.
 *
 * Usage:
 *   <PageFlip duration={0.5} perspective={1200}>
 *     <YourPageContent />
 *   </PageFlip>
 */
export function PageFlip({
  children,
  duration = 0.5,
  perspective = 1200,
  easing = 'easeInOut',
}: PageFlipProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="page-flip"
        initial={{ rotateY: -90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        exit={{ rotateY: 90, opacity: 0 }}
        transition={{ duration, ease: easing }}
        style={{
          width: '100%',
          height: '100%',
          perspective: `${perspective}px`,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
