'use client';

import { useEffect, useState, useCallback } from 'react';

export interface TypewriterProps {
  text: string;
  speed?: number;
  cursor?: boolean;
  cursorChar?: string;
  loop?: boolean;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export function Typewriter({
  text,
  speed = 50,
  cursor = true,
  cursorChar = '|',
  loop = false,
  delay = 0,
  className,
  onComplete,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const typeCharacter = useCallback(() => {
    if (currentIndex < text.length) {
      setDisplayedText((prev) => prev + text[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsComplete(true);
      onComplete?.();

      if (loop) {
        setTimeout(() => {
          setDisplayedText('');
          setCurrentIndex(0);
          setIsComplete(false);
        }, 1500);
      }
    }
  }, [currentIndex, text, loop, onComplete]);

  useEffect(() => {
    if (isComplete) return;

    const initialTimeout = setTimeout(() => {
      const interval = setInterval(typeCharacter, speed);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(initialTimeout);
  }, [typeCharacter, speed, delay, isComplete]);

  return (
    <span className={className}>
      {displayedText}
      {cursor && <span aria-hidden="true">{cursorChar}</span>}
    </span>
  );
}
