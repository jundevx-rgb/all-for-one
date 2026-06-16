'use client';

import React from 'react';

// ---------------------------------------------------------------------------
// FeatureGrid
// ---------------------------------------------------------------------------

export interface Feature {
  /** Icon element (React node) for the feature */
  icon: React.ReactNode;
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
}

export interface FeatureGridProps {
  /** Array of features to display */
  features: Feature[];
  /** Number of grid columns (default 3) */
  columns?: 1 | 2 | 3 | 4;
  /** Visual variant */
  variant?: 'default' | 'numbered' | 'card';
}

export function FeatureGrid({
  features,
  columns = 3,
  variant = 'default',
}: FeatureGridProps) {
  if (!features || features.length === 0) return null;

  const colClass =
    columns === 1
      ? 'grid-cols-1'
      : columns === 2
        ? 'md:grid-cols-2'
        : columns === 4
          ? 'md:grid-cols-2 lg:grid-cols-4'
          : 'md:grid-cols-2 lg:grid-cols-3'; // default 3

  const isCard = variant === 'card';

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid ${colClass} gap-8`}>
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={
                isCard
                  ? 'rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-300'
                  : ''
              }
            >
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 mb-4 ${
                  variant === 'numbered' ? 'relative' : ''
                }`}
              >
                {variant === 'numbered' ? (
                  <span className="text-lg font-bold">{idx + 1}</span>
                ) : (
                  feature.icon
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
