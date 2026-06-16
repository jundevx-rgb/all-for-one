'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useRef, useState, useCallback, type ReactNode } from 'react';

export type SlideDirection = 'forward' | 'backward' | 'auto';

export interface PageSlideProps {
  children: ReactNode;
  /** Duration of the animation in seconds. */
  duration?: number;
  /**
   * Direction behavior:
   * - 'auto': Automatically detects forward/backward based on route history.
   * - 'forward': Forces slide from right to left.
   * - 'backward': Forces slide from left to right.
   */
  direction?: SlideDirection;
  /** Easing curve for the animation. */
  easing?: Easing;
}

/**
 * PageSlide — Direction-aware slide transition between pages.
 * When direction='auto', tracks navigation history to determine slide direction:
 * forward slides right→left, backward slides left→right.
 *
 * Usage:
 *   <PageSlide direction="auto" duration={0.35}>
 *     <YourPageContent />
 *   </PageSlide>
 */
export function PageSlide({
  children,
  duration = 0.35,
  direction = 'auto',
  easing = 'easeInOut',
}: PageSlideProps) {
  const historyRef = useRef<string[]>([]);
  const [navDirection, setNavDirection] = useState<'forward' | 'backward'>(
    'forward',
  );

  const onEnter = useCallback(
    (node: HTMLElement | null) => {
      if (!node || direction !== 'auto') return;

      const currentKey = node.getAttribute('data-page-key');
      if (currentKey) {
        const history = historyRef.current;
        const currentIndex = history.indexOf(currentKey);

        if (currentIndex === -1) {
          history.push(currentKey);
          setNavDirection('forward');
        } else if (currentIndex < history.length - 1) {
          history.splice(currentIndex + 1);
          history.push(currentKey);
          setNavDirection('forward');
        } else {
          history.pop();
          setNavDirection('backward');
        }
      }
    },
    [direction],
  );

  const isForward = direction === 'auto' ? navDirection === 'forward' : direction === 'forward';

  const variants = {
    initial: {
      x: isForward ? '100%' : '-100%',
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: isForward ? '-30%' : '30%',
      opacity: 0,
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="page-slide"
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration, ease: easing }}
        ref={onEnter}
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
