'use client';

import React, { useState, useRef, useCallback, type FC } from 'react';

export interface InteractiveFooterProps {
  /** Brand name */
  brandName?: string;
  /** Marquee ticker text */
  tickerText?: string;
  /** Link groups displayed in the grid */
  linkGroups?: LinkGroup[];
  /** Copyright year */
  copyrightYear?: number;
  /** Extra CSS classes appended to the root <footer> */
  className?: string;
}

export interface LinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

const defaultLinkGroups: LinkGroup[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Docs', href: '#docs' },
      { label: 'API', href: '#api' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Blog', href: '#blog' },
      { label: 'Careers', href: '#careers' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Twitter', href: '#twitter' },
      { label: 'GitHub', href: '#github' },
      { label: 'LinkedIn', href: '#linkedin' },
      { label: 'Discord', href: '#discord' },
    ],
  },
];

export const InteractiveFooter: FC<InteractiveFooterProps> = ({
  brandName = 'Nexus',
  tickerText = 'Building the future of digital experiences • Design • Development • Strategy • Innovation •',
  linkGroups = defaultLinkGroups,
  copyrightYear = new Date().getFullYear(),
  className = '',
}) => {
  const footerRef = useRef<HTMLElement>(null);
  const [glowPos, setGlowPos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = footerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlowPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setGlowPos(null);
  }, []);

  return (
    <>
      <style>{`
        @keyframes gradient-xy {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-xy {
          background-size: 200% 200%;
          animation: gradient-xy 8s ease infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>

      <footer
        ref={footerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative overflow-hidden bg-gray-950 text-white ${className}`}
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 animate-gradient-xy bg-gradient-to-br from-purple-900/30 via-gray-950 to-indigo-900/30 pointer-events-none" />

        {/* Cursor-follow glow */}
        {glowPos && (
          <div
            className="pointer-events-none absolute w-[400px] h-[400px] rounded-full blur-[100px] bg-indigo-500/10 transition-opacity duration-300"
            style={{
              left: glowPos.x - 200,
              top: glowPos.y - 200,
            }}
          />
        )}

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8">
          {/* Marquee / Scrolling text ticker */}
          <div className="mb-14 overflow-hidden border-b border-gray-800 pb-6">
            <div className="flex animate-marquee whitespace-nowrap text-sm font-medium uppercase tracking-widest text-gray-500">
              <span className="mr-8">{tickerText}</span>
              <span className="mr-8">{tickerText}</span>
              <span className="mr-8">{tickerText}</span>
              <span className="mr-8">{tickerText}</span>
            </div>
          </div>

          {/* Link grid */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
                  {group.title}
                </h4>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="group flex items-center gap-1 text-sm text-gray-400 transition-all duration-200 hover:translate-x-1 hover:text-indigo-400"
                      >
                        <span className="opacity-0 -ml-4 transition-all duration-200 group-hover:opacity-100 group-hover:ml-0 text-indigo-400">
                          →
                        </span>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-800 pt-8">
            <p className="text-sm font-semibold text-white">{brandName}</p>
            <p className="text-sm text-gray-500">
              &copy; {copyrightYear} {brandName}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default InteractiveFooter;
