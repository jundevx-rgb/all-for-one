import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from './Hero';

const meta: Meta<typeof Hero> = {
  title: 'Core/Hero',
  component: Hero,
  args: {
    title: 'Build Something Amazing',
    subtitle: 'Modern Web Design',
    description: 'Production-grade components for extraordinary web experiences.',
    cta: { primary: { label: 'Get Started', href: '#' }, secondary: { label: 'Learn More', href: '#' } },
  },
};
export default meta;
type Story = StoryObj<typeof Hero>;

export const CenterAligned: Story = { args: { alignment: 'center' } };
export const LeftAligned: Story = { args: { alignment: 'left' } };
export const ScreenHeight: Story = { args: { height: 'screen' } };
