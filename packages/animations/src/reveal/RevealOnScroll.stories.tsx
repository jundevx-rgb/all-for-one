import type { Meta, StoryObj } from '@storybook/react';
import { RevealOnScroll } from './RevealOnScroll';

const meta: Meta<typeof RevealOnScroll> = {
  title: 'Animations/RevealOnScroll',
  component: RevealOnScroll,
  args: { children: <div style={{ padding: 40, background: '#f0f0f0', borderRadius: 8 }}>Revealed content!</div> },
};
export default meta;
type Story = StoryObj<typeof RevealOnScroll>;

export const FadeUp: Story = { args: { animation: 'fade-up' } };
export const FadeIn: Story = { args: { animation: 'fade' } };
export const SlideLeft: Story = { args: { animation: 'slide-left' } };
export const SlideRight: Story = { args: { animation: 'slide-right' } };
export const Scale: Story = { args: { animation: 'scale' } };
export const WithDelay: Story = { args: { animation: 'fade-up', delay: 0.5 } };
