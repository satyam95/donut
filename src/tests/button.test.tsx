import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../components';

// A helper component to test asChild behavior.
function CustomComponent(props: React.ComponentProps<'a'>) {
  return <a {...props}>Custom Link</a>;
}

describe('Button Component', () => {
  it('renders default button with correct classes', () => {
    render(<Button>Default Button</Button>);

    const button = screen.getByRole('button', { name: /default button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
    expect(button).toHaveClass('text-primary-foreground');
    expect(button).toHaveClass('h-9');
    expect(button).toHaveClass('px-4');
    expect(button).toHaveClass('py-2');
    expect(button).toHaveClass('inline-block');
  });

  it('renders destructive variant with correct classes', () => {
    render(<Button variant='destructive'>Destructive Button</Button>);

    const button = screen.getByRole('button', { name: /destructive button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-destructive');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('dark:bg-destructive/60');
  });

  it('renders outline variant with correct classes', () => {
    render(<Button variant='outline'>Outline Button</Button>);

    const button = screen.getByRole('button', { name: /outline button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('border');
    expect(button).toHaveClass('bg-background');
    expect(button).toHaveClass('dark:bg-input/30');
    expect(button).toHaveClass('dark:border-input');
  });

  it('renders secondary variant with correct classes', () => {
    render(<Button variant='secondary'>Secondary Button</Button>);

    const button = screen.getByRole('button', { name: /secondary button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-secondary');
    expect(button).toHaveClass('text-secondary-foreground');
  });

  it('renders ghost variant with correct classes', () => {
    render(<Button variant='ghost'>Ghost Button</Button>);

    const button = screen.getByRole('button', { name: /ghost button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('hover:bg-accent');
    expect(button).toHaveClass('hover:text-accent-foreground');
    expect(button).toHaveClass('dark:hover:bg-accent/50');
  });

  it('renders link variant with correct classes', () => {
    render(<Button variant='link'>Link Button</Button>);

    const button = screen.getByRole('button', { name: /link button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('text-primary');
    expect(button).toHaveClass('underline-offset-4');
  });

  it('renders small size button with correct classes', () => {
    render(<Button size='sm'>Small Button</Button>);

    const button = screen.getByRole('button', { name: /small button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('h-8');
    expect(button).toHaveClass('gap-1.5');
    expect(button).toHaveClass('px-3');
    expect(button).toHaveClass('has-[>svg]:px-2.5');
  });

  it('renders large size button with correct classes', () => {
    render(<Button size='lg'>Large Button</Button>);

    const button = screen.getByRole('button', { name: /large button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('h-10');
    expect(button).toHaveClass('px-6');
    expect(button).toHaveClass('has-[>svg]:px-4');
  });

  it('renders icon size button with correct classes', () => {
    render(<Button size='icon'>Icon Button</Button>);

    const button = screen.getByRole('button', { name: /icon button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('size-9');
  });

  it('merges additional classNames passed via className prop', () => {
    render(<Button className='custom-class'>Custom Class Button</Button>);

    const button = screen.getByRole('button', { name: /custom class button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('custom-class');
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
        <CustomComponent data-testid='custom-element' />
      </Button>
    );

    const customElement = screen.getByTestId('custom-element');
    expect(customElement.tagName.toLowerCase()).toBe('a');
    expect(customElement.className).toMatch(/inline-flex/);
    expect(customElement.className).not.toMatch(/inline-block/);
  });

  it('throws error when asChild is true and child is a string', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    expect(() => {
      render(<Button asChild>Invalid Child</Button>);
    }).toThrow(
      'Button with asChild prop must have a valid React element as its child.'
    );
    consoleError.mockRestore();
  });

  it('throws error when asChild is true and child is null', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    expect(() => {
      render(<Button asChild>{null}</Button>);
    }).toThrow(
      'Button with asChild prop must have a valid React element as its child.'
    );
    consoleError.mockRestore();
  });

  it('throws error when asChild is true and child is undefined', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    expect(() => {
      render(<Button asChild>{undefined}</Button>);
    }).toThrow(
      'Button with asChild prop must have a valid React element as its child.'
    );
    consoleError.mockRestore();
  });

  it('throws error when asChild is true and child is a number', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    expect(() => {
      render(<Button asChild>{42}</Button>);
    }).toThrow(
      'Button with asChild prop must have a valid React element as its child.'
    );
    consoleError.mockRestore();
  });

  it('throws error when asChild is true and child is a boolean', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    expect(() => {
      render(<Button asChild>{true}</Button>);
    }).toThrow(
      'Button with asChild prop must have a valid React element as its child.'
    );
    consoleError.mockRestore();
  });

  it('throws error when asChild is true and multiple children are provided', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    expect(() => {
      render(
        <Button asChild>
          <span>First</span>
          <span>Second</span>
        </Button>
      );
    }).toThrow(
      'React.Children.only expected to receive a single React element child.'
    );
    consoleError.mockRestore();
  });

  it('renders button with icon and text correctly', () => {
    render(
      <Button>
        <svg data-testid='test-icon' className='size-4' />
        Button with Icon
      </Button>
    );

    const button = screen.getByRole('button', { name: /button with icon/i });
    const icon = screen.getByTestId('test-icon');
    expect(button).toContainElement(icon);
    expect(icon).toHaveClass('size-4');
  });

  it('applies disabled state correctly', () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:pointer-events-none');
    expect(button).toHaveClass('disabled:opacity-50');
  });

  it('applies focus styles correctly', () => {
    render(<Button tabIndex={0}>Focusable Button</Button>);
    const button = screen.getByRole('button', { name: /focusable button/i });
    fireEvent.focus(button);
    expect(button).toHaveClass('focus-visible:ring-ring/50');
    expect(button).toHaveClass('focus-visible:ring-[3px]');
  });

  it('handles aria-invalid state correctly', () => {
    render(<Button aria-invalid>Invalid Button</Button>);
    const button = screen.getByRole('button', { name: /invalid button/i });
    expect(button).toHaveClass('aria-invalid:ring-destructive/20');
    expect(button).toHaveClass('dark:aria-invalid:ring-destructive/40');
    expect(button).toHaveClass('aria-invalid:border-destructive');
  });

  it('renders button with multiple children correctly', () => {
    render(
      <Button>
        <span>First</span>
        <span>Second</span>
        <span>Third</span>
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('FirstSecondThird');
  });
});
