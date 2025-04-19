import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Switch } from '../components';

describe('Switch Component', () => {
  it('renders correctly', () => {
    render(<Switch />);
    const button = screen.getByRole('switch');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-checked', 'false');
  });

  it('handles clicks and toggles state', () => {
    const onChangeMock = vi.fn();
    render(<Switch onChange={onChangeMock} />);
    const button = screen.getByRole('switch');

    // Initial state
    expect(button).toHaveAttribute('aria-checked', 'false');

    // Click to toggle on
    fireEvent.click(button);
    expect(onChangeMock).toHaveBeenCalledWith(true);
    expect(button).toHaveAttribute('aria-checked', 'true');

    // Click to toggle off
    fireEvent.click(button);
    expect(onChangeMock).toHaveBeenCalledWith(false);
    expect(button).toHaveAttribute('aria-checked', 'false');
  });

  it('disables interaction when disabled', () => {
    const onChangeMock = vi.fn();
    render(<Switch disabled onChange={onChangeMock} />);
    const button = screen.getByRole('switch');

    // Initial state
    expect(button).toBeDisabled();

    // Attempt click
    fireEvent.click(button);
    expect(onChangeMock).not.toHaveBeenCalled();
    expect(button).toHaveAttribute('aria-checked', 'false');
  });

  it('supports controlled checked state', () => {
    const onChangeMock = vi.fn();
    render(<Switch checked={true} onChange={onChangeMock} />);
    const button = screen.getByRole('switch');

    // Controlled state should always reflect props
    expect(button).toHaveAttribute('aria-checked', 'true');
  });

  it('applies custom className', () => {
    const customClass = 'custom-switch-class';
    render(<Switch className={customClass} />);
    const button = screen.getByRole('switch');
    expect(button).toHaveClass(customClass);
  });
});
