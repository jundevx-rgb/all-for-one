'use client';

import React, { useState, type FC } from 'react';

export interface SaaSFooterProps {
  /** Brand name displayed in the first column */
  brandName?: string;
  /** Brand description / tagline */
  brandDescription?: string;
  /** Newsletter submit handler — receives the email string */
  onNewsletterSubmit?: (email: string) => void;
  /** Accent color tailwind class, e.g. "indigo-500" — used for button, border, hover states */
  accentColor?: string;
  /** Copyright year */
  copyrightYear?: number;
  /** Extra CSS classes appended to the root <footer> */
  className?: string;
}

interface FooterLink {
  label: string;
  href: string;
}

const productLinks: FooterLink[] = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'Changelog', href: '#changelog' },
  { label: 'API Reference', href: '#api' },
  { label: 'Status', href: '#status' },
];

const companyLinks: FooterLink[] = [
  { label: 'About Us', href: '#about' },
  { label: 'Careers', href: '#careers' },
  { label: 'Customers', href: '#customers' },
  { label: 'Partners', href: '#partners' },
  { label: 'Press Kit', href: '#press' },
  { label: 'Contact', href: '#contact' },
];

const resourceLinks: FooterLink[] = [
  { label: 'Documentation', href: '#docs' },
  { label: 'Blog', href: '#blog' },
  { label: 'Guides', href: '#guides' },
  { label: 'Community', href: '#community' },
  { label: 'Help Center', href: '#help' },
];

const legalLinks: FooterLink[] = [
  { label: 'Privacy', href: '#privacy' },
  { label: 'Terms', href: '#terms' },
  { label: 'Cookies', href: '#cookies' },
];

const socialLinks = [
  { label: 'GitHub', href: '#github' },
  { label: 'Twitter', href: '#twitter' },
  { label: 'LinkedIn', href: '#linkedin' },
  { label: 'YouTube', href: '#youtube' },
];

const LinkColumn: FC<{
  title: string;
  links: FooterLink[];
  accentColor: string;
}> = ({ title, links, accentColor }) => (
  <div>
    <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
      {title}
    </h4>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            className={`text-gray-400 hover:text-${accentColor} transition-colors duration-200 text-sm`}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export const SaaSFooter: FC<SaaSFooterProps> = ({
  brandName = 'SaaSify',
  brandDescription = 'The all-in-one platform for modern teams.',
  onNewsletterSubmit,
  accentColor = 'indigo-500',
  copyrightYear = new Date().getFullYear(),
  className = '',
}) => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNewsletterSubmit?.(email);
    setEmail('');
  };

  return (
    <footer
      className={`bg-gradient-to-b from-gray-900 to-gray-950 text-white border-t-4 border-${accentColor} ${className}`}
      style={{ borderTopColor: accentColor.startsWith('#') ? accentColor : undefined }}
    >
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-20 lg:px-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-white">{brandName}</h3>
            <p className="mt-2 text-sm text-gray-400">{brandDescription}</p>
            <p className="mt-4 text-sm leading-relaxed text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident.
            </p>
          </div>

          {/* Column 2: Product */}
          <LinkColumn title="Product" links={productLinks} accentColor={accentColor} />

          {/* Column 3: Company */}
          <LinkColumn title="Company" links={companyLinks} accentColor={accentColor} />

          {/* Column 4: Resources + Newsletter */}
          <div>
            <LinkColumn title="Resources" links={resourceLinks} accentColor={accentColor} />

            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                Newsletter
              </h4>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-w-0 flex-1 rounded-full border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className={`rounded-full bg-${accentColor} px-5 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity whitespace-nowrap`}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Social icons */}
        <div className="mt-12 flex gap-4">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors duration-200 hover:bg-gray-700 hover:text-white"
            >
              <div className="h-5 w-5 rounded-sm bg-current opacity-40" />
            </a>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {copyrightYear} {brandName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SaaSFooter;
