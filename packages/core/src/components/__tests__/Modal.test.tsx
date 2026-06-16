import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '../Modal';

describe('Modal', () => {
  it('renders when open', () => {
    render(
      <Modal open={true} onClose={() => {}} title="Test Modal">
        Modal content
      </Modal>
    );
    expect(screen.getByText('Modal content')).toBeDefined();
    expect(screen.getByText('Test Modal')).toBeDefined();
  });

  it('does not render when closed', () => {
    render(
      <Modal open={false} onClose={() => {}} title="Hidden">
        Hidden content
      </Modal>
    );
    expect(screen.queryByText('Hidden content')).toBeNull();
  });

  it('has dialog role', () => {
    render(
      <Modal open={true} onClose={() => {}} title="Dialog">
        Content
      </Modal>
    );
    expect(screen.getByRole('dialog')).toBeDefined();
  });

  it('calls onClose on escape key', () => {
    const onClose = vi.fn();
    render(
      <Modal open={true} onClose={onClose} title="Esc">
        Content
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });
});
