'use client';

import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, type ReactNode } from 'react';

export interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  className?: string;
  as?: React.ElementType;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  strength = 0.3,
  className,
  as: Component = 'button',
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const controls = useAnimationControls();

  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      if (!ref.current || prefersReducedMotion) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      controls.start({
        x: deltaX,
        y: deltaY,
        transition: { type: 'spring', stiffness: 150, damping: 15, mass: 0.1 },
      });
    },
    [strength, prefersReducedMotion, controls],
  );

  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion) return;
    controls.start({
      x: 0,
      y: 0,
      transition: { type: 'spring', stiffness: 200, damping: 20, mass: 0.1 },
    });
  }, [prefersReducedMotion, controls]);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion) return;

    element.addEventListener('mousemove', handleMouseMove as EventListener);
    element.addEventListener('mouseleave', handleMouseLeave as EventListener);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove as EventListener);
      element.removeEventListener('mouseleave', handleMouseLeave as EventListener);
    };
  }, [handleMouseMove, handleMouseLeave, prefersReducedMotion]);

  const MotionComponent = motion(Component as React.ComponentType<React.HTMLAttributes<HTMLElement>>);

  return (
    <MotionComponent
      ref={ref}
      animate={controls}
      className={className}
      onClick={onClick}
      style={{ display: 'inline-flex', cursor: 'pointer' }}
    >
      {children}
    </MotionComponent>
  );
}
