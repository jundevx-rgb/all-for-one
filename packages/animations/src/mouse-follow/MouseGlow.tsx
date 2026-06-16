'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCallback, useEffect } from 'react';

export interface MouseGlowProps {
  size?: number;
  color?: string;
  opacity?: number;
  zIndex?: number;
  blur?: number;
}

export function MouseGlow({
  size = 400,
  color = '#3b82f6',
  opacity = 0.15,
  zIndex = 0,
  blur = 80,
}: MouseGlowProps) {
  const mouseX = useMotionValue(-size);
  const mouseY = useMotionValue(-size);

  const springConfig = { damping: 30, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: size,
        height: size,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex,
        x: useTransform(smoothX, (v) => v - size / 2),
        y: useTransform(smoothY, (v) => v - size / 2),
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        filter: `blur(${blur}px)`,
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  );
}
