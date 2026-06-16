import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Core/Card',
  component: Card,
  args: { children: <div style={{ padding: 24 }}>Card content here</div> },
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {};
export const Elevated: Story = { args: { variant: 'elevated' } };
export const Bordered: Story = { args: { variant: 'bordered' } };
export const Interactive: Story = { args: { variant: 'interactive' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const WithClick: Story = { args: { onClick: () => alert('Clicked!') } };
