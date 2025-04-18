import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Input } from '../components';

describe('Input Component', () => {
  test('renders with default props', () => {
    render(<Input placeholder='Enter text' />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  test('supports additional class names', () => {
    render(<Input placeholder='Styled input' className='custom-class' />);
    const input = screen.getByPlaceholderText('Styled input');
    expect(input).toHaveClass('custom-class');
  });

  test('handles input events', async () => {
    const onChange = vi.fn();
    render(<Input placeholder='Enter text' onChange={onChange} />);
    const input = screen.getByPlaceholderText('Enter text');
    await userEvent.type(input, 'Hello');
    expect(onChange).toHaveBeenCalledTimes(5);
  });

  test('supports disabled state', () => {
    render(<Input placeholder='Disabled input' disabled />);
    const input = screen.getByPlaceholderText('Disabled input');
    expect(input).toBeDisabled();
  });

  test('handles aria-invalid prop', () => {
    render(<Input placeholder='Invalid input' aria-invalid='true' />);
    const input = screen.getByPlaceholderText('Invalid input');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  test('applies selection styles', () => {
    render(<Input placeholder='Selectable input' />);
    const input = screen.getByPlaceholderText('Selectable input');
    expect(input).toHaveClass('selection:bg-primary');
  });
});
