import type { Meta, StoryObj } from '@storybook/react';
import { SaaSFooter } from './SaaSFooter';

const meta: Meta<typeof SaaSFooter> = {
  title: 'Footers/SaaSFooter',
  component: SaaSFooter,
  args: {
    brand: { name: 'Acme Inc', description: 'The all-in-one platform for modern businesses.' },
    columns: [
      { title: 'Product', links: [{ label: 'Features', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'Changelog', href: '#' }] },
      { title: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Blog', href: '#' }, { label: 'Careers', href: '#' }] },
      { title: 'Resources', links: [{ label: 'Docs', href: '#' }, { label: 'API', href: '#' }, { label: 'Support', href: '#' }] },
    ],
    social: [
      { icon: <span>🐙</span>, href: '#', label: 'GitHub' },
      { icon: <span>🐦</span>, href: '#', label: 'Twitter' },
    ],
    copyright: '© 2026 Acme Inc. All rights reserved.',
  },
};
export default meta;
type Story = StoryObj<typeof SaaSFooter>;

export const Default: Story = {};
export const WithNewsletter: Story = { args: { newsletter: true } };
