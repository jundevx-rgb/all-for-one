'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import type { PageFadeProps } from '../page/PageFade';
import type { PageSlideProps, SlideDirection } from '../page/PageSlide';
import type { PageScaleProps } from '../page/PageScale';
import type { PageDissolveProps } from '../page/PageDissolve';
import type { PageFlipProps } from '../page/PageFlip';

export type TransitionComponent =
  | 'fade'
  | 'slide'
  | 'scale'
  | 'dissolve'
  | 'flip';

export interface RouteTransitionProps {
  children: ReactNode;
  /** Transition type to apply on route change. */
  transition?: TransitionComponent;
  /** Custom props forwarded to the underlying page transition component. */
  customProps?: {
    duration?: number;
    exitDuration?: number;
    direction?: SlideDirection;
    from?: number;
    blurAmount?: number;
    perspective?: number;
    easing?: Easing;
  };
}

/**
 * RouteTransition — Next.js route transition wrapper.
 * Combines location-based keying with a chosen page transition component.
 * Drop this into your layout to animate every route change.
 *
 * Usage (layout.tsx):
 *   <RouteTransition transition="fade" customProps={{ duration: 0.3 }}>
 *     {children}
 *   </RouteTransition>
 */
export function RouteTransition({
  children,
  transition = 'fade',
  customProps,
}: RouteTransitionProps) {
  const pathname = usePathname();

  const dur = customProps?.duration;
  const ease = customProps?.easing;
  const exitDur = customProps?.exitDuration;
  const dir = customProps?.direction;
  const from = customProps?.from;
  const blur = customProps?.blurAmount;
  const pers = customProps?.perspective;

  switch (transition) {
    case 'fade':
      return (
        <FadeTransition key={pathname} duration={dur} exitDuration={exitDur} easing={ease}>
          {children}
        </FadeTransition>
      );
    case 'slide':
      return (
        <SlideTransition key={pathname} duration={dur} direction={dir} easing={ease}>
          {children}
        </SlideTransition>
      );
    case 'scale':
      return (
        <ScaleTransition key={pathname} from={from} duration={dur} easing={ease}>
          {children}
        </ScaleTransition>
      );
    case 'dissolve':
      return (
        <DissolveTransition key={pathname} blurAmount={blur} duration={dur} easing={ease}>
          {children}
        </DissolveTransition>
      );
    case 'flip':
      return (
        <FlipTransition key={pathname} duration={dur} perspective={pers} easing={ease}>
          {children}
        </FlipTransition>
      );
    default:
      return <>{children}</>;
  }
}

// --- Inline lightweight wrappers ------------------------------------------------

function FadeTransition({
  children,
  duration,
  exitDuration: _exitDuration,
  easing,
}: Partial<PageFadeProps>) {
  const dur = duration ?? 0.4;
  const ease = easing ?? 'easeInOut';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: dur, ease }}
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function SlideTransition({
  children,
  duration,
  direction,
  easing,
}: Partial<PageSlideProps>) {
  const dur = duration ?? 0.35;
  const dir = direction ?? 'forward';
  const ease = easing ?? 'easeInOut';
  const isForward = dir === 'forward';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ x: isForward ? '100%' : '-100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: isForward ? '-30%' : '30%', opacity: 0 }}
        transition={{ duration: dur, ease }}
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function ScaleTransition({
  children,
  from,
  duration,
  easing,
}: Partial<PageScaleProps>) {
  const scaleFrom = from ?? 0.95;
  const dur = duration ?? 0.3;
  const ease = easing ?? 'easeOut';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ scale: scaleFrom, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: scaleFrom, opacity: 0 }}
        transition={{ duration: dur, ease }}
        style={{ width: '100%', height: '100%', transformOrigin: 'center center' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function DissolveTransition({
  children,
  blurAmount,
  duration,
  easing,
}: Partial<PageDissolveProps>) {
  const blur = blurAmount ?? 8;
  const dur = duration ?? 0.4;
  const ease = easing ?? 'easeInOut';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, filter: `blur(${blur}px)` }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, filter: `blur(${blur}px)` }}
        transition={{ duration: dur, ease }}
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function FlipTransition({
  children,
  duration,
  perspective,
  easing,
}: Partial<PageFlipProps>) {
  const dur = duration ?? 0.5;
  const pers = perspective ?? 1200;
  const ease = easing ?? 'easeInOut';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ rotateY: -90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        exit={{ rotateY: 90, opacity: 0 }}
        transition={{ duration: dur, ease }}
        style={{
          width: '100%',
          height: '100%',
          perspective: `${pers}px`,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
