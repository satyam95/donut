import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Alert, AlertTitle, AlertDescription } from '../components';

describe('Alert Component', () => {
  it('renders the default variant correctly', () => {
    render(
      <Alert>
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>This is a default alert message.</AlertDescription>
      </Alert>
    );
    expect(screen.getByRole('alert')).toHaveClass('bg-card');
    expect(screen.getByText('Default Alert')).toBeInTheDocument();
    expect(
      screen.getByText('This is a default alert message.')
    ).toBeInTheDocument();
  });

  it('renders the destructive variant correctly', () => {
    render(
      <Alert variant='destructive'>
        <AlertTitle>Destructive Alert</AlertTitle>
        <AlertDescription>
          This is a destructive alert message.
        </AlertDescription>
      </Alert>
    );
    expect(screen.getByRole('alert')).toHaveClass('text-destructive');
    expect(screen.getByText('Destructive Alert')).toBeInTheDocument();
    expect(
      screen.getByText('This is a destructive alert message.')
    ).toBeInTheDocument();
  });

  it('supports custom className', () => {
    render(
      <Alert className='custom-class'>
        <AlertTitle>Custom Alert</AlertTitle>
        <AlertDescription>Custom alert message.</AlertDescription>
      </Alert>
    );
    expect(screen.getByRole('alert')).toHaveClass('custom-class');
  });

  it('renders title and description correctly', () => {
    render(
      <Alert>
        <AlertTitle>Title</AlertTitle>
        <AlertDescription>Description</AlertDescription>
      </Alert>
    );
    expect(screen.getByText('Title')).toHaveClass('line-clamp-1');
    expect(screen.getByText('Description')).toHaveClass(
      'text-muted-foreground'
    );
  });
});
