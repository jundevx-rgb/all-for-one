'use client';

import { useEffect, useRef, useState } from 'react';

export interface ScrambleTextProps {
  text: string;
  speed?: number;
  characters?: string;
  scrambleLength?: number;
  className?: string;
  trigger?: 'hover' | 'visible' | 'manual';
  onScrambleComplete?: () => void;
}

const defaultCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export function ScrambleText({
  text,
  speed = 30,
  characters = defaultCharacters,
  scrambleLength = 1,
  className,
  trigger = 'visible',
  onScrambleComplete,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const hasTriggered = useRef(false);

  const getRandomChar = () =>
    characters[Math.floor(Math.random() * characters.length)];

  const scramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    hasTriggered.current = true;

    let iteration = 0;
    const length = text.length;

    intervalRef.current = setInterval(() => {
      const scrambled = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration) return text[index];
          return Array(scrambleLength)
            .fill(null)
            .map(() => getRandomChar())
            .join('');
        })
        .join('');

      setDisplayText(scrambled);

      if (iteration >= length) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setDisplayText(text);
        onScrambleComplete?.();
      }

      iteration += 1 / 3;
    }, speed);
  };

  useEffect(() => {
    if (trigger !== 'visible') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          scramble();
        }
      },
      { threshold: 0.5 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [trigger, text, speed, characters, scrambleLength, onScrambleComplete]);

  useEffect(() => {
    if (trigger !== 'visible' || hasTriggered.current) return;

    const timer = setTimeout(() => scramble(), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleHover = trigger === 'hover' ? { onMouseEnter: scramble } : {};

  return (
    <span
      ref={elementRef}
      className={className}
      style={{ display: 'inline-block', fontFamily: 'monospace' }}
      {...handleHover}
    >
      {displayText || text.split('').map(() => getRandomChar()).join('').substring(0, scrambleLength * text.length)}
    </span>
  );
}
