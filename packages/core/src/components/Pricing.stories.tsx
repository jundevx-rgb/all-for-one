import type { Meta, StoryObj } from '@storybook/react';
import { Pricing } from './Pricing';

const meta: Meta<typeof Pricing> = {
  title: 'Core/Pricing',
  component: Pricing,
  args: {
    interval: 'monthly',
    plans: [
      { name: 'Starter', price: 29, interval: 'mo', description: 'For small teams', features: ['5 projects', 'Basic analytics', 'Email support'], cta: { label: 'Start Free', href: '#' } },
      { name: 'Pro', price: 99, interval: 'mo', description: 'For growing teams', features: ['Unlimited projects', 'Advanced analytics', 'Priority support', 'Custom domains'], cta: { label: 'Get Pro', href: '#' }, highlighted: true },
      { name: 'Enterprise', price: 299, interval: 'mo', description: 'For large orgs', features: ['Everything in Pro', 'SSO', 'Dedicated support', 'SLA'], cta: { label: 'Contact Us', href: '#' } },
    ],
  },
};
export default meta;
type Story = StoryObj<typeof Pricing>;

export const Monthly: Story = {};
export const Yearly: Story = { args: { interval: 'yearly' } };
