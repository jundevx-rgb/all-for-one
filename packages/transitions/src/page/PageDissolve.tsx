'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Easing } from 'framer-motion';
import type { ReactNode } from 'react';

export interface PageDissolveProps {
  children: ReactNode;
  /** Amount of blur applied during the dissolve in pixels. */
  blurAmount?: number;
  /** Duration of the animation in seconds. */
  duration?: number;
  /** Easing curve for the animation. */
  easing?: Easing;
}

/**
 * PageDissolve — Dissolve transition with blur effect.
 * Pages fade out/in while applying a CSS blur filter for a smooth dissolve.
 *
 * Usage:
 *   <PageDissolve blurAmount={8} duration={0.4}>
 *     <YourPageContent />
 *   </PageDissolve>
 */
export function PageDissolve({
  children,
  blurAmount = 8,
  duration = 0.4,
  easing = 'easeInOut',
}: PageDissolveProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="page-dissolve"
        initial={{ opacity: 0, filter: `blur(${blurAmount}px)` }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, filter: `blur(${blurAmount}px)` }}
        transition={{ duration, ease: easing }}
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
