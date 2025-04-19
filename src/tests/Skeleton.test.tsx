import { render, screen } from '@testing-library/react';
import { Skeleton } from '../components/Skeleton';

describe('Skeleton Component', () => {
  it('renders correctly with default props', () => {
    render(<Skeleton className='h-4 w-24' />);
    const skeleton = screen.getByRole('status', { name: /skeleton/i });
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('bg-accent animate-pulse rounded-md h-4 w-24');
  });

  it('applies custom className', () => {
    render(<Skeleton className='h-8 w-8 rounded-full' />);
    const skeleton = screen.getByRole('status', { name: /skeleton/i });
    expect(skeleton).toHaveClass('h-8 w-8 rounded-full');
  });

  it('renders with additional props', () => {
    render(<Skeleton className='h-4 w-24' data-test='custom-prop' />);
    const skeleton = screen.getByRole('status', { name: /skeleton/i });
    expect(skeleton).toHaveAttribute('data-test', 'custom-prop');
  });
});
