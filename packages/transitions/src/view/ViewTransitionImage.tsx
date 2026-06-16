'use client';

import { motion } from 'framer-motion';
import { supportsViewTransitions } from './ViewTransition';

export interface ViewTransitionImageProps {
  /**
   * Unique name for the view transition.
   * Images with the same `name` on different pages will animate between states.
   */
  name: string;
  /** Image source URL. */
  src: string;
  /** Alt text for accessibility. */
  alt: string;
  /** Width of the image container. */
  width?: number | string;
  /** Height of the image container. */
  height?: number | string;
  /**
   * Object-fit mode:
   * - 'cover' (default): thumbnail mode, fills container
   * - 'contain': detail mode, shows full image
   */
  fit?: 'cover' | 'contain';
  /**
   * Whether this instance is the expanded/detail view.
   * When true, the image uses 'contain' fit and larger dimensions.
   */
  expanded?: boolean;
  /** Click handler — typically opens the detail view. */
  onClick?: () => void;
  /** Additional CSS class names. */
  className?: string;
  /** Border radius applied to the image. */
  borderRadius?: string | number;
}

/**
 * ViewTransitionImage — Image transition using the View Transitions API + Framer Motion.
 *
 * Renders an image with `view-transition-name` for native browser-powered
 * shared-element transitions between thumbnail and detail views.
 * Falls back to Framer Motion layoutId transitions when the API is unsupported.
 *
 * Usage:
 *   // Thumbnail page
 *   <ViewTransitionImage name="product-1" src="/thumb.jpg" alt="Product" onClick={() => select(1)} />
 *
 *   // Detail page
 *   <ViewTransitionImage name="product-1" src="/full.jpg" alt="Product" expanded onClick={() => close()} />
 */
export function ViewTransitionImage({
  name,
  src,
  alt,
  width,
  height,
  fit,
  expanded = false,
  onClick,
  className = '',
  borderRadius,
}: ViewTransitionImageProps) {
  const isSupported = supportsViewTransitions();
  const objectFit = fit ?? (expanded ? 'contain' : 'cover');
  const br = borderRadius ?? (expanded ? 0 : 8);

  // Native View Transitions path
  if (isSupported) {
    return (
      <div
        data-vt-image={name}
        onClick={onClick}
        className={className}
        style={{
          width: width ?? '100%',
          height: height ?? '100%',
          overflow: 'hidden',
          borderRadius: typeof br === 'number' ? `${br}px` : br,
          cursor: onClick ? 'pointer' : 'default',
          viewTransitionName: name,
          contain: 'layout',
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit,
            display: 'block',
          }}
        />
      </div>
    );
  }

  // Framer Motion fallback
  return (
    <motion.div
      layoutId={name}
      onClick={onClick}
      className={className}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      style={{
        width: width ?? '100%',
        height: height ?? '100%',
        overflow: 'hidden',
        borderRadius: typeof br === 'number' ? `${br}px` : br,
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <motion.img
        layoutId={`${name}-img`}
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit,
          display: 'block',
        }}
      />
    </motion.div>
  );
}
