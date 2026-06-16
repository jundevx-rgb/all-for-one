'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface Carousel3DProps<T> {
  items: T[];
  renderItem: (item: T, index: number, isActive: boolean) => React.ReactNode;
  radius?: number;
  rotationSpeed?: number;
  autoplay?: boolean;
  className?: string;
  itemWidth?: number;
  itemHeight?: number;
}

export function Carousel3D<T>({
  items,
  renderItem,
  radius = 400,
  rotationSpeed = 1,
  autoplay = true,
  className = '',
  itemWidth = 280,
  itemHeight = 200,
}: Carousel3DProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number | null>(null);

  const angleStep = 360 / items.length;

  const startAutoRotation = useCallback(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    const animate = () => {
      setRotation((prev) => {
        const next = prev + rotationSpeed * 0.5;
        const normalized = ((next % 360) + 360) % 360;
        // Determine active index based on rotation
        const newIndex = Math.round(normalized / angleStep) % items.length;
        if (newIndex !== activeIndex) {
          setActiveIndex(newIndex);
        }
        return normalized;
      });
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
  }, [rotationSpeed, items.length, angleStep, activeIndex]);

  useEffect(() => {
    if (isPlaying) {
      startAutoRotation();
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, startAutoRotation]);

  const goTo = useCallback((index: number) => {
    const targetRotation = -index * angleStep;
    setRotation(targetRotation);
    setActiveIndex(index);
    if (isPlaying) startAutoRotation();
  }, [angleStep, isPlaying, startAutoRotation]);

  const goNext = useCallback(() => {
    const next = (activeIndex + 1) % items.length;
    goTo(next);
  }, [activeIndex, items.length, goTo]);

  const goPrev = useCallback(() => {
    const prev = (activeIndex - 1 + items.length) % items.length;
    goTo(prev);
  }, [activeIndex, items.length, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goPrev, goNext]);

  return (
    <div
      ref={containerRef}
      className={`carousel-3d ${className}`}
      style={{
        perspective: '1200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: `${itemHeight + 80}px`,
        position: 'relative',
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="3D carousel"
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
          zIndex: 10,
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
          transformStyle: 'preserve-3d',
          width: `${itemWidth}px`,
          height: `${itemHeight}px`,
          position: 'relative',
          transform: `rotateY(${rotation}deg)`,
          transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {items.map((item, index) => {
          const angle = index * angleStep;
          return (
            <div
              key={index}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${items.length}`}
              style={{
                position: 'absolute',
                width: `${itemWidth}px`,
                height: `${itemHeight}px`,
                left: 0,
                top: 0,
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                backfaceVisibility: 'hidden',
              }}
            >
              {renderItem(item, index, index === activeIndex)}
            </div>
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
          zIndex: 10,
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
          display: 'flex',
          gap: 8,
          marginTop: 24,
        }}
        role="tablist"
        aria-label="3D carousel navigation"
      >
        {items.map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goTo(index)}
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

      {/* Play/Pause button */}
      <button
        type="button"
        aria-label={isPlaying ? 'Pause autoplay' : 'Play autoplay'}
        onClick={() => setIsPlaying((p) => !p)}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          background: 'rgba(0,0,0,0.4)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '4px 12px',
          cursor: 'pointer',
          fontSize: 12,
        }}
      >
        {isPlaying ? '⏸ Pause' : '▶ Play'}
      </button>
    </div>
  );
}
