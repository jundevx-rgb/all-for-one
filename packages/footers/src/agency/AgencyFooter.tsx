'use client';

import React, { type FC } from 'react';

export interface AgencyFooterProps {
  /** Agency / brand name */
  brandName?: string;
  /** CTA heading text */
  ctaHeading?: string;
  /** CTA button label */
  ctaButtonLabel?: string;
  /** CTA button click handler */
  onCtaClick?: () => void;
  /** Contact email */
  email?: string;
  /** Contact phone */
  phone?: string;
  /** Physical address */
  address?: string;
  /** Extra CSS classes appended to the root <footer> */
  className?: string;
}

const socialItems = [
  { label: 'Instagram', href: '#instagram' },
  { label: 'Behance', href: '#behance' },
  { label: 'Dribbble', href: '#dribbble' },
  { label: 'Twitter', href: '#twitter' },
];

export const AgencyFooter: FC<AgencyFooterProps> = ({
  brandName = 'Studio Lumina',
  ctaHeading = "Let's work together",
  ctaButtonLabel = 'Start a project',
  onCtaClick,
  email = 'hello@studiolumina.com',
  phone = '+1 555-0123',
  address = '123 Agency St, Suite 400, New York, NY 10001',
  className = '',
}) => {
  return (
    <footer className={`bg-gray-950 text-white py-20 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Two-column asymmetric layout */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {/* Left column — CTA */}
          <div>
            <h2 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              {ctaHeading}
            </h2>
            <button
              onClick={onCtaClick}
              className="mt-8 inline-block rounded-full border-2 border-white px-8 py-3 text-lg font-medium text-white transition-all duration-300 hover:bg-white hover:text-gray-950"
            >
              {ctaButtonLabel}
            </button>
            <p className="mt-6 text-2xl font-semibold tracking-tight text-gray-400">
              {brandName}
            </p>
          </div>

          {/* Right column — Contact info */}
          <div className="md:pl-12 md:pt-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-8">
              Contact
            </h4>
            <ul className="space-y-6 text-lg text-gray-300">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="hover:text-white transition-colors duration-200"
                >
                  {email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                  className="hover:text-white transition-colors duration-200"
                >
                  {phone}
                </a>
              </li>
              <li>
                <p>{address}</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Social links row */}
        <div className="mt-20 flex flex-wrap gap-8">
          {socialItems.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="text-lg font-medium text-gray-500 transition-colors duration-200 hover:text-white"
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="mt-12 text-sm text-gray-600">
          &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default AgencyFooter;
