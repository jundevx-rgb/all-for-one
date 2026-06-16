'use client';

import React, { type FC } from 'react';

export interface PortfolioFooterProps {
  /** Brand / portfolio name */
  brandName?: string;
  /** Short description / tagline */
  description?: string;
  /** Copyright year */
  copyrightYear?: number;
  /** Extra CSS classes appended to the root <footer> */
  className?: string;
}

interface SocialLink {
  label: string;
  href: string;
  iconChar: string;
}

const socialLinks: SocialLink[] = [
  { label: 'Twitter', href: '#twitter', iconChar: '𝕏' },
  { label: 'LinkedIn', href: '#linkedin', iconChar: 'in' },
  { label: 'GitHub', href: '#github', iconChar: 'GH' },
  { label: 'Dribbble', href: '#dribbble', iconChar: 'Db' },
];

export const PortfolioFooter: FC<PortfolioFooterProps> = ({
  brandName = 'Alex Rivera',
  description = 'Product designer & front-end engineer crafting delightful digital experiences.',
  copyrightYear = new Date().getFullYear(),
  className = '',
}) => {
  const handleBackToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className={`bg-white ${className}`}>
      {/* Subtle top border divider */}
      <div className="border-t border-gray-200" />

      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        {/* Brand */}
        <h3 className="text-xl font-bold text-gray-900">{brandName}</h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-500 max-w-md mx-auto">
          {description}
        </p>

        {/* Social links */}
        <div className="mt-8 flex items-center justify-center gap-6">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-xs font-semibold text-gray-500 transition-all duration-200 hover:border-gray-400 hover:text-gray-900"
            >
              {s.iconChar}
            </a>
          ))}
        </div>

        {/* Back to top */}
        <button
          onClick={handleBackToTop}
          className="mt-10 inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
          Back to top
        </button>

        {/* Copyright */}
        <p className="mt-8 text-xs text-gray-400">
          &copy; {copyrightYear} {brandName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default PortfolioFooter;
