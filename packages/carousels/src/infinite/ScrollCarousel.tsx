'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

export interface ScrollCarouselProps {
  children: React.ReactNode;
  snapAlign?: 'start' | 'center' | 'end';
  gap?: number | string;
  className?: string;
  itemClassName?: string;
}

export function ScrollCarousel({
  children,
  snapAlign = 'center',
  gap = 16,
  className = '',
  itemClassName = '',
}: ScrollCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const checkOverflow = () => {
      setShowArrows(el.scrollWidth > el.clientWidth);
    };
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  const scrollBy = useCallback((direction: 'left' | 'right') => {
    const el = containerRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div
      className={`scroll-carousel ${className}`}
      style={{ position: 'relative' }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Scroll carousel"
    >
      {showArrows && (
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scrollBy('left')}
          style={{
            position: 'absolute',
            left: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: 'rgba(0,0,0,0.5)',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: 40,
            height: 40,
            cursor: 'pointer',
            fontSize: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ‹
        </button>
      )}

      <div
        ref={containerRef}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          gap: typeof gap === 'number' ? `${gap}px` : gap,
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          padding: '4px 0',
        }}
        className="scroll-carousel__track"
      >
        {React.Children.map(children, (child, index) => (
          <div
            className={itemClassName}
            style={{
              scrollSnapAlign: snapAlign,
              scrollSnapStop: 'always',
              flexShrink: 0,
            }}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1}`}
          >
            {child}
          </div>
        ))}
      </div>

      {showArrows && (
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scrollBy('right')}
          style={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: 'rgba(0,0,0,0.5)',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: 40,
            height: 40,
            cursor: 'pointer',
            fontSize: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ›
        </button>
      )}
    </div>
  );
}
