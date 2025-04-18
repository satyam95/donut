import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Textarea } from '../components';

describe('Textarea Component', () => {
  it('renders correctly with default props', () => {
    render(<Textarea placeholder='Enter text...' />);
    const textarea = screen.getByPlaceholderText('Enter text...');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveClass('border-input');
  });

  it('applies additional className prop', () => {
    render(<Textarea className='custom-class' placeholder='Custom' />);
    const textarea = screen.getByPlaceholderText('Custom');
    expect(textarea).toHaveClass('custom-class');
  });

  it('handles disabled state', () => {
    render(<Textarea disabled placeholder='Disabled input' />);
    const textarea = screen.getByPlaceholderText('Disabled input');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass('disabled:cursor-not-allowed');
  });

  it('indicates invalid input with aria-invalid', () => {
    render(<Textarea aria-invalid placeholder='Invalid input' />);
    const textarea = screen.getByPlaceholderText('Invalid input');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveClass('aria-invalid:border-destructive');
  });

  it('handles user input', async () => {
    const user = userEvent.setup();
    render(<Textarea placeholder='Type here...' />);
    const textarea = screen.getByPlaceholderText('Type here...');
    await user.type(textarea, 'Hello, world!');
    expect(textarea).toHaveValue('Hello, world!');
  });
});
