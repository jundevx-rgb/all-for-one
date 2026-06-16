'use client';

import { motion } from 'framer-motion';

export interface SpinnerProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  label?: string;
  className?: string;
}

export function Spinner({
  size = 32,
  color = 'currentColor',
  strokeWidth = 3,
  label = 'Loading',
  className,
}: SpinnerProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className={className} role="status" aria-label={label}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ display: 'block' }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeOpacity={0.2}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.75}
          animate={{
            strokeDashoffset: [circumference, circumference * 0.25, circumference],
            rotate: [0, 360],
          }}
          transition={{
            strokeDashoffset: {
              duration: 1.5,
              ease: 'easeInOut',
              repeat: Infinity,
            },
            rotate: {
              duration: 1.5,
              ease: 'linear',
              repeat: Infinity,
            },
          }}
          style={{
            transformOrigin: 'center',
          }}
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
}
