import { render, screen } from '@testing-library/react';
import { Separator } from '../components';

describe('Separator Component', () => {
  it('renders a horizontal decorative separator by default', () => {
    render(<Separator />);
    const separator = screen.getByTestId('separator');
    expect(separator).toHaveClass('h-px w-full');
  });

  it('renders a vertical separator when orientation is vertical', () => {
    render(<Separator orientation='vertical' />);
    const separator = screen.getByTestId('separator');
    expect(separator).toHaveClass('w-px h-full');
  });

  it('applies custom class names', () => {
    render(<Separator className='bg-red-500' />);
    const separator = screen.getByTestId('separator');
    expect(separator).toHaveClass('bg-red-500');
  });
});
