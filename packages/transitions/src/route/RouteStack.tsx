'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState, type ReactNode } from 'react';

export type StackMode = 'pop' | 'push';

export interface RouteStackProps {
  children: ReactNode;
  /** Maximum number of pages to keep in the stack. */
  maxStack?: number;
  /**
   * Navigation mode:
   * - 'push': New pages are pushed on top of the stack.
   * - 'pop': Navigating back pops the current page off the stack.
   */
  mode?: StackMode;
  /** Duration of the slide animation in seconds. */
  duration?: number;
}

/**
 * RouteStack — Stack-based navigation where pages stack on top of each other.
 * Maintains a route stack in state and animates transitions accordingly.
 * Useful for modal-like navigation, deep-linkable stacks, or drill-down UIs.
 *
 * Usage:
 *   <RouteStack maxStack={5} mode="push" duration={0.3}>
 *     {children}
 *   </RouteStack>
 */
export function RouteStack({
  children,
  maxStack = 5,
  mode = 'push',
  duration = 0.3,
}: RouteStackProps) {
  const pathname = usePathname();
  const [stack, setStack] = useState<string[]>([pathname]);

  // Update stack on pathname change
  const currentPath = pathname;
  const prevTop = stack[stack.length - 1];

  if (currentPath !== prevTop) {
    if (mode === 'push') {
      setStack((prev) => {
        const newStack = [...prev, currentPath];
        if (newStack.length > maxStack) {
          return newStack.slice(newStack.length - maxStack);
        }
        return newStack;
      });
    } else {
      const existingIndex = stack.indexOf(currentPath);
      if (existingIndex !== -1) {
        setStack((prev) => prev.slice(0, existingIndex + 1));
      } else {
        setStack([currentPath]);
      }
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {stack.map((path) => (
        <motion.div
          key={path}
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-30%', opacity: 0 }}
          transition={{ duration, ease: 'easeInOut' }}
          style={{
            position: path === currentPath ? 'relative' : 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: path === currentPath ? 'auto' : 'none',
          }}
        >
          {path === currentPath && children}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
