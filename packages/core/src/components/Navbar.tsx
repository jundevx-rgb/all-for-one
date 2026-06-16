'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------

export interface NavLink {
  label: string;
  href: string;
}

export interface NavCTA {
  label: string;
  href: string;
  /** Button variant matching the Button component */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export interface NavbarProps {
  /** Brand identity */
  brand: {
    /** Optional logo image URL */
    logo?: string;
    /** Brand name text */
    name: string;
    /** Link for the brand */
    href?: string;
  };
  /** Navigation links */
  links?: NavLink[];
  /** Call-to-action button */
  cta?: NavCTA;
  /** Positioning */
  position?: 'fixed' | 'sticky' | 'static';
  /** Transparent background (useful for hero overlays) */
  transparent?: boolean;
  /** Backdrop blur when scrolling / not transparent */
  blur?: boolean;
}

const positionStyles: Record<string, string> = {
  fixed: 'fixed top-0 left-0 right-0 z-40',
  sticky: 'sticky top-0 z-40',
  static: '',
};

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0, overflow: 'hidden' as const },
  visible: {
    opacity: 1,
    height: 'auto' as const,
    overflow: 'hidden' as const,
    transition: { duration: 0.3, ease: 'easeInOut' as const },
  },
  exit: {
    opacity: 0,
    height: 0,
    overflow: 'hidden' as const,
    transition: { duration: 0.2, ease: 'easeInOut' as const },
  },
};

export function Navbar({
  brand,
  links = [],
  cta,
  position = 'sticky',
  transparent = false,
  blur = true,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMobile = useCallback(() => setMobileOpen((v) => !v), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const bgClasses = transparent
    ? scrolled
      ? 'bg-white/80 dark:bg-gray-900/80'
      : 'bg-transparent'
    : 'bg-white dark:bg-gray-900';

  const blurClasses = blur && scrolled ? 'backdrop-blur-lg' : '';

  return (
    <nav
      className={`${positionStyles[position]} ${bgClasses} ${blurClasses} border-b border-gray-200/50 dark:border-gray-800/50 transition-colors duration-300`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <a
            href={brand.href ?? '/'}
            className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white hover:opacity-80 transition-opacity"
          >
            {brand.logo && (
              <img src={brand.logo} alt="" className="h-8 w-auto" />
            )}
            {brand.name}
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}

            {cta && (
              <a
                href={cta.href}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  cta.variant === 'outline'
                    ? 'border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800'
                    : cta.variant === 'secondary'
                      ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700'
                      : cta.variant === 'ghost'
                        ? 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                }`}
              >
                {cta.label}
              </a>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            onClick={toggleMobile}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden border-t border-gray-200 dark:border-gray-800"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="px-4 py-3 space-y-1 bg-white dark:bg-gray-900">
              {links.map((link) => (
                <a
                  key={link.href + link.label}
                  href={link.href}
                  className="block py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              {cta && (
                <a
                  href={cta.href}
                  className="block mt-2 px-4 py-2 text-center text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => setMobileOpen(false)}
                >
                  {cta.label}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
