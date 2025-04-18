import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Avatar, AvatarFallback, AvatarImage } from '../components';

describe('Avatar Component', () => {
  it('renders the Avatar container correctly', () => {
    render(
      <Avatar data-testid='avatar' className='custom-class'>
        <AvatarImage src='https://via.placeholder.com/150' alt='Avatar Image' />
        <AvatarFallback>SS</AvatarFallback>
      </Avatar>
    );

    const avatarContainer = screen.getByTestId('avatar');
    expect(avatarContainer).toBeInTheDocument();
    expect(avatarContainer).toHaveClass('custom-class');
  });

  it('renders the AvatarImage correctly', () => {
    render(
      <Avatar>
        <AvatarImage
          data-testid='avatar-image'
          src='https://via.placeholder.com/150'
          alt='Avatar Image'
        />
        <AvatarFallback>SS</AvatarFallback>
      </Avatar>
    );

    const avatarImage = screen.getByTestId('avatar-image');
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute(
      'src',
      'https://via.placeholder.com/150'
    );
    expect(avatarImage).toHaveAttribute('alt', 'Avatar Image');
  });

  it('renders the AvatarFallback correctly', () => {
    render(
      <Avatar>
        <AvatarFallback data-testid='avatar-fallback'>SS</AvatarFallback>
      </Avatar>
    );

    const avatarFallback = screen.getByTestId('avatar-fallback');
    expect(avatarFallback).toBeInTheDocument();
    expect(avatarFallback).toHaveTextContent('SS');
  });

  it('displays fallback when AvatarImage is not provided', () => {
    render(
      <Avatar>
        <AvatarFallback data-testid='avatar-fallback'>NA</AvatarFallback>
      </Avatar>
    );

    const avatarFallback = screen.getByTestId('avatar-fallback');
    expect(avatarFallback).toBeInTheDocument();
    expect(avatarFallback).toHaveTextContent('NA');
  });

  it('applies custom styles via className', () => {
    render(
      <Avatar className='bg-red-500' data-testid='avatar'>
        <AvatarFallback>Test</AvatarFallback>
      </Avatar>
    );

    const avatarContainer = screen.getByTestId('avatar');
    expect(avatarContainer).toHaveClass('bg-red-500');
  });

  it('renders correctly when only fallback is provided', () => {
    render(
      <Avatar data-testid='avatar'>
        <AvatarFallback data-testid='avatar-fallback'>Fallback</AvatarFallback>
      </Avatar>
    );

    const avatarFallback = screen.getByTestId('avatar-fallback');
    expect(avatarFallback).toBeInTheDocument();
    expect(avatarFallback).toHaveTextContent('Fallback');
  });

  it('handles missing props gracefully', () => {
    render(<Avatar data-testid='avatar' />);
    const avatarContainer = screen.getByTestId('avatar');
    expect(avatarContainer).toBeInTheDocument();
  });
});
