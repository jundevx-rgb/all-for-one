'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Testimonial {
  id: string | number;
  name: string;
  role: string;
  quote: string;
  avatar?: string;
  rating?: number;
}

export interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  interval?: number;
  showStars?: boolean;
  showAvatar?: boolean;
  className?: string;
}

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div
      style={{ display: 'flex', gap: 2 }}
      aria-label={`Rating: ${rating} out of ${max} stars`}
    >
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          style={{
            color: i < rating ? '#f59e0b' : '#d1d5db',
            fontSize: 18,
          }}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  showStars,
  showAvatar,
}: {
  testimonial: Testimonial;
  showStars: boolean;
  showAvatar: boolean;
}) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 16,
        padding: 32,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        maxWidth: 600,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        boxSizing: 'border-box',
      }}
    >
      {showAvatar && testimonial.avatar && (
        <img
          src={testimonial.avatar}
          alt={`${testimonial.name}'s avatar`}
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: 16,
          }}
        />
      )}

      {showStars && testimonial.rating != null && (
        <StarRating rating={testimonial.rating} />
      )}

      <blockquote
        style={{
          fontSize: 18,
          lineHeight: 1.6,
          color: '#374151',
          margin: '16px 0',
          fontStyle: 'italic',
          position: 'relative',
        }}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <div style={{ marginTop: 8 }}>
        <p
          style={{
            fontWeight: 600,
            fontSize: 16,
            color: '#111827',
            margin: 0,
          }}
        >
          {testimonial.name}
        </p>
        <p
          style={{
            fontSize: 14,
            color: '#6b7280',
            margin: '4px 0 0',
          }}
        >
          {testimonial.role}
        </p>
      </div>
    </div>
  );
}

export function TestimonialCarousel({
  testimonials,
  autoplay = true,
  interval = 5000,
  showStars = true,
  showAvatar = true,
  className = '',
}: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, interval);
    }
  }, [autoplay, interval, testimonials.length]);

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [resetAutoplay]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    resetAutoplay();
  }, [testimonials.length, resetAutoplay]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    resetAutoplay();
  }, [testimonials.length, resetAutoplay]);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(index);
      resetAutoplay();
    },
    [resetAutoplay],
  );

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
      className={`testimonial-carousel ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 400,
        padding: '40px 16px',
        position: 'relative',
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonial carousel"
    >
      <button
        type="button"
        aria-label="Previous testimonial"
        onClick={goPrev}
        style={{
          position: 'absolute',
          left: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          background: 'rgba(0,0,0,0.08)',
          border: 'none',
          borderRadius: '50%',
          width: 44,
          height: 44,
          cursor: 'pointer',
          fontSize: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ‹
      </button>

      <div
        style={{
          width: '100%',
          maxWidth: 640,
          position: 'relative',
          overflow: 'hidden',
          minHeight: 300,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={testimonials[activeIndex]?.id ?? activeIndex}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{ width: '100%' }}
            role="group"
            aria-roledescription="slide"
            aria-label={`Testimonial ${activeIndex + 1} of ${testimonials.length}`}
          >
            <TestimonialCard
              testimonial={testimonials[activeIndex]}
              showStars={showStars}
              showAvatar={showAvatar}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        type="button"
        aria-label="Next testimonial"
        onClick={goNext}
        style={{
          position: 'absolute',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          background: 'rgba(0,0,0,0.08)',
          border: 'none',
          borderRadius: '50%',
          width: 44,
          height: 44,
          cursor: 'pointer',
          fontSize: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
        aria-label="Testimonial navigation"
      >
        {testimonials.map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Go to testimonial ${index + 1}`}
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
    </div>
  );
}
