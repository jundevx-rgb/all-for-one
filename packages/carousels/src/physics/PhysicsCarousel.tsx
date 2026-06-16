'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export interface PhysicsCarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number, isActive: boolean) => React.ReactNode;
  friction?: number;
  springStiffness?: number;
  threshold?: number;
  className?: string;
  itemWidth?: number;
  gap?: number;
}

export function PhysicsCarousel<T>({
  items,
  renderItem,
  friction = 0.92,
  springStiffness = 300,
  threshold = 0.3,
  className = '',
  itemWidth = 300,
  gap = 16,
}: PhysicsCarouselProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Motion values for drag physics
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: springStiffness, damping: 40 });

  const dragRef = useRef({
    startX: 0,
    prevX: 0,
    velocity: 0,
    lastTime: 0,
    isDragging: false,
  });

  const handleDragStart = useCallback(() => {
    dragRef.current.isDragging = true;
    dragRef.current.lastTime = Date.now();
    dragRef.current.prevX = x.get();
    dragRef.current.velocity = 0;
  }, [x]);

  const handleDrag = useCallback((_event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number } }) => {
    const now = Date.now();
    const dt = now - dragRef.current.lastTime;
    if (dt > 0) {
      const delta = info.offset.x - dragRef.current.prevX;
      dragRef.current.velocity = delta / dt;
      dragRef.current.prevX = info.offset.x;
      dragRef.current.lastTime = now;
    }
  }, [x]);

  const handleDragEnd = useCallback(() => {
    dragRef.current.isDragging = false;
    const velocity = dragRef.current.velocity;
    const currentX = x.get();

    // Apply friction-based deceleration
    let projectedX = currentX;
    let v = velocity;
    const stepWidth = itemWidth + gap;
    const maxDecel = 50; // max steps to simulate

    for (let i = 0; i < maxDecel; i++) {
      v *= friction;
      if (Math.abs(v) < 0.01) break;
      projectedX += v * 16; // ~16ms per frame
    }

    // Snap to nearest item
    const targetIndex = Math.round(-projectedX / stepWidth);
    const clampedIndex = Math.max(0, Math.min(items.length - 1, targetIndex));
    const targetX = -clampedIndex * stepWidth;

    x.set(targetX);
    setCurrentIndex(clampedIndex);
  }, [x, friction, items.length, itemWidth, gap]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        const targetX = -(currentIndex - 1) * (itemWidth + gap);
        x.set(targetX);
        setCurrentIndex(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < items.length - 1) {
        const targetX = -(currentIndex + 1) * (itemWidth + gap);
        x.set(targetX);
        setCurrentIndex(currentIndex + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, items.length, x, itemWidth, gap]);

  return (
    <div
      ref={containerRef}
      className={`physics-carousel ${className}`}
      style={{
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Physics carousel"
    >
      <motion.div
        style={{
          display: 'flex',
          gap: `${gap}px`,
          x: springX,
          willChange: 'transform',
          cursor: 'grab',
        }}
        drag="x"
        dragConstraints={containerRef}
        dragElastic={0.15}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: 'grabbing' }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${items.length}`}
            style={{
              width: `${itemWidth}px`,
              flexShrink: 0,
            }}
          >
            {renderItem(item, index, index === currentIndex)}
          </div>
        ))}
      </motion.div>

      {/* Dots indicator */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          marginTop: 16,
        }}
        role="tablist"
        aria-label="Carousel navigation"
      >
        {items.map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => {
              x.set(-index * (itemWidth + gap));
              setCurrentIndex(index);
            }}
            style={{
              width: index === currentIndex ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: index === currentIndex ? '#000' : '#ccc',
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
