import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from '../components';

describe('Checkbox Component', () => {
  it('renders correctly in uncontrolled mode', () => {
    render(<Checkbox defaultChecked={false} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });

  it('renders correctly in controlled mode', () => {
    render(<Checkbox checked={true} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });

  it('toggles state and calls onChange in uncontrolled mode', () => {
    const onChange = vi.fn();
    render(<Checkbox defaultChecked={false} onChange={onChange} />);
    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledWith(true);
    expect(checkbox).toHaveAttribute('aria-checked', 'true');

    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledWith(false);
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });

  it('does not manage internal state in controlled mode', () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <Checkbox checked={false} onChange={onChange} />
    );
    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledWith(true);
    // State should not change internally; it depends on the checked prop
    expect(checkbox).toHaveAttribute('aria-checked', 'false');

    // Simulate parent updating the checked prop
    rerender(<Checkbox checked={true} onChange={onChange} />);
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });

  it('is disabled when the disabled prop is true', () => {
    render(<Checkbox checked={false} disabled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('renders the check icon when checked', () => {
    render(<Checkbox checked={true} />);
    const icon = screen.getByTestId('check-icon');
    expect(icon).toBeInTheDocument();
  });

  it('does not render the check icon when unchecked', () => {
    render(<Checkbox checked={false} />);
    const icon = screen.queryByTestId('check-icon');
    expect(icon).not.toBeInTheDocument();
  });
});
