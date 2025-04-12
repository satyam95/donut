import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/Button';

// A helper component to test asChild behavior.
function CustomComponent(props: React.ComponentProps<'a'>) {
  return <a {...props}>Custom Link</a>;
}

describe('Button Component', () => {
  it('renders default button with correct classes', () => {
    render(<Button>Default Button</Button>);

    const button = screen.getByRole('button', { name: /default button/i });
    expect(button).toBeInTheDocument();
    // Check for default variant and size classes
    expect(button).toHaveClass('bg-primary');
    expect(button).toHaveClass('text-primary-foreground');
    expect(button).toHaveClass('h-9');
    expect(button).toHaveClass('px-4');
    expect(button).toHaveClass('py-2');
  });

  it('renders destructive variant with correct classes', () => {
    render(<Button variant="destructive">Destructive Button</Button>);

    const button = screen.getByRole('button', { name: /destructive button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-destructive');
    expect(button).toHaveClass('text-white');
  });

  it('renders outline variant with correct classes', () => {
    render(<Button variant="outline">Outline Button</Button>);

    const button = screen.getByRole('button', { name: /outline button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('border');
    expect(button).toHaveClass('bg-background');
  });

  it('renders secondary variant with correct classes', () => {
    render(<Button variant="secondary">Secondary Button</Button>);

    const button = screen.getByRole('button', { name: /secondary button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-secondary');
    expect(button).toHaveClass('text-secondary-foreground');
  });

  it('renders ghost variant with correct classes', () => {
    render(<Button variant="ghost">Ghost Button</Button>);

    const button = screen.getByRole('button', { name: /ghost button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('hover:bg-accent');
    expect(button).toHaveClass('hover:text-accent-foreground');
  });

  it('renders link variant with correct classes', () => {
    render(<Button variant="link">Link Button</Button>);

    const button = screen.getByRole('button', { name: /link button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('text-primary');
    expect(button).toHaveClass('underline-offset-4');
  });

  it('renders small size button with correct classes', () => {
    render(<Button size="sm">Small Button</Button>);

    const button = screen.getByRole('button', { name: /small button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('h-8');
    expect(button).toHaveClass('gap-1.5');
    expect(button).toHaveClass('px-3');
  });

  it('renders large size button with correct classes', () => {
    render(<Button size="lg">Large Button</Button>);

    const button = screen.getByRole('button', { name: /large button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('h-10');
    expect(button).toHaveClass('px-6');
  });

  it('renders icon size button with correct classes', () => {
    render(<Button size="icon">Icon Button</Button>);

    const button = screen.getByRole('button', { name: /icon button/i });
    expect(button).toBeInTheDocument();
    // The "icon" size applies the "size-9" class
    expect(button).toHaveClass('size-9');
  });

  it('merges additional classNames passed via className prop', () => {
    render(<Button className="custom-class">Custom Class Button</Button>);

    const button = screen.getByRole('button', { name: /custom class button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('custom-class');
    // Ensure default classes are also present
    expect(button).toHaveClass('bg-primary');
  });

  it('passes additional props such as onClick', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);

    const button = screen.getByRole('button', { name: /clickable button/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders correctly when asChild is true', () => {
    render(
      <Button asChild>
        <CustomComponent data-testid="custom-element" />
      </Button>
    );

    // When rendered asChild, the button should not be a <button> element.
    const customElement = screen.getByTestId('custom-element');
    expect(customElement.tagName.toLowerCase()).toBe('a');
    // It should still have the computed classes from the buttonVariants.
    expect(customElement.className).toMatch(/inline-flex/);
  });
});
