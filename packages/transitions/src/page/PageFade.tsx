'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Easing } from 'framer-motion';
import type { ReactNode } from 'react';

export interface PageFadeProps {
  children: ReactNode;
  /** Duration of the enter animation in seconds. */
  duration?: number;
  /** Duration of the exit animation in seconds. Defaults to duration. */
  exitDuration?: number;
  /** Easing curve for the animation. */
  easing?: Easing;
}

/**
 * PageFade — Fade transition between pages.
 * Wraps children in AnimatePresence and applies opacity-based enter/exit transitions.
 *
 * Usage:
 *   <PageFade duration={0.4}>
 *     <YourPageContent />
 *   </PageFade>
 */
export function PageFade({
  children,
  duration = 0.4,
  exitDuration,
  easing = 'easeInOut',
}: PageFadeProps) {
  const exit = exitDuration ?? duration;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="page-fade"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration,
          ease: easing,
          exit: { duration: exit, ease: easing },
        }}
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
