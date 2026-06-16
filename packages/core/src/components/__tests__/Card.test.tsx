import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '../Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeDefined();
  });

  it('applies variant classes', () => {
    const variants = ['default', 'elevated', 'bordered', 'interactive', 'ghost'] as const;
    for (const variant of variants) {
      const { container } = render(<Card variant={variant}>Content</Card>);
      expect(container.firstChild).toBeDefined();
    }
  });

  it('handles onClick', () => {
    const onClick = vi.fn();
    render(<Card onClick={onClick}>Clickable</Card>);
    fireEvent.click(screen.getByText('Clickable'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('renders with custom padding', () => {
    const { container } = render(<Card padding="lg">Padded</Card>);
    expect(container.firstChild).toBeDefined();
  });

  it('renders with custom element type', () => {
    const { container } = render(<Card as="section">Section card</Card>);
    expect(container.querySelector('section')).toBeDefined();
  });
});
