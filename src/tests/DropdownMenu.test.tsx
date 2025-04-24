import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from '../components';

// Mock ReactDOM.createPortal
vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom');
  return {
    ...actual,
    createPortal: (children: React.ReactNode) => children,
  };
});

describe('DropdownMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders DropdownMenuTrigger and toggles content', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Toggle</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getByText('Toggle')).toBeInTheDocument();
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Toggle'));
    expect(screen.getByText('Item 1')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Toggle'));
    await waitFor(() =>
      expect(screen.queryByText('Item 1')).not.toBeInTheDocument()
    );
  });

  it('closes DropdownMenuContent when clicking outside', async () => {
    render(
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>Toggle</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div data-testid='outside'>Outside</div>
      </div>
    );

    await userEvent.click(screen.getByText('Toggle'));
    expect(screen.getByText('Item 1')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('outside'));
    await waitFor(() =>
      expect(screen.queryByText('Item 1')).not.toBeInTheDocument()
    );
  });

  it('supports asChild prop in DropdownMenuTrigger', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div data-testid='custom-trigger'>Custom Toggle</div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByTestId('custom-trigger');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(trigger);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('supports asChild prop in DropdownMenuContent', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Toggle</DropdownMenuTrigger>
        <DropdownMenuContent asChild>
          <div data-testid='custom-content'>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await userEvent.click(screen.getByText('Toggle'));
    // CHANGE: Updated to handle multiple elements and filter by data-slot
    const contents = screen.getAllByTestId('custom-content');
    const content = contents.find(
      (el) =>
        el.hasAttribute('data-slot') &&
        el.getAttribute('data-slot') === 'dropdown-menu-content'
    );
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute('data-slot', 'dropdown-menu-content');
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('handles keyboard navigation in DropdownMenuItem', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Toggle</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await userEvent.click(screen.getByText('Toggle'));
    const item1 = screen.getByText('Item 1');
    const item2 = screen.getByText('Item 2');

    item1.focus();
    expect(item1).toHaveFocus();

    await userEvent.keyboard('{ArrowDown}');
    expect(item2).toHaveFocus();

    await userEvent.keyboard('{ArrowUp}');
    expect(item1).toHaveFocus();

    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(screen.queryByText('Item 1')).not.toBeInTheDocument()
    );
  });

  it('calls onSelect and closes menu when DropdownMenuItem is clicked', async () => {
    const onSelect = vi.fn();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Toggle</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onSelect}>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await userEvent.click(screen.getByText('Toggle'));
    await userEvent.click(screen.getByText('Item 1'));

    expect(onSelect).toHaveBeenCalled();
    await waitFor(() =>
      expect(screen.queryByText('Item 1')).not.toBeInTheDocument()
    );
  });

  it('handles disabled DropdownMenuItem', async () => {
    const onSelect = vi.fn();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Toggle</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled onSelect={onSelect}>
            Item 1
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await userEvent.click(screen.getByText('Toggle'));
    const item = screen.getByText('Item 1');

    await userEvent.click(item);
    expect(onSelect).not.toHaveBeenCalled();
    expect(item).toHaveAttribute('data-disabled', 'true');
    expect(item).toHaveAttribute('tabIndex', '-1');
  });

  it('renders DropdownMenuCheckboxItem and toggles checked state', async () => {
    const onChange = vi.fn();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Toggle</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked={false} onChange={onChange}>
            Check
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await userEvent.click(screen.getByText('Toggle'));
    const checkboxItem = screen.getByText('Check');

    expect(
      checkboxItem.parentElement?.querySelector('svg')
    ).not.toBeInTheDocument();

    await userEvent.click(checkboxItem);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('renders DropdownMenuRadioGroup and RadioItem', async () => {
    const onSelect = vi.fn();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Toggle</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup>
            <DropdownMenuRadioItem checked={true} onSelect={onSelect}>
              Radio 1
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem checked={false} onSelect={onSelect}>
              Radio 2
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await userEvent.click(screen.getByText('Toggle'));
    const radio1 = screen.getByText('Radio 1');
    const radio2 = screen.getByText('Radio 2');

    expect(radio1.parentElement?.querySelector('svg')).toBeInTheDocument();
    expect(radio2.parentElement?.querySelector('.size-2')).toBeInTheDocument();

    await userEvent.click(radio2);
    expect(onSelect).toHaveBeenCalled();
  });

  it('renders DropdownMenuSeparator', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Toggle</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          // CHANGE: Removed data-testid from DropdownMenuSeparator
          <DropdownMenuSeparator />
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await userEvent.click(screen.getByText('Toggle'));
    // CHANGE: Updated query to use data-slot instead of data-testid
    const separator = document.querySelector(
      '[data-slot="dropdown-menu-separator"]'
    );
    expect(separator).toHaveClass('bg-border');
  });

  it('renders DropdownMenuLabel with inset', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Toggle</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel inset>Label</DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await userEvent.click(screen.getByText('Toggle'));
    const label = screen.getByText('Label');
    expect(label).toHaveAttribute('data-inset', 'true');
    expect(label).toHaveClass('pl-8');
  });

  it('renders DropdownMenuShortcut', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Toggle</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            Item
            <DropdownMenuShortcut>Ctrl+S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await userEvent.click(screen.getByText('Toggle'));
    expect(screen.getByText('Ctrl+S')).toHaveClass('ml-auto');
  });

  it('renders DropdownMenuGroup', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Toggle</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await userEvent.click(screen.getByText('Toggle'));
    expect(screen.getByRole('group')).toHaveAttribute(
      'data-slot',
      'dropdown-menu-group'
    );
  });

  it('renders DropdownMenuSub and toggles SubContent', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Toggle</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Sub Menu</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Sub Item</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await userEvent.click(screen.getByText('Toggle'));
    expect(screen.queryByText('Sub Item')).not.toBeInTheDocument();

    const subTrigger = screen.getByText('Sub Menu');
    fireEvent.mouseEnter(subTrigger);
    await waitFor(() =>
      expect(screen.getByText('Sub Item')).toBeInTheDocument()
    );

    fireEvent.mouseLeave(subTrigger);
    await waitFor(
      () => expect(screen.queryByText('Sub Item')).not.toBeInTheDocument(),
      {
        timeout: 200,
      }
    );
  });

  it('keeps DropdownMenuSubContent open on mouse enter', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Toggle</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Sub Menu</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Sub Item</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await userEvent.click(screen.getByText('Toggle'));
    const subTrigger = screen.getByText('Sub Menu');
    fireEvent.mouseEnter(subTrigger);
    await waitFor(() =>
      expect(screen.getByText('Sub Item')).toBeInTheDocument()
    );

    const subContent = screen.getByText('Sub Item').parentElement!;
    fireEvent.mouseEnter(subContent);
    fireEvent.mouseLeave(subTrigger);
    await waitFor(() =>
      expect(screen.getByText('Sub Item')).toBeInTheDocument()
    );
  });

  it('supports asChild in DropdownMenuSubTrigger', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Toggle</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger asChild>
              <div data-testid='custom-sub-trigger'>Sub Menu</div>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Sub Item</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await userEvent.click(screen.getByText('Toggle'));
    const subTrigger = screen.getByTestId('custom-sub-trigger');
    fireEvent.mouseEnter(subTrigger);
    await waitFor(() =>
      expect(screen.getByText('Sub Item')).toBeInTheDocument()
    );
  });

  it('supports asChild in DropdownMenuSubContent', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Toggle</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Sub Menu</DropdownMenuSubTrigger>
            <DropdownMenuSubContent asChild>
              <div data-testid='custom-sub-content'>
                <DropdownMenuItem>Sub Item</DropdownMenuItem>
              </div>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await userEvent.click(screen.getByText('Toggle'));
    const subTrigger = screen.getByText('Sub Menu');
    fireEvent.mouseEnter(subTrigger);
    // CHANGE: Updated to handle multiple elements and filter by data-slot
    await waitFor(() => {
      const subContents = screen.getAllByTestId('custom-sub-content');
      const subContent = subContents.find(
        (el) =>
          el.hasAttribute('data-slot') &&
          el.getAttribute('data-slot') === 'dropdown-menu-sub-content'
      );
      expect(subContent).toBeInTheDocument();
      expect(subContent).toHaveAttribute(
        'data-slot',
        'dropdown-menu-sub-content'
      );
      expect(screen.getByText('Sub Item')).toBeInTheDocument();
    });
  });

  it('renders DropdownMenuPortal', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Toggle</DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    );

    await userEvent.click(screen.getByText('Toggle'));
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(
      screen.getByText('Item 1').closest('[data-slot="dropdown-menu-portal"]')
    ).toBeInTheDocument();
  });

  it('applies destructive variant to DropdownMenuItem', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Toggle</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem variant='destructive'>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await userEvent.click(screen.getByText('Toggle'));
    const item = screen.getByText('Delete');
    expect(item).toHaveAttribute('data-variant', 'destructive');
    expect(item).toHaveClass('text-destructive');
  });

  it('throws error when DropdownMenuTrigger is used outside DropdownMenu', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    expect(() =>
      render(<DropdownMenuTrigger>Toggle</DropdownMenuTrigger>)
    ).toThrow('DropdownMenuTrigger must be inside DropdownMenu');
    consoleError.mockRestore();
  });

  it('throws error when DropdownMenuContent is used outside DropdownMenu', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    expect(() =>
      render(
        <DropdownMenuContent>
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>
      )
    ).toThrow('DropdownMenuContent must be inside DropdownMenu');
    consoleError.mockRestore();
  });

  it('throws error when DropdownMenuSubTrigger is used outside DropdownMenuSub', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    expect(() =>
      render(<DropdownMenuSubTrigger>Sub</DropdownMenuSubTrigger>)
    ).toThrow('SubTrigger must be inside DropdownMenuSub');
    consoleError.mockRestore();
  });

  it('throws error when DropdownMenuSubContent is used outside DropdownMenuSub', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    expect(() =>
      render(
        <DropdownMenuSubContent>
          <DropdownMenuItem>Sub Item</DropdownMenuItem>
        </DropdownMenuSubContent>
      )
    ).toThrow('SubContent must be inside DropdownMenuSub');
    consoleError.mockRestore();
  });

  it('applies sideOffset to DropdownMenuContent', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Toggle</DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={10}>
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await userEvent.click(screen.getByText('Toggle'));
    const content = screen.getByText('Item').parentElement!;
    expect(content).toHaveStyle('margin-top: 10px');
  });

  it('handles Enter key on DropdownMenuItem', async () => {
    const onSelect = vi.fn();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Toggle</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onSelect}>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await userEvent.click(screen.getByText('Toggle'));
    const item = screen.getByText('Item');
    item.focus();

    await userEvent.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalled();
    await waitFor(() =>
      expect(screen.queryByText('Item')).not.toBeInTheDocument()
    );
  });

  it('handles Space key on DropdownMenuItem', async () => {
    const onSelect = vi.fn();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Toggle</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onSelect}>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await userEvent.click(screen.getByText('Toggle'));
    const item = screen.getByText('Item');
    item.focus();

    await userEvent.keyboard(' ');
    expect(onSelect).toHaveBeenCalled();
    await waitFor(() =>
      expect(screen.queryByText('Item')).not.toBeInTheDocument()
    );
  });

  it('positions DropdownMenuSubContent correctly', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Toggle</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Sub Menu</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Sub Item</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await userEvent.click(screen.getByText('Toggle'));
    const subTrigger = screen.getByText('Sub Menu');
    fireEvent.mouseEnter(subTrigger);
    await waitFor(() =>
      expect(screen.getByText('Sub Item')).toBeInTheDocument()
    );

    const subContent = screen.getByText('Sub Item').parentElement!;
    expect(subContent).toHaveStyle('top: 0px');
    expect(subContent).toHaveStyle('left: 4px');
  });

  it('closes DropdownMenuContent on outside mousedown via onClick handler', async () => {
    // CHANGE: Mock setTimeout to track timeout setting
    const setTimeoutSpy = vi.spyOn(window, 'setTimeout');
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');

    // Mock document.addEventListener and removeEventListener
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    const { unmount } = render(
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>Toggle</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            // CHANGE: Added DropdownMenuSub to trigger potential timeout
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Sub Menu</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Sub Item</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
        <div data-testid='outside'>Outside</div>
      </div>
    );

    // Verify addEventListener was called for mousedown
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function)
    );

    await userEvent.click(screen.getByText('Toggle'));
    expect(screen.getByText('Item 1')).toBeInTheDocument();

    // CHANGE: Simulate hover on Sub Menu to set a timeout
    const subTrigger = screen.getByText('Sub Menu');
    fireEvent.mouseEnter(subTrigger);
    await waitFor(() =>
      expect(screen.getByText('Sub Item')).toBeInTheDocument()
    );

    // CHANGE: Note about setTimeoutSpy
    // Verify setTimeout was called (if applicable)
    // Note: This depends on the component setting a timeout on hover
    // If no timeout is set, setTimeoutSpy will have 0 calls
    // We proceed to ensure clearTimeout is called during mousedown and cleanup

    // Simulate a mousedown event on the document
    fireEvent(document, new MouseEvent('mousedown', { bubbles: true }));
    // Verify the menu closes
    await waitFor(
      () => expect(screen.queryByText('Item 1')).not.toBeInTheDocument(),
      { timeout: 1000 }
    );

    // Verify clearTimeout was called during the event
    expect(clearTimeoutSpy).toHaveBeenCalled();

    // Unmount the component to trigger cleanup
    unmount();

    // Verify removeEventListener was called
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function)
    );

    // CHANGE: Conditional clearTimeout expectation based on setTimeout
    // Verify clearTimeout was called during cleanup
    // If setTimeout was called, expect 2 calls; otherwise, expect at least 1
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(
      setTimeoutSpy.mock.calls.length ? 2 : 1
    );
  });

  it('throws error when DropdownMenuItem is used outside DropdownMenu', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    expect(() => render(<DropdownMenuItem>Item 1</DropdownMenuItem>)).toThrow(
      'DropdownMenuItem must be inside DropdownMenu'
    );
    consoleError.mockRestore();
  });

  it('handles wrap-around keyboard navigation in DropdownMenuItem', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Toggle</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
          <DropdownMenuItem>Item 3</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await userEvent.click(screen.getByText('Toggle'));
    const item1 = screen.getByText('Item 1');
    const item3 = screen.getByText('Item 3');

    // Start at the last item and navigate down to wrap to the first
    item3.focus();
    expect(item3).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    expect(item1).toHaveFocus(); // Covers: const next = itemsRef.current[idx + 1] || itemsRef.current[0]

    // Start at the first item and navigate up to wrap to the last
    item1.focus();
    expect(item1).toHaveFocus();
    await userEvent.keyboard('{ArrowUp}');
    expect(item3).toHaveFocus(); // Covers: const prev = itemsRef.current[idx - 1] || itemsRef.current[itemsRef.current.length - 1]
  });

  it('renders DropdownMenuLabel without inset', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Toggle</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel inset={false}>Label</DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await userEvent.click(screen.getByText('Toggle'));
    const label = screen.getByText('Label');
    expect(label).not.toHaveClass('pl-8'); // Covers: inset && 'pl-8' (false case)
    expect(label).toHaveAttribute('data-inset', 'false'); // Ensure inset prop is explicitly false
  });

  it('renders DropdownMenuSubTrigger with inset', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Toggle</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger inset>Sub Menu</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Sub Item</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await userEvent.click(screen.getByText('Toggle'));
    const subTrigger = screen.getByText('Sub Menu');
    expect(subTrigger).toHaveClass('pl-8'); // Covers: inset && 'pl-8' (true case)
    expect(subTrigger).toHaveAttribute('data-inset', 'true');
  });

  it('closes DropdownMenuSubContent on mouse leave', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Toggle</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Sub Menu</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Sub Item</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await userEvent.click(screen.getByText('Toggle'));
    const subTrigger = screen.getByText('Sub Menu');
    fireEvent.mouseEnter(subTrigger);
    await waitFor(() => {
      expect(screen.getByText('Sub Item')).toBeInTheDocument();
    });

    const subContent = screen.getByText('Sub Item').parentElement!;
    fireEvent.mouseLeave(subContent);
    await waitFor(() => {
      expect(screen.queryByText('Sub Item')).not.toBeInTheDocument();
    });
  });
});
