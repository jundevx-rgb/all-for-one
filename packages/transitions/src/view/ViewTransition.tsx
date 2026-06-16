'use client';

import { useCallback, useEffect, useRef, type ReactNode } from 'react';

export interface ViewTransitionProps {
  children: ReactNode;
  /**
   * Unique name for this view transition element.
   * Maps to CSS `view-transition-name` property.
   * Elements with the same name across navigations will animate between states.
   */
  name: string;
  /**
   * Whether the View Transitions API is available in this browser.
   * Auto-detected; override for testing.
   */
  supported?: boolean;
  /** Additional CSS class names. */
  className?: string;
}

declare global {
  interface Document {
    startViewTransition?: (callback: () => Promise<void> | void) => {
      ready: Promise<void>;
      finished: Promise<void>;
      updateCallbackDone: Promise<void>;
    };
  }
}

/**
 * ViewTransition — Native View Transitions API wrapper.
 *
 * Wraps content in a div with `view-transition-name` CSS property,
 * enabling the browser to animate shared elements across page navigations.
 *
 * Chrome 111+, Edge 111+, Opera 97+. Falls back to static rendering on unsupported browsers.
 *
 * Usage:
 *   <ViewTransition name="hero-image">
 *     <img src="/hero.jpg" alt="Hero" />
 *   </ViewTransition>
 *
 * Shared across routes — same `name` on two pages = animated transition.
 */
export function ViewTransition({
  children,
  name,
  supported: supportedOverride,
  className,
}: ViewTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isSupported =
    supportedOverride ?? (typeof document !== 'undefined' && !!document.startViewTransition);

  useEffect(() => {
    if (!ref.current || !isSupported) return;

    // Apply view-transition-name CSS property
    ref.current.style.setProperty('view-transition-name', name);
    ref.current.style.setProperty('contain', 'layout');

    return () => {
      ref.current?.style.removeProperty('view-transition-name');
      ref.current?.style.removeProperty('contain');
    };
  }, [name, isSupported]);

  return (
    <div ref={ref} className={className} data-vt-name={name}>
      {children}
    </div>
  );
}

/**
 * useViewTransition — Hook to trigger a view transition manually.
 *
 * Returns a `startTransition` function that wraps a DOM update
 * in `document.startViewTransition()`, animating any elements
 * with `view-transition-name` set.
 *
 * Usage:
 *   const { startTransition } = useViewTransition();
 *   startTransition(() => setPage('detail'));
 */
export function useViewTransition() {
  const isSupported =
    typeof document !== 'undefined' && !!document.startViewTransition;

  const startTransition = useCallback(
    async (callback: () => void) => {
      if (!isSupported || !document.startViewTransition) {
        callback();
        return;
      }

      await document.startViewTransition(() => {
        callback();
        // Return a microtask to ensure DOM updates are committed
        return new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      }).ready;
    },
    [isSupported],
  );

  return { startTransition, isSupported };
}

/**
 * supportsViewTransitions — Whether the browser supports the View Transitions API.
 */
export function supportsViewTransitions(): boolean {
  return typeof document !== 'undefined' && !!document.startViewTransition;
}
