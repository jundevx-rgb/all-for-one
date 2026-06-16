'use client';

import { motion } from 'framer-motion';

export type SkeletonVariant = 'rect' | 'circle' | 'text';
export type SkeletonAnimation = 'pulse' | 'wave';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  animation?: SkeletonAnimation;
  className?: string;
  'aria-busy'?: boolean;
}

export function Skeleton({
  variant = 'rect',
  width = '100%',
  height = 20,
  animation = 'pulse',
  className,
  ...rest
}: SkeletonProps) {
  const borderRadius = variant === 'circle' ? '50%' : variant === 'text' ? '4px' : '4px';

  const widthValue = typeof width === 'number' ? `${width}px` : width;
  const heightValue = typeof height === 'number' ? `${height}px` : height;

  if (animation === 'pulse') {
    return (
      <motion.div
        className={className}
        style={{
          width: widthValue,
          height: heightValue,
          borderRadius,
          backgroundColor: 'rgba(0, 0, 0, 0.06)',
        }}
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{
          duration: 1.5,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
        role="progressbar"
        aria-busy={true}
        aria-label="Loading"
        {...rest}
      />
    );
  }

  // Wave animation
  return (
    <motion.div
      className={className}
      style={{
        width: widthValue,
        height: heightValue,
        borderRadius,
        backgroundColor: 'rgba(0, 0, 0, 0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
      role="progressbar"
      aria-busy={true}
      aria-label="Loading"
      {...rest}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
        }}
        animate={{ x: ['-100%', '100%'] }}
        transition={{
          duration: 1.5,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
}
