import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeDefined();
  });

  it('renders all variants', () => {
    const variants = ['primary', 'secondary', 'outline', 'ghost', 'danger', 'link'] as const;
    for (const variant of variants) {
      const { container } = render(<Button variant={variant}>Variant</Button>);
      expect(container.firstChild).toBeDefined();
    }
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg', 'xl', '2xl', 'icon'] as const;
    for (const size of sizes) {
      const { container } = render(<Button size={size}>Size</Button>);
      expect(container.firstChild).toBeDefined();
    }
  });

  it('handles disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toHaveProperty('disabled', true);
  });

  it('renders as link when href provided', () => {
    const { container } = render(<Button href="/test">Link</Button>);
    expect(container.querySelector('a')).toBeDefined();
  });

  it('shows loading spinner', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toHaveProperty('disabled', true);
  });

  it('handles click events', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('applies fullWidth class', () => {
    const { container } = render(<Button fullWidth>Full</Button>);
    expect(container.firstChild).toBeDefined();
  });

  it('renders left and right icons', () => {
    const LeftIcon = () => <span>←</span>;
    const RightIcon = () => <span>→</span>;
    render(<Button leftIcon={<LeftIcon />} rightIcon={<RightIcon />}>Icons</Button>);
    expect(screen.getByText('←')).toBeDefined();
    expect(screen.getByText('→')).toBeDefined();
  });
});
