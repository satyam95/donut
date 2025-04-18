import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RadioGroup, RadioGroupItem } from '../components';

describe('RadioGroup', () => {
  it('renders correctly with children', () => {
    render(
      <RadioGroup defaultValue='option1'>
        <RadioGroupItem value='option1' />
        <RadioGroupItem value='option2' />
        <RadioGroupItem value='option3' />
      </RadioGroup>
    );

    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
  });

  it('handles value changes in uncontrolled mode', () => {
    const handleChange = vi.fn();
    render(
      <RadioGroup defaultValue='option1' onValueChange={handleChange}>
        <RadioGroupItem value='option1' />
        <RadioGroupItem value='option2' />
        <RadioGroupItem value='option3' />
      </RadioGroup>
    );

    const radios = screen.getAllByRole('radio');
    const secondRadio = radios[1];
    expect((radios[0] as HTMLInputElement).checked).toBe(true);

    fireEvent.click(secondRadio);

    expect(handleChange).toHaveBeenCalledWith('option2');
    expect((secondRadio as HTMLInputElement).checked).toBe(true);
  });

  it('respects controlled value prop', () => {
    const handleChange = vi.fn();
    const { rerender } = render(
      <RadioGroup value='option1' onValueChange={handleChange}>
        <RadioGroupItem value='option1' />
        <RadioGroupItem value='option2' />
      </RadioGroup>
    );

    const radios = screen.getAllByRole('radio');
    const secondRadio = radios[1];

    // Controlled: clicking does not change checked state
    fireEvent.click(secondRadio);
    expect(handleChange).toHaveBeenCalledWith('option2');
    expect((secondRadio as HTMLInputElement).checked).toBe(false);

    // Rerender with new prop value
    rerender(
      <RadioGroup value='option2' onValueChange={handleChange}>
        <RadioGroupItem value='option1' />
        <RadioGroupItem value='option2' />
      </RadioGroup>
    );
    expect((secondRadio as HTMLInputElement).checked).toBe(true);
  });

  it('renders with horizontal orientation', () => {
    render(
      <RadioGroup orientation='horizontal'>
        <RadioGroupItem value='option1' />
        <RadioGroupItem value='option2' />
      </RadioGroup>
    );

    const group = screen.getByRole('radiogroup');
    expect(group).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('disables RadioGroupItem when disabled prop is true', () => {
    render(
      <RadioGroup defaultValue='option1'>
        <RadioGroupItem value='option1' disabled />
        <RadioGroupItem value='option2' />
      </RadioGroup>
    );

    const radios = screen.getAllByRole('radio');
    expect((radios[0] as HTMLInputElement).disabled).toBe(true);
  });

  it('throws error when RadioGroupItem is used outside of RadioGroup', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    expect(() => render(<RadioGroupItem value='test' />)).toThrow(
      /RadioGroupItem must be used within a RadioGroup/
    );
    consoleError.mockRestore();
  });
});
