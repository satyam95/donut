import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Badge from '../components/Badge';

// Helper component for asChild testing
function CustomComponent(props: React.ComponentProps<'a'>) {
  return <a {...props}>Custom Link</a>;
}

describe('Badge component', () => {
  it('renders default variant with text children', () => {
    render(<Badge>Test Badge</Badge>);

    const badge = screen.getByText('Test Badge');
    expect(badge).toBeInTheDocument();
    expect(badge.tagName).toBe('SPAN');
    expect(badge).toHaveAttribute('data-slot', 'badge');
    // default variant should include primary background
    expect(badge).toHaveClass('bg-primary');
    expect(badge).toHaveClass('text-primary-foreground');
    expect(badge).toHaveClass('border-transparent');
  });

  it('applies custom className and variant prop', () => {
    render(
      <Badge variant='destructive' className='custom'>
        Remove
      </Badge>
    );

    const badge = screen.getByText('Remove');
    expect(badge).toHaveClass('bg-destructive');
    expect(badge).toHaveClass('custom');
    expect(badge).toHaveClass('dark:bg-destructive/60');
  });

  it('renders secondary variant correctly', () => {
    render(<Badge variant='secondary'>Secondary Badge</Badge>);
    const badge = screen.getByText('Secondary Badge');
    expect(badge).toHaveClass('bg-secondary');
    expect(badge).toHaveClass('text-secondary-foreground');
    expect(badge).toHaveClass('border-transparent');
  });

  it('renders outline variant correctly', () => {
    render(<Badge variant='outline'>Outline Badge</Badge>);
    const badge = screen.getByText('Outline Badge');
    expect(badge).toHaveClass('text-foreground');
  });

  it('renders with asChild prop correctly', () => {
    render(
      <Badge asChild>
        <CustomComponent data-testid='custom-badge' />
      </Badge>
    );

    const customBadge = screen.getByTestId('custom-badge');
    expect(customBadge.tagName.toLowerCase()).toBe('a');
    expect(customBadge).toHaveAttribute('data-slot', 'badge');
    expect(customBadge.className).toMatch(/inline-flex/);
  });

  it('passes additional props to the rendered element', () => {
    const onClick = vi.fn();
    render(
      <Badge onClick={onClick} data-testid='test-badge'>
        Clickable Badge
      </Badge>
    );

    const badge = screen.getByTestId('test-badge');
    fireEvent.click(badge);
    expect(onClick).toHaveBeenCalled();
  });

  it('renders with icon and text correctly', () => {
    render(
      <Badge>
        <svg data-testid='test-icon' className='size-3' />
        With Icon
      </Badge>
    );

    const badge = screen.getByText('With Icon');
    const icon = screen.getByTestId('test-icon');
    expect(badge).toContainElement(icon);
    expect(icon).toHaveClass('size-3');
  });

  it('applies focus styles correctly', () => {
    render(<Badge tabIndex={0}>Focusable Badge</Badge>);
    const badge = screen.getByText('Focusable Badge');
    fireEvent.focus(badge);
    expect(badge).toHaveClass('focus-visible:ring-ring/50');
    expect(badge).toHaveClass('focus-visible:ring-[3px]');
  });

  it('handles aria-invalid state correctly', () => {
    render(<Badge aria-invalid>Invalid Badge</Badge>);
    const badge = screen.getByText('Invalid Badge');
    expect(badge).toHaveClass('aria-invalid:ring-destructive/20');
    expect(badge).toHaveClass('dark:aria-invalid:ring-destructive/40');
    expect(badge).toHaveClass('aria-invalid:border-destructive');
  });

  it('applies hover styles correctly for link variant', () => {
    render(
      <Badge asChild>
        <CustomComponent data-testid='link-badge' />
      </Badge>
    );

    const badge = screen.getByTestId('link-badge');
    expect(badge).toHaveClass('[a&]:hover:bg-primary/90');
  });

  it('applies transition styles correctly', () => {
    render(<Badge>Transition Badge</Badge>);
    const badge = screen.getByText('Transition Badge');
    expect(badge).toHaveClass('transition-[color,box-shadow]');
  });
});
