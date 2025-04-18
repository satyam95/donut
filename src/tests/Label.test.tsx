import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Label } from '../components';

describe('Label Component', () => {
  it('renders the label with the correct text', () => {
    render(<Label htmlFor='input-id'>Test Label</Label>);
    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
  });

  it('applies additional classes', () => {
    render(
      <Label htmlFor='input-id' className='custom-class'>
        Custom Label
      </Label>
    );
    const label = screen.getByText('Custom Label');
    expect(label).toHaveClass('custom-class');
  });

  it('associates with the input via htmlFor', () => {
    render(
      <>
        <Label htmlFor='input-id'>Linked Label</Label>
        <input id='input-id' />
      </>
    );
    const label = screen.getByText('Linked Label');
    const input = screen.getByLabelText('Linked Label');
    expect(input).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'input-id');
  });

  it('handles peer-disabled styles', () => {
    render(
      <>
        <Label htmlFor='input-id' className='peer-disabled:opacity-50'>
          Peer Disabled Label
        </Label>
        <input id='input-id' disabled />
      </>
    );
    const label = screen.getByText('Peer Disabled Label');
    expect(label).toBeVisible();
  });

  it('supports accessibility features', () => {
    render(<Label htmlFor='input-id'>Accessible Label</Label>);
    const label = screen.getByText('Accessible Label');
    expect(label).toHaveAttribute('for', 'input-id');
  });
});
