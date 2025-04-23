import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll, vi } from 'vitest';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from '../components';

// Mock ResizeObserver for testing environment
beforeAll(() => {
  class ResizeObserver {
    callback: ResizeObserverCallback;
    constructor(callback: ResizeObserverCallback) {
      this.callback = callback;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  (global as typeof globalThis).ResizeObserver = ResizeObserver;
});

describe('<Select /> component', () => {
  it('renders placeholder and toggles dropdown', () => {
    render(
      <Select placeholder='Choose'>
        <SelectTrigger data-testid='trigger' />
        <SelectContent>
          <SelectItem value='apple'>Apple</SelectItem>
          <SelectItem value='banana'>Banana</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByTestId('trigger');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).toBeNull();

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('selects value and calls onValueChange', () => {
    const onChange = vi.fn();
    render(
      <Select placeholder='Choose' onValueChange={onChange}>
        <SelectTrigger />
        <SelectContent>
          <SelectItem value='apple'>Apple</SelectItem>
          <SelectItem value='banana'>Banana</SelectItem>
        </SelectContent>
      </Select>
    );

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Apple'));
    expect(onChange).toHaveBeenCalledWith('apple');
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('displays defaultValue capitalized', () => {
    render(
      <Select defaultValue='banana'>
        <SelectTrigger data-testid='trigger' />
        <SelectContent>
          <SelectItem value='banana'>Banana</SelectItem>
        </SelectContent>
      </Select>
    );
    expect(screen.getByTestId('trigger')).toHaveTextContent('Banana');
  });

  it('closes dropdown on outside click', () => {
    render(
      <>
        <Select>
          <SelectTrigger data-testid='trigger' />
          <SelectContent>
            <SelectItem value='apple'>Apple</SelectItem>
          </SelectContent>
        </Select>
        <button data-testid='outside'>Outside</button>
      </>
    );
    fireEvent.click(screen.getByTestId('trigger'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('renders SelectValue with placeholder and selected', () => {
    render(
      <Select placeholder='Pick'>
        <SelectValue data-testid='value' />
        <SelectTrigger />
        <SelectContent>
          <SelectItem value='a'>A</SelectItem>
        </SelectContent>
      </Select>
    );
    const value = screen.getByTestId('value');
    expect(value).toHaveTextContent('Pick');
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('A'));
    expect(value).toHaveTextContent('A');
  });

  it('renders grouping, label, and separator', () => {
    render(
      <Select>
        <SelectTrigger />
        <SelectContent>
          <SelectGroup>
            <SelectLabel data-testid='label'>Group</SelectLabel>
            <SelectItem value='x'>X</SelectItem>
            <SelectSeparator data-testid='sep' />
            <SelectItem value='y'>Y</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByTestId('label')).toHaveTextContent('Group');
    expect(screen.getByTestId('sep').tagName).toBe('HR');
  });

  it('size prop applies correct height and text classes', () => {
    const { rerender } = render(
      <Select>
        <SelectTrigger size='sm' data-testid='trigger-sm' />
      </Select>
    );
    const smallTrigger = screen.getByTestId('trigger-sm');
    expect(smallTrigger.className).toMatch(/h-8/);
    expect(smallTrigger.className).toMatch(/text-sm/);

    rerender(
      <Select>
        <SelectTrigger data-testid='trigger-default' />
      </Select>
    );
    const defaultTrigger = screen.getByTestId('trigger-default');
    expect(defaultTrigger.className).toMatch(/h-9/);
    expect(defaultTrigger.className).toMatch(/text-sm/);
  });

  it('selected item has selected classes', () => {
    render(
      <Select defaultValue='banana'>
        <SelectTrigger data-testid='trigger' />
        <SelectContent>
          <SelectItem value='banana'>Banana</SelectItem>
          <SelectItem value='apple'>Apple</SelectItem>
        </SelectContent>
      </Select>
    );
    fireEvent.click(screen.getByTestId('trigger'));
    const bananaItem = screen.getByRole('option', { name: 'Banana' });
    expect(bananaItem.className).toMatch(/bg-accent/);
    expect(bananaItem.className).toMatch(/text-accent-foreground/);
  });

  it('disabled item has disabled classes and is not selectable', () => {
    render(
      <Select placeholder='None'>
        <SelectValue data-testid='value' />
        <SelectTrigger data-testid='trigger' />
        <SelectContent>
          <SelectItem value='x' disabled>
            X
          </SelectItem>
        </SelectContent>
      </Select>
    );
    fireEvent.click(screen.getByTestId('trigger'));
    const disabledItem = screen.getByRole('option', { name: 'X' });
    expect(disabledItem.className).toMatch(/opacity-50/);
    expect(disabledItem.className).toMatch(/cursor-not-allowed/);
    fireEvent.click(disabledItem);
    // Value should remain placeholder
    expect(screen.getByTestId('value')).toHaveTextContent('None');
  });

  it('renders scroll arrows on overflow when scroll state meets conditions', () => {
    const items = Array.from({ length: 20 }, (_, i) => `Item ${i}`);
    render(
      <Select>
        <SelectTrigger data-testid='trigger' />
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item} value={item.toLowerCase().replace(' ', '-')}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
    const trigger = screen.getByTestId('trigger');
    fireEvent.click(trigger);
    const listbox = screen.getByRole('listbox');
    // Stub overflow properties to simulate overflow and scroll
    Object.defineProperty(listbox, 'scrollHeight', {
      value: 200,
      configurable: true,
    });
    Object.defineProperty(listbox, 'clientHeight', {
      value: 100,
      configurable: true,
    });
    Object.defineProperty(listbox, 'scrollTop', {
      value: 50,
      configurable: true,
    });
    fireEvent.scroll(listbox);
    // The sticky scroll buttons are rendered as siblings inside the SelectContent wrapper
    const selectContentWrapper = listbox.parentElement;
    expect(
      selectContentWrapper?.querySelector('div.sticky.top-0')
    ).toBeInTheDocument();
    expect(
      selectContentWrapper?.querySelector('div.sticky.bottom-0')
    ).toBeInTheDocument();
  });

  it('scroll buttons call scrollBy', () => {
    render(
      <Select>
        <SelectTrigger />
        <SelectContent>
          <SelectScrollUpButton />
          <SelectScrollDownButton />
        </SelectContent>
      </Select>
    );
    fireEvent.click(screen.getByRole('button'));
    const listbox = screen.getByRole('listbox');
    listbox.scrollBy = vi.fn();
    fireEvent.click(screen.getByTestId('scroll-up-button'));
    expect(listbox.scrollBy).toHaveBeenCalledWith({
      top: -50,
      behavior: 'smooth',
    });
    fireEvent.click(screen.getByTestId('scroll-down-button'));
    expect(listbox.scrollBy).toHaveBeenCalledWith({
      top: 50,
      behavior: 'smooth',
    });
  });

  it('throws error if used outside Select', () => {
    const consoleError = console.error;
    console.error = () => {};
    expect(() => render(<SelectTrigger />)).toThrow(
      'Select components must be used within a <Select />'
    );
    expect(() => render(<SelectValue />)).toThrow(
      'Select components must be used within a <Select />'
    );
    console.error = consoleError;
  });

  it('scroll buttons call scrollBy', () => {
    render(
      <Select>
        <SelectTrigger />
        <SelectContent>
          {Array.from({ length: 20 }).map((_, i) => (
            <SelectItem key={i} value={`Option ${i + 1}`}>
              Option {i + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );

    // Open the dropdown
    fireEvent.click(screen.getByRole('button'));

    // Get the listbox
    const listbox = screen.getByRole('listbox');

    // Mock DOM properties to simulate scrollable content
    Object.defineProperties(listbox, {
      scrollHeight: { value: 600, configurable: true }, // Content taller than max height
      clientHeight: { value: 300, configurable: true }, // Visible height (matches max-h-[300px])
      scrollTop: { value: 0, configurable: true }, // Start at top
    });

    // Mock scrollBy
    const scrollByMock = vi.fn<(options: ScrollToOptions) => void>();
    listbox.scrollBy = scrollByMock as unknown as typeof listbox.scrollBy;

    // Trigger scroll event to update scrollState
    fireEvent.scroll(listbox);

    // Test scroll-down button
    const scrollDownButton = screen.getByTestId('scroll-down-button-1');
    fireEvent.click(scrollDownButton);
    expect(scrollByMock).toHaveBeenCalledWith({
      top: 50,
      behavior: 'smooth',
    });

    // Reset scrollBy mock to clear previous calls
    scrollByMock.mockReset();

    // Simulate scrolling down to make scroll-up button appear
    Object.defineProperty(listbox, 'scrollTop', {
      value: 100,
      configurable: true,
    }); // Scroll down
    fireEvent.scroll(listbox); // Trigger scroll event to update scrollState

    // Test scroll-up button
    const scrollUpButton = screen.getByTestId('scroll-up-button-1');
    fireEvent.click(scrollUpButton);
    expect(scrollByMock).toHaveBeenCalledWith({
      top: -50,
      behavior: 'smooth',
    });
  });
});
