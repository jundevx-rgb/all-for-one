'use client';

import { motion } from 'framer-motion';

export interface SharedImageProps {
  /** Unique layoutId for the shared image transition. */
  id: string;
  /** Image source URL. */
  src: string;
  /** Alt text for accessibility. */
  alt: string;
  /** Whether the image is in expanded (detail view) state. */
  expanded?: boolean;
  /** Click handler — typically used to toggle expanded state. */
  onClick?: () => void;
  /** Transition duration in seconds. */
  duration?: number;
  /** Border radius applied during the expanded state. */
  borderRadius?: string;
}

/**
 * SharedImage — Image expand/collapse transition using layoutId.
 * Click to expand from a thumbnail to a full-size view (or vice versa).
 * The same `id` must be used on both the thumbnail and expanded instances.
 *
 * Usage:
 *   // Thumbnail list
 *   <SharedImage id="product-1" src="/thumb.jpg" alt="Product" onClick={() => setSelected('product-1')} />
 *
 *   // Detail view
 *   {selected === 'product-1' && (
 *     <SharedImage id="product-1" src="/large.jpg" alt="Product" expanded onClick={() => setSelected(null)} />
 *   )}
 */
export function SharedImage({
  id,
  src,
  alt,
  expanded = false,
  onClick,
  duration = 0.4,
  borderRadius,
}: SharedImageProps) {
  return (
    <motion.div
      layoutId={id}
      onClick={onClick}
      transition={{ duration, ease: 'easeInOut' }}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        overflow: 'hidden',
        borderRadius: expanded ? borderRadius ?? '0px' : borderRadius ?? '8px',
      }}
    >
      <motion.img
        layoutId={`${id}-img`}
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: expanded ? 'contain' : 'cover',
          display: 'block',
        }}
      />
    </motion.div>
  );
}
