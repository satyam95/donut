import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Toggle } from '../components';

describe('Toggle component', () => {
  it('renders with children', () => {
    render(<Toggle>Click me</Toggle>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('toggles uncontrolled state on click', () => {
    render(<Toggle defaultPressed={false}>Toggle</Toggle>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls onPressedChange when clicked', () => {
    const changeSpy = vi.fn();
    render(<Toggle onPressedChange={changeSpy}>Toggle</Toggle>);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(changeSpy).toHaveBeenCalledWith(true);
    fireEvent.click(btn);
    expect(changeSpy).toHaveBeenCalledWith(false);
  });

  it('respects controlled pressed prop', () => {
    const changeSpy = vi.fn();
    const { rerender } = render(
      <Toggle pressed={false} onPressedChange={changeSpy}>
        Ctrl
      </Toggle>
    );
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(btn);
    // Controlled prop won't change automatically
    expect(btn).toHaveAttribute('aria-pressed', 'false');
    expect(changeSpy).toHaveBeenCalledWith(true);

    // Update pressed prop
    rerender(
      <Toggle pressed={true} onPressedChange={changeSpy}>
        Ctrl
      </Toggle>
    );
    expect(btn).toHaveAttribute('aria-pressed', 'true');
  });

  it('applies data-state attribute correctly', () => {
    render(<Toggle defaultPressed>State</Toggle>);
    const btn = screen.getByRole('button');
    expect(btn.dataset.state).toBe('on');
  });

  it('applies disabled attribute and prevents toggling', () => {
    const changeSpy = vi.fn();
    render(
      <Toggle defaultPressed onPressedChange={changeSpy} disabled>
        Disabled
      </Toggle>
    );
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(changeSpy).not.toHaveBeenCalled();
    // State should remain 'on'
    expect(btn).toHaveAttribute('aria-pressed', 'true');
  });

  it('accepts custom className', () => {
    render(<Toggle className='custom'>Class</Toggle>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('custom');
  });

  it('renders correct variant and size classes', () => {
    const { rerender } = render(
      <Toggle variant='outline' size='lg'>
        Test
      </Toggle>
    );
    const btn = screen.getByRole('button');
    // Outline variant should have border class
    expect(btn).toHaveClass('border');
    // Large size should include 'h-10'
    expect(btn).toHaveClass('h-10');

    rerender(
      <Toggle variant='default' size='sm'>
        Test
      </Toggle>
    );
    expect(btn).not.toHaveClass('border');
    expect(btn).toHaveClass('h-8');
  });
});
