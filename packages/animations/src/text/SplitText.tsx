'use client';

import { motion, type Variants, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';

export type SplitBy = 'chars' | 'words' | 'lines';

export interface SplitTextAnimation {
  hidden?: Record<string, unknown>;
  visible?: Record<string, unknown>;
}

export interface SplitTextProps {
  text: string;
  by?: SplitBy;
  animation?: 'fade' | 'fade-up' | 'fade-down' | 'slide-left' | 'slide-right' | 'scale' | 'blur';
  stagger?: number;
  className?: string;
  wordClassName?: string;
  charClassName?: string;
  lineClassName?: string;
  containerClassName?: string;
  as?: React.ElementType;
}

const defaultAnimations: Record<string, SplitTextAnimation> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'fade-up': {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-down': {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  'slide-left': {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-right': {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(8px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
};

function splitByChars(text: string): string[] {
  return text.split('');
}

function splitByWords(text: string): string[] {
  return text.split(' ');
}

function splitByLines(text: string): string[][] {
  return text.split('\n').map((line) => line.split(' '));
}

export function SplitText({
  text,
  by = 'chars',
  animation = 'fade-up',
  stagger = 0.03,
  className,
  wordClassName,
  charClassName,
  lineClassName,
  containerClassName,
  as: Component = 'span',
}: SplitTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const variants = defaultAnimations[animation];

  const containerVariants = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: stagger,
        },
      },
    }),
    [stagger],
  );

  const itemVariants: Variants = useMemo(
    () => ({
      hidden: variants.hidden ?? {},
      visible: {
        ...(variants.visible ?? {}),
        transition: {
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    }),
    [variants],
  );

  if (prefersReducedMotion) {
    return <Component className={className}>{text}</Component>;
  }

  const renderContent = () => {
    switch (by) {
      case 'chars': {
        const chars = splitByChars(text);
        return chars.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            variants={itemVariants}
            className={charClassName}
            style={{ display: 'inline-block' }}
            aria-hidden="true"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ));
      }
      case 'words': {
        const words = splitByWords(text);
        return words.map((word, wordIndex) => (
          <motion.span
            key={`${word}-${wordIndex}`}
            variants={itemVariants}
            className={wordClassName}
            style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
            aria-hidden="true"
          >
            {word}
            {wordIndex < words.length - 1 && '\u00A0'}
          </motion.span>
        ));
      }
      case 'lines': {
        const lines = splitByLines(text);
        return lines.map((line, lineIndex) => (
          <motion.span
            key={`line-${lineIndex}`}
            variants={itemVariants}
            className={lineClassName}
            style={{ display: 'block' }}
            aria-hidden="true"
          >
            {line.map((word, wordIndex) => (
              <motion.span
                key={`${word}-${lineIndex}-${wordIndex}`}
                variants={itemVariants}
                className={wordClassName}
                style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
                aria-hidden="true"
              >
                {word}
                {wordIndex < line.length - 1 && '\u00A0'}
              </motion.span>
            ))}
          </motion.span>
        ));
      }
      default:
        return text;
    }
  };

  return (
    <Component className={containerClassName}>
      <motion.span
        className={className}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        role="presentation"
      >
        {renderContent()}
      </motion.span>
      <span className="sr-only">{text}</span>
    </Component>
  );
}
