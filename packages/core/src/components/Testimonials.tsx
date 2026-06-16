'use client';

// React imported implicitly via jsx-runtime

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export interface Testimonial {
  /** The testimonial quote text */
  quote: string;
  /** Author name */
  author: string;
  /** Author role / title */
  role?: string;
  /** Author avatar URL */
  avatar?: string;
  /** Company name */
  company?: string;
  /** Rating 1-5 */
  rating?: number;
}

export interface TestimonialsProps {
  /** Array of testimonials */
  testimonials: Testimonial[];
  /** Layout variant */
  variant?: 'grid' | 'carousel' | 'masonry';
  /** Number of columns (for grid/masonry, default 3) */
  columns?: 1 | 2 | 3 | 4;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${
            i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials({
  testimonials,
  variant = 'grid',
  columns = 3,
}: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) return null;

  const colClass =
    columns === 1
      ? 'grid-cols-1'
      : columns === 2
        ? 'md:grid-cols-2'
        : columns === 4
          ? 'md:grid-cols-2 lg:grid-cols-4'
          : 'md:grid-cols-2 lg:grid-cols-3'; // default 3

  const layoutClass =
    variant === 'masonry' ? `${colClass} auto-rows-auto space-y-8` : `${colClass} gap-8`;

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid ${layoutClass}`}>
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Quote mark decoration */}
              <svg
                className="absolute top-6 right-6 w-8 h-8 text-blue-100 dark:text-blue-900/50"
                fill="currentColor"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>

              {/* Stars */}
              {t.rating && (
                <div className="mb-4">
                  <Stars rating={t.rating} />
                </div>
              )}

              {/* Quote text */}
              <blockquote className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 relative z-10">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto">
                {t.avatar ? (
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-semibold text-sm">
                    {t.author.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {t.author}
                  </p>
                  {(t.role || t.company) && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t.role}
                      {t.role && t.company && ' · '}
                      {t.company}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
