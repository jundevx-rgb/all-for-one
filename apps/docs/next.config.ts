import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: [
    '@all-for-one/core',
    '@all-for-one/design-system',
    '@all-for-one/animations',
    '@all-for-one/transitions',
    '@all-for-one/carousels',
    '@all-for-one/footers',
    '@all-for-one/icons',
  ],
};

export default nextConfig;
