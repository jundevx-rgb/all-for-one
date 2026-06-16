'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Product {
  id: string | number;
  title: string;
  image?: string;
  price?: number | string;
  originalPrice?: number | string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  [key: string]: unknown;
}

export interface ProductCarouselProps {
  products: Product[];
  renderItem?: (product: Product, index: number) => React.ReactNode;
  showPrice?: boolean;
  showRating?: boolean;
  columns?: number;
  className?: string;
  gap?: number;
  autoplay?: boolean;
  autoplayInterval?: number;
}

function ProductCard({
  product,
  showPrice,
  showRating,
}: {
  product: Product;
  showPrice: boolean;
  showRating: boolean;
}) {
  const discount =
    typeof product.price === 'number' && typeof product.originalPrice === 'number'
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
      }}
    >
      {/* Image container */}
      <div
        style={{
          position: 'relative',
          paddingTop: '100%',
          background: '#f3f4f6',
          overflow: 'hidden',
        }}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#9ca3af',
              fontSize: 40,
            }}
          >
            📦
          </div>
        )}
        {product.badge && (
          <span
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
              background: '#ef4444',
              color: '#fff',
              fontSize: 12,
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: 4,
            }}
          >
            {product.badge}
          </span>
        )}
        {discount != null && discount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              background: '#059669',
              color: '#fff',
              fontSize: 12,
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: 4,
            }}
          >
            -{discount}%
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: '#111827',
            margin: 0,
            lineHeight: 1.4,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.title}
        </h3>

        {showRating && product.rating != null && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
            <span style={{ color: '#f59e0b', fontSize: 14 }}>
              {'★'.repeat(Math.round(product.rating))}
              {'☆'.repeat(5 - Math.round(product.rating))}
            </span>
            {product.reviewCount != null && (
              <span style={{ fontSize: 12, color: '#6b7280' }}>
                ({product.reviewCount})
              </span>
            )}
          </div>
        )}

        {showPrice && (
          <div style={{ marginTop: 'auto', paddingTop: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {product.price != null && (
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#111827',
                  }}
                >
                  {typeof product.price === 'number'
                    ? `$${product.price.toFixed(2)}`
                    : product.price}
                </span>
              )}
              {product.originalPrice != null && (
                <span
                  style={{
                    fontSize: 14,
                    color: '#9ca3af',
                    textDecoration: 'line-through',
                  }}
                >
                  {typeof product.originalPrice === 'number'
                    ? `$${product.originalPrice.toFixed(2)}`
                    : product.originalPrice}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ProductCarousel({
  products,
  renderItem,
  showPrice = true,
  showRating = true,
  columns = 4,
  className = '',
  gap = 16,
  autoplay = false,
  autoplayInterval = 4000,
}: ProductCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Visible products per page based on columns
  const [visibleCount, setVisibleCount] = useState(columns);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setVisibleCount(1);
      else if (w < 768) setVisibleCount(2);
      else if (w < 1024) setVisibleCount(3);
      else setVisibleCount(columns);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [columns]);

  const totalPages = Math.max(1, Math.ceil(products.length / visibleCount));

  const resetAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    if (autoplay && totalPages > 1) {
      autoplayRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          const next = prev + visibleCount;
          return next >= products.length ? 0 : next;
        });
      }, autoplayInterval);
    }
  }, [autoplay, autoplayInterval, products.length, visibleCount, totalPages]);

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [resetAutoplay]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => {
      const next = prev + visibleCount;
      return next >= products.length ? 0 : next;
    });
    resetAutoplay();
  }, [products.length, visibleCount, resetAutoplay]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => {
      const next = prev - visibleCount;
      return next < 0 ? Math.max(0, products.length - visibleCount) : next;
    });
    resetAutoplay();
  }, [products.length, visibleCount, resetAutoplay]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goPrev, goNext]);

  const visibleProducts = products.slice(activeIndex, activeIndex + visibleCount);
  // Fill remaining slots if at end
  const remaining = visibleCount - visibleProducts.length;
  if (remaining > 0 && activeIndex + visibleCount > products.length) {
    const wrapped = products.slice(0, remaining);
    visibleProducts.push(...wrapped);
  }

  return (
    <div
      className={`product-carousel ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        padding: '24px 0',
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Product carousel"
    >
      <button
        type="button"
        aria-label="Previous products"
        onClick={goPrev}
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          background: 'rgba(255,255,255,0.9)',
          border: '1px solid #e5e7eb',
          borderRadius: '50%',
          width: 40,
          height: 40,
          cursor: 'pointer',
          fontSize: 18,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        ‹
      </button>

      <div
        ref={trackRef}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${visibleCount}, 1fr)`,
          gap: `${gap}px`,
          padding: '0 56px',
        }}
      >
        <AnimatePresence>
          {visibleProducts.map((product, index) => (
            <motion.div
              key={`${product.id}-${activeIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              role="group"
              aria-roledescription="slide"
              aria-label={`Product ${(activeIndex + index) % products.length + 1}`}
            >
              {renderItem
                ? renderItem(product, index)
                : (
                    <ProductCard
                      product={product}
                      showPrice={showPrice}
                      showRating={showRating}
                    />
                  )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <button
        type="button"
        aria-label="Next products"
        onClick={goNext}
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          background: 'rgba(255,255,255,0.9)',
          border: '1px solid #e5e7eb',
          borderRadius: '50%',
          width: 40,
          height: 40,
          cursor: 'pointer',
          fontSize: 18,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        ›
      </button>

      {/* Page indicators */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 6,
          marginTop: 16,
        }}
        role="tablist"
        aria-label="Product carousel pages"
      >
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={Math.floor(activeIndex / visibleCount) === i}
            aria-label={`Go to page ${i + 1}`}
            onClick={() => {
              setActiveIndex(i * visibleCount);
              resetAutoplay();
            }}
            style={{
              width: Math.floor(activeIndex / visibleCount) === i ? 20 : 8,
              height: 8,
              borderRadius: 4,
              background: Math.floor(activeIndex / visibleCount) === i ? '#000' : '#ccc',
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
