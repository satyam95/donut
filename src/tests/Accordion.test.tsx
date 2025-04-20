import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../components';

// Mock requestAnimationFrame
vi.useFakeTimers();

describe('Accordion Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Accordion>
        <AccordionItem id='item-1'>
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content for Item 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(container).toBeInTheDocument();
  });

  it('opens and closes items in single mode', () => {
    render(
      <Accordion type='single'>
        <AccordionItem id='item-1'>
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content for Item 1</AccordionContent>
        </AccordionItem>
        <AccordionItem id='item-2'>
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content for Item 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const item1Trigger = screen.getByText('Item 1');
    const item2Trigger = screen.getByText('Item 2');
    const item1Content = screen.getByTestId('accordion-content-item-1');
    const item2Content = screen.getByTestId('accordion-content-item-2');

    // Initial state
    expect(item1Content).toHaveStyle({ display: 'none' });
    expect(item2Content).toHaveStyle({ display: 'none' });

    // Open first item
    fireEvent.click(item1Trigger);
    expect(item1Content).toHaveStyle({ display: 'block' });
    expect(item2Content).toHaveStyle({ display: 'none' });

    // Open second item (should close first)
    fireEvent.click(item2Trigger);
    expect(item1Content).toHaveStyle({ display: 'none' });
    expect(item2Content).toHaveStyle({ display: 'block' });

    // Close second item
    fireEvent.click(item2Trigger);
    expect(item1Content).toHaveStyle({ display: 'none' });
    expect(item2Content).toHaveStyle({ display: 'none' });
  });

  it('supports multiple items open in multiple mode', () => {
    render(
      <Accordion type='multiple'>
        <AccordionItem id='item-1'>
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content for Item 1</AccordionContent>
        </AccordionItem>
        <AccordionItem id='item-2'>
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content for Item 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const item1Trigger = screen.getByText('Item 1');
    const item2Trigger = screen.getByText('Item 2');
    const item1Content = screen.getByTestId('accordion-content-item-1');
    const item2Content = screen.getByTestId('accordion-content-item-2');

    // Initial state
    expect(item1Content).toHaveStyle({ display: 'none' });
    expect(item2Content).toHaveStyle({ display: 'none' });

    // Open both items
    fireEvent.click(item1Trigger);
    fireEvent.click(item2Trigger);
    expect(item1Content).toHaveStyle({ display: 'block' });
    expect(item2Content).toHaveStyle({ display: 'block' });

    // Close both items
    fireEvent.click(item1Trigger);
    fireEvent.click(item2Trigger);
    expect(item1Content).toHaveStyle({ display: 'none' });
    expect(item2Content).toHaveStyle({ display: 'none' });
  });

  it('handles defaultOpenKeys in single mode', () => {
    render(
      <Accordion type='single' defaultOpenKeys={['item-1']}>
        <AccordionItem id='item-1'>
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content for Item 1</AccordionContent>
        </AccordionItem>
        <AccordionItem id='item-2'>
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content for Item 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const item1Content = screen.getByTestId('accordion-content-item-1');
    const item2Content = screen.getByTestId('accordion-content-item-2');

    expect(item1Content).toHaveStyle({ display: 'block' });
    expect(item2Content).toHaveStyle({ display: 'none' });
  });

  it('handles defaultOpenKeys in multiple mode', () => {
    render(
      <Accordion type='multiple' defaultOpenKeys={['item-1', 'item-2']}>
        <AccordionItem id='item-1'>
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content for Item 1</AccordionContent>
        </AccordionItem>
        <AccordionItem id='item-2'>
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content for Item 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const item1Content = screen.getByTestId('accordion-content-item-1');
    const item2Content = screen.getByTestId('accordion-content-item-2');

    expect(item1Content).toHaveStyle({ display: 'block' });
    expect(item2Content).toHaveStyle({ display: 'block' });
  });

  it('works without explicit IDs', () => {
    render(
      <Accordion>
        <AccordionItem>
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content for Item 1</AccordionContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content for Item 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const item1Trigger = screen.getByText('Item 1');
    const item1Content = screen.getByTestId(
      'accordion-content-accordion-item-0'
    );

    expect(item1Content).toHaveStyle({ display: 'none' });
    fireEvent.click(item1Trigger);
    expect(item1Content).toHaveStyle({ display: 'block' });
  });

  it('applies custom className to components', () => {
    const { container } = render(
      <Accordion className='custom-accordion'>
        <AccordionItem className='custom-item'>
          <AccordionTrigger className='custom-trigger'>Item 1</AccordionTrigger>
          <AccordionContent className='custom-content'>
            Content for Item 1
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    expect(container.querySelector('.custom-accordion')).toBeInTheDocument();
    expect(container.querySelector('.custom-item')).toBeInTheDocument();
    expect(container.querySelector('.custom-trigger')).toBeInTheDocument();
    expect(container.querySelector('.custom-content')).toBeInTheDocument();
  });

  it('handles keyboard navigation with valid keys', () => {
    render(
      <Accordion>
        <AccordionItem id='item-1'>
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content for Item 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger = screen.getByText('Item 1');
    const content = screen.getByTestId('accordion-content-item-1');

    expect(content).toHaveStyle({ display: 'none' });
    fireEvent.keyDown(trigger, { key: 'Enter' });
    expect(content).toHaveStyle({ display: 'block' });
    fireEvent.keyDown(trigger, { key: ' ' });
    expect(content).toHaveStyle({ display: 'none' });
  });

  it('does not toggle on irrelevant key presses', () => {
    render(
      <Accordion>
        <AccordionItem id='item-1'>
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content for Item 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger = screen.getByText('Item 1');
    const content = screen.getByTestId('accordion-content-item-1');

    expect(content).toHaveStyle({ display: 'none' });
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    expect(content).toHaveStyle({ display: 'none' });
    // Additional irrelevant key to ensure coverage
    fireEvent.keyDown(trigger, { key: 'Tab' });
    expect(content).toHaveStyle({ display: 'none' });
  });

  it('renders content with correct display style based on isOpen', () => {
    render(
      <Accordion>
        <AccordionItem id='item-1' isOpen={false}>
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content for Item 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const content = screen.getByTestId('accordion-content-item-1');
    expect(content).toHaveStyle({ display: 'none' });
    expect(content.style.display).toBe('none');
  });

  it('maintains proper ARIA attributes', () => {
    render(
      <Accordion>
        <AccordionItem id='item-1'>
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content for Item 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger = screen.getByText('Item 1');
    const content = screen.getByTestId('accordion-content-item-1');

    // Initial state
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(content).toHaveAttribute('aria-hidden', 'true');

    // After opening
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(content).toHaveAttribute('aria-hidden', 'false');
  });

  it('renders non-component children in Accordion without errors', () => {
    render(
      <Accordion>
        <div>Non-component child</div>
        <AccordionItem id='item-1'>
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content for Item 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    expect(screen.getByText('Non-component child')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    const { container } = render(
      <Accordion>
        <AccordionItem id='item-1'>
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content for Item 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(container).toBeInTheDocument();
  });

  it('covers non-element children at Accordion root', () => {
    render(
      <Accordion>
        {/* CHANGED: primitive child at root to hit fallback */}
        {'Primitive Text'}
        <AccordionItem id='item-1'>
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content for Item 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByText('Primitive Text')).toBeInTheDocument();
  });

  it('covers non-element children inside AccordionItem', () => {
    render(
      <Accordion>
        <AccordionItem id='item-1'>
          {/* CHANGED: inline string child in item to hit fallback */}
          {'Inline String'}
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content for Item 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByText('Inline String')).toBeInTheDocument();
  });
});
