'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface CoverFlowProps<T> {
  items: T[];
  renderItem: (item: T, index: number, isActive: boolean) => React.ReactNode;
  angle?: number;
  spacing?: number;
  scale?: number;
  className?: string;
  itemWidth?: number;
  itemHeight?: number;
  autoplay?: boolean;
  autoplayInterval?: number;
}

export function CoverFlow<T>({
  items,
  renderItem,
  angle = 45,
  spacing = 100,
  scale = 0.8,
  className = '',
  itemWidth = 300,
  itemHeight = 200,
  autoplay = false,
  autoplayInterval = 3000,
}: CoverFlowProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(Math.floor(items.length / 2));

  const handleGoTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(items.length - 1, index));
    setActiveIndex(clamped);
  }, [items.length]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goPrev, goNext]);

  // Autoplay
  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(goNext, autoplayInterval);
    return () => clearInterval(timer);
  }, [autoplay, autoplayInterval, goNext]);

  return (
    <div
      ref={containerRef}
      className={`coverflow ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        minHeight: `${itemHeight + 80}px`,
        overflow: 'hidden',
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="CoverFlow carousel"
    >
      <button
        type="button"
        aria-label="Previous slide"
        onClick={goPrev}
        style={{
          position: 'absolute',
          left: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          background: 'rgba(0,0,0,0.6)',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: 44,
          height: 44,
          cursor: 'pointer',
          fontSize: 20,
        }}
      >
        ‹
      </button>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          width: `${itemWidth}px`,
          height: `${itemHeight}px`,
          perspective: '1000px',
        }}
      >
        {items.map((item, index) => {
          const offset = index - activeIndex;
          const isActive = offset === 0;
          const absOffset = Math.abs(offset);

          // Hide items too far away
          if (absOffset > 4) return null;

          const rotationY = offset > 0 ? -angle : offset < 0 ? angle : 0;
          const translateX = offset * spacing;
          const itemScale = isActive ? 1 : scale;
          const opacity = absOffset > 2 ? 0 : absOffset > 1 ? 0.5 : 1;
          const zIndex = items.length - absOffset;

          return (
            <motion.div
              key={index}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${items.length}`}
              animate={{
                rotateY: rotationY,
                x: translateX,
                scale: itemScale,
                opacity,
                zIndex,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              style={{
                position: 'absolute',
                width: `${itemWidth}px`,
                height: `${itemHeight}px`,
                transformStyle: 'preserve-3d',
                cursor: isActive ? 'default' : 'pointer',
                left: 0,
                top: 0,
              }}
              onClick={() => {
                if (!isActive) handleGoTo(index);
              }}
            >
              {renderItem(item, index, isActive)}
            </motion.div>
          );
        })}
      </div>

      <button
        type="button"
        aria-label="Next slide"
        onClick={goNext}
        style={{
          position: 'absolute',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          background: 'rgba(0,0,0,0.6)',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: 44,
          height: 44,
          cursor: 'pointer',
          fontSize: 20,
        }}
      >
        ›
      </button>

      {/* Dot indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 8,
        }}
        role="tablist"
        aria-label="CoverFlow navigation"
      >
        {items.map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => handleGoTo(index)}
            style={{
              width: index === activeIndex ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: index === activeIndex ? '#000' : '#ccc',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}
