import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from '../components';

// Utility to check class names
const hasClass = (element: HTMLElement, className: string) =>
  element.classList.contains(className);

describe('Card Components', () => {
  describe('Card', () => {
    it('renders with default classes', () => {
      render(<Card />);
      const card = screen.getByTestId('card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveAttribute('data-slot', 'card');
      expect(card).toHaveAttribute('data-testid', 'card');
      expect(hasClass(card, 'bg-card')).toBe(true);
      expect(hasClass(card, 'text-card-foreground')).toBe(true);
      expect(hasClass(card, 'flex')).toBe(true);
      expect(hasClass(card, 'flex-col')).toBe(true);
      expect(hasClass(card, 'gap-6')).toBe(true);
      expect(hasClass(card, 'rounded-xl')).toBe(true);
      expect(hasClass(card, 'border')).toBe(true);
      expect(hasClass(card, 'py-6')).toBe(true);
      expect(hasClass(card, 'shadow-sm')).toBe(true);
    });

    it('applies custom className', () => {
      render(<Card className='custom-class' />);
      const card = screen.getByTestId('card');
      expect(hasClass(card, 'custom-class')).toBe(true);
    });

    it('forwards additional props', () => {
      render(<Card id='card-id' data-custom='test' />);
      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('id', 'card-id');
      expect(card).toHaveAttribute('data-custom', 'test');
    });

    it('renders children', () => {
      render(<Card>Child content</Card>);
      expect(screen.getByText('Child content')).toBeInTheDocument();
    });
  });

  describe('CardHeader', () => {
    it('renders with default classes', () => {
      render(<CardHeader />);
      const header = screen.getByTestId('card-header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveAttribute('data-slot', 'card-header');
      expect(header).toHaveAttribute('data-testid', 'card-header');
      expect(hasClass(header, '@container/card-header')).toBe(true);
      expect(hasClass(header, 'grid')).toBe(true);
      expect(hasClass(header, 'auto-rows-min')).toBe(true);
      expect(hasClass(header, 'items-start')).toBe(true);
      expect(hasClass(header, 'gap-1.5')).toBe(true);
      expect(hasClass(header, 'px-6')).toBe(true);
    });

    it('applies custom className', () => {
      render(<CardHeader className='custom-header' />);
      const header = screen.getByTestId('card-header');
      expect(hasClass(header, 'custom-header')).toBe(true);
    });

    it('forwards additional props', () => {
      render(<CardHeader id='header-id' data-custom='test' />);
      const header = screen.getByTestId('card-header');
      expect(header).toHaveAttribute('id', 'header-id');
      expect(header).toHaveAttribute('data-custom', 'test');
    });

    it('renders children', () => {
      render(<CardHeader>Header content</CardHeader>);
      expect(screen.getByText('Header content')).toBeInTheDocument();
    });

    it('applies conditional grid-cols when CardAction is present', () => {
      render(
        <CardHeader>
          <CardAction>Action</CardAction>
        </CardHeader>
      );
      const header = screen.getByTestId('card-header');
      expect(
        hasClass(header, 'has-data-[slot=card-action]:grid-cols-[1fr_auto]')
      ).toBe(true);
    });

    it('applies border-bottom padding when border-b is present', () => {
      render(<CardHeader className='border-b' />);
      const header = screen.getByTestId('card-header');
      expect(hasClass(header, '[.border-b]:pb-6')).toBe(true);
    });
  });

  describe('CardTitle', () => {
    it('renders with default classes', () => {
      render(<CardTitle />);
      const title = screen.getByTestId('card-title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveAttribute('data-slot', 'card-title');
      expect(title).toHaveAttribute('data-testid', 'card-title');
      expect(hasClass(title, 'leading-none')).toBe(true);
      expect(hasClass(title, 'font-semibold')).toBe(true);
    });

    it('applies custom className', () => {
      render(<CardTitle className='custom-title' />);
      const title = screen.getByTestId('card-title');
      expect(hasClass(title, 'custom-title')).toBe(true);
    });

    it('forwards additional props', () => {
      render(<CardTitle id='title-id' data-custom='test' />);
      const title = screen.getByTestId('card-title');
      expect(title).toHaveAttribute('id', 'title-id');
      expect(title).toHaveAttribute('data-custom', 'test');
    });

    it('renders children', () => {
      render(<CardTitle>Title content</CardTitle>);
      expect(screen.getByText('Title content')).toBeInTheDocument();
    });
  });

  describe('CardDescription', () => {
    it('renders with default classes', () => {
      render(<CardDescription />);
      const description = screen.getByTestId('card-description');
      expect(description).toBeInTheDocument();
      expect(description).toHaveAttribute('data-slot', 'card-description');
      expect(description).toHaveAttribute('data-testid', 'card-description');
      expect(hasClass(description, 'text-muted-foreground')).toBe(true);
      expect(hasClass(description, 'text-sm')).toBe(true);
    });

    it('applies custom className', () => {
      render(<CardDescription className='custom-description' />);
      const description = screen.getByTestId('card-description');
      expect(hasClass(description, 'custom-description')).toBe(true);
    });

    it('forwards additional props', () => {
      render(<CardDescription id='description-id' data-custom='test' />);
      const description = screen.getByTestId('card-description');
      expect(description).toHaveAttribute('id', 'description-id');
      expect(description).toHaveAttribute('data-custom', 'test');
    });

    it('renders children', () => {
      render(<CardDescription>Description content</CardDescription>);
      expect(screen.getByText('Description content')).toBeInTheDocument();
    });
  });

  describe('CardAction', () => {
    it('renders with default classes', () => {
      render(<CardAction />);
      const action = screen.getByTestId('card-action');
      expect(action).toBeInTheDocument();
      expect(action).toHaveAttribute('data-slot', 'card-action');
      expect(action).toHaveAttribute('data-testid', 'card-action');
      expect(hasClass(action, 'col-start-2')).toBe(true);
      expect(hasClass(action, 'row-span-2')).toBe(true);
      expect(hasClass(action, 'row-start-1')).toBe(true);
      expect(hasClass(action, 'self-start')).toBe(true);
      expect(hasClass(action, 'justify-self-end')).toBe(true);
    });

    it('applies custom className', () => {
      render(<CardAction className='custom-action' />);
      const action = screen.getByTestId('card-action');
      expect(hasClass(action, 'custom-action')).toBe(true);
    });

    it('forwards additional props', () => {
      render(<CardAction id='action-id' data-custom='test' />);
      const action = screen.getByTestId('card-action');
      expect(action).toHaveAttribute('id', 'action-id');
      expect(action).toHaveAttribute('data-custom', 'test');
    });

    it('renders children', () => {
      render(<CardAction>Action content</CardAction>);
      expect(screen.getByText('Action content')).toBeInTheDocument();
    });
  });

  describe('CardContent', () => {
    it('renders with default classes', () => {
      render(<CardContent />);
      const content = screen.getByTestId('card-content');
      expect(content).toBeInTheDocument();
      expect(content).toHaveAttribute('data-slot', 'card-content');
      expect(content).toHaveAttribute('data-testid', 'card-content');
      expect(hasClass(content, 'px-6')).toBe(true);
    });

    it('applies custom className', () => {
      render(<CardContent className='custom-content' />);
      const content = screen.getByTestId('card-content');
      expect(hasClass(content, 'custom-content')).toBe(true);
    });

    it('forwards additional props', () => {
      render(<CardContent id='content-id' data-custom='test' />);
      const content = screen.getByTestId('card-content');
      expect(content).toHaveAttribute('id', 'content-id');
      expect(content).toHaveAttribute('data-custom', 'test');
    });

    it('renders children', () => {
      render(<CardContent>Content text</CardContent>);
      expect(screen.getByText('Content text')).toBeInTheDocument();
    });
  });

  describe('CardFooter', () => {
    it('renders with default classes', () => {
      render(<CardFooter />);
      const footer = screen.getByTestId('card-footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveAttribute('data-slot', 'card-footer');
      expect(footer).toHaveAttribute('data-testid', 'card-footer');
      expect(hasClass(footer, 'flex')).toBe(true);
      expect(hasClass(footer, 'items-center')).toBe(true);
      expect(hasClass(footer, 'px-6')).toBe(true);
    });

    it('applies custom className', () => {
      render(<CardFooter className='custom-footer' />);
      const footer = screen.getByTestId('card-footer');
      expect(hasClass(footer, 'custom-footer')).toBe(true);
    });

    it('forwards additional props', () => {
      render(<CardFooter id='footer-id' data-custom='test' />);
      const footer = screen.getByTestId('card-footer');
      expect(footer).toHaveAttribute('id', 'footer-id');
      expect(footer).toHaveAttribute('data-custom', 'test');
    });

    it('renders children', () => {
      render(<CardFooter>Footer content</CardFooter>);
      expect(screen.getByText('Footer content')).toBeInTheDocument();
    });

    it('applies border-top padding when border-t is present', () => {
      render(<CardFooter className='border-t' />);
      const footer = screen.getByTestId('card-footer');
      expect(hasClass(footer, '[.border-t]:pt-6')).toBe(true);
    });
  });
});
