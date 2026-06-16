'use client';

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { useCallback, useRef, type ReactNode, type CSSProperties } from 'react';

export interface TiltCardProps {
  children: ReactNode;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  glare?: boolean;
  glareColor?: string;
  glareOpacity?: number;
  className?: string;
  style?: CSSProperties;
}

export function TiltCard({
  children,
  maxTilt = 15,
  perspective = 1000,
  scale = 1.05,
  glare = false,
  glareColor = '#ffffff',
  glareOpacity = 0.2,
  className,
  style,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const springConfig = { damping: 20, stiffness: 150 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  const glareX = useTransform(x, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(y, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current || prefersReducedMotion) return;
      const rect = ref.current.getBoundingClientRect();
      const posX = (e.clientX - rect.left) / rect.width;
      const posY = (e.clientY - rect.top) / rect.height;
      x.set(posX);
      y.set(posY);
    },
    [x, y, prefersReducedMotion],
  );

  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion) return;
    x.set(0.5);
    y.set(0.5);
  }, [x, y, prefersReducedMotion]);

  const containerStyle: CSSProperties = {
    perspective: `${perspective}px`,
    transformStyle: 'preserve-3d',
    ...style,
  };

  if (prefersReducedMotion) {
    return (
      <div className={className} style={containerStyle}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={containerStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <motion.div
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {children}
        {glare && (
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at ${glareX} ${glareY}, ${glareColor}22 0%, transparent 70%)`,
              opacity: glareOpacity,
              pointerEvents: 'none',
              borderRadius: 'inherit',
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
