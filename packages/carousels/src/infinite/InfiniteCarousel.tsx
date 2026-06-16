'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

export interface InfiniteCarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  speed?: 'slow' | 'normal' | 'fast';
  autoplay?: boolean;
  pauseOnHover?: boolean;
  direction?: 'ltr' | 'rtl';
  className?: string;
  itemClassName?: string;
}

const speedMap = {
  slow: 40,
  normal: 25,
  fast: 12,
};

export function InfiniteCarousel<T>({
  items,
  renderItem,
  speed = 'normal',
  autoplay = true,
  pauseOnHover = true,
  direction = 'ltr',
  className = '',
  itemClassName = '',
}: InfiniteCarouselProps<T>) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Triple the items for seamless infinite loop
  const tripled = [...items, ...items, ...items];
  const duration = speedMap[speed];
  const isRTL = direction === 'rtl';

  const animationName = isRTL
    ? 'carousel-scroll-rtl'
    : 'carousel-scroll-ltr';

  const pausedState = isPaused || !autoplay;

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
  }, []);

  useEffect(() => {
    const styleId = 'infinite-carousel-keyframes';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes carousel-scroll-ltr {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        @keyframes carousel-scroll-rtl {
          0% { transform: translateX(-33.3333%); }
          100% { transform: translateX(0); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div
      className={`infinite-carousel ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        overflow: 'hidden',
        width: '100%',
      }}
      role="marquee"
      aria-label="Infinite carousel"
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          width: 'max-content',
          animation: `${animationName} ${duration}s linear infinite`,
          animationPlayState: pausedState ? 'paused' : 'running',
          willChange: 'transform',
        }}
      >
        {tripled.map((item, index) => (
          <div
            key={`item-${index}`}
            className={itemClassName}
            style={{ flexShrink: 0 }}
          >
            {renderItem(item, index % items.length)}
          </div>
        ))}
      </div>
    </div>
  );
}
