'use client';

// React imported implicitly via jsx-runtime

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export interface HeroCTA {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export interface HeroProps {
  /** Main heading */
  title: string;
  /** Sub-heading / eyebrow text */
  subtitle?: string;
  /** Body / description text */
  description?: string;
  /** Call-to-action buttons */
  cta?: {
    primary?: HeroCTA;
    secondary?: HeroCTA;
  };
  /** Background image URL */
  image?: string;
  /** Text alignment */
  alignment?: 'left' | 'center';
  /** Dark overlay on the background image */
  overlay?: boolean;
  /** Section height */
  height?: 'auto' | 'screen' | 'half';
}

const heightStyles: Record<string, string> = {
  auto: 'py-20 md:py-32',
  screen: 'min-h-screen',
  half: 'min-h-[50vh]',
};

function ctaButtonClasses(variant?: string): string {
  switch (variant) {
    case 'secondary':
      return 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 shadow-sm';
    case 'outline':
      return 'border border-white/50 text-white hover:bg-white/10';
    default:
      return 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/25';
  }
}

export function Hero({
  title,
  subtitle,
  description,
  cta,
  image,
  alignment = 'center',
  overlay = true,
  height = 'auto',
}: HeroProps) {
  const alignClasses =
    alignment === 'center'
      ? 'text-center items-center'
      : 'text-left items-start';

  return (
    <section
      className={`relative flex items-center w-full overflow-hidden ${heightStyles[height]}`}
    >
      {/* Background image */}
      {image && (
        <>
          <img
            src={image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          {overlay && (
            <div className="absolute inset-0 bg-black/50 dark:bg-black/70" />
          )}
        </>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className={`flex flex-col gap-6 ${alignClasses}`}>
          {subtitle && (
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              {subtitle}
            </p>
          )}

          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight ${
              image && overlay ? 'text-white' : 'text-gray-900 dark:text-white'
            }`}
          >
            {title}
          </h1>

          {description && (
            <p
              className={`max-w-2xl text-lg sm:text-xl ${
                image && overlay
                  ? 'text-gray-200'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {description}
            </p>
          )}

          {cta && (cta.primary || cta.secondary) && (
            <div className="flex flex-wrap gap-4 mt-2">
              {cta.primary && (
                <a
                  href={cta.primary.href}
                  className={`inline-flex items-center px-6 py-3 text-base font-semibold rounded-xl transition-all duration-200 ${ctaButtonClasses(cta.primary.variant)}`}
                >
                  {cta.primary.label}
                </a>
              )}
              {cta.secondary && (
                <a
                  href={cta.secondary.href}
                  className={`inline-flex items-center px-6 py-3 text-base font-semibold rounded-xl transition-all duration-200 ${ctaButtonClasses(cta.secondary.variant)}`}
                >
                  {cta.secondary.label}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
