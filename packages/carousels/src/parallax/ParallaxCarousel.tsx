'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export interface ParallaxCarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number, offset: number) => React.ReactNode;
  parallaxStrength?: number;
  className?: string;
  itemWidth?: number;
  gap?: number;
}

export function ParallaxCarousel<T>({
  items,
  renderItem,
  parallaxStrength = 0.4,
  className = '',
  itemWidth = 320,
  gap = 20,
}: ParallaxCarouselProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useMotionValue(0);
  useSpring(scrollX, { stiffness: 200, damping: 30 });

  const handleGoTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(items.length - 1, index));
    setActiveIndex(clamped);
    scrollX.set(-clamped * (itemWidth + gap));
  }, [items.length, itemWidth, gap, scrollX]);

  const goNext = useCallback(() => {
    const next = Math.min(items.length - 1, activeIndex + 1);
    handleGoTo(next);
  }, [activeIndex, items.length, handleGoTo]);

  const goPrev = useCallback(() => {
    const prev = Math.max(0, activeIndex - 1);
    handleGoTo(prev);
  }, [activeIndex, handleGoTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goPrev, goNext]);

  return (
    <div
      ref={containerRef}
      className={`parallax-carousel ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        minHeight: 400,
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Parallax carousel"
    >
      <button
        type="button"
        aria-label="Previous slide"
        onClick={goPrev}
        disabled={activeIndex === 0}
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
          opacity: activeIndex === 0 ? 0.3 : 1,
        }}
      >
        ‹
      </button>

      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          minHeight: 360,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '800px',
        }}
      >
        {items.map((item, index) => {
          const offset = index - activeIndex;
          const isActive = offset === 0;

          // Parallax transforms based on distance from center
          const translateY = isActive ? 0 : offset * 40;
          const scale = isActive ? 1 : Math.max(0.7, 1 - Math.abs(offset) * 0.1);
          const opacity = isActive ? 1 : Math.max(0.3, 1 - Math.abs(offset) * 0.35);
          const rotateY = isActive ? 0 : -offset * 15;
          const zIndex = items.length - Math.abs(offset);

          // Parallax offset for inner content
          const parallaxOffset = offset * parallaxStrength;

          return (
            <motion.div
              key={index}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${items.length}`}
              animate={{
                x: offset * (itemWidth + gap),
                y: translateY,
                scale,
                opacity,
                rotateY,
                zIndex,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
              }}
              style={{
                position: 'absolute',
                width: `${itemWidth}px`,
                transformStyle: 'preserve-3d',
                pointerEvents: isActive ? 'auto' : 'none',
              }}
            >
              {renderItem(item, index, parallaxOffset)}
            </motion.div>
          );
        })}
      </div>

      <button
        type="button"
        aria-label="Next slide"
        onClick={goNext}
        disabled={activeIndex === items.length - 1}
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
          opacity: activeIndex === items.length - 1 ? 0.3 : 1,
        }}
      >
        ›
      </button>

      {/* Dot indicators */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          marginTop: 16,
        }}
        role="tablist"
        aria-label="Parallax carousel navigation"
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
