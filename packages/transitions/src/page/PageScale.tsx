'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Easing } from 'framer-motion';
import type { ReactNode } from 'react';

export interface PageScaleProps {
  children: ReactNode;
  /** Initial scale value for the enter animation. */
  from?: number;
  /** Duration of the animation in seconds. */
  duration?: number;
  /** Easing curve for the animation. */
  easing?: Easing;
}

/**
 * PageScale — Scale + fade transition between pages.
 * Pages enter by scaling up from the `from` value while fading in.
 *
 * Usage:
 *   <PageScale from={0.95} duration={0.3}>
 *     <YourPageContent />
 *   </PageScale>
 */
export function PageScale({
  children,
  from = 0.95,
  duration = 0.3,
  easing = 'easeOut',
}: PageScaleProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="page-scale"
        initial={{ scale: from, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: from, opacity: 0 }}
        transition={{ duration, ease: easing }}
        style={{ width: '100%', height: '100%', transformOrigin: 'center center' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
