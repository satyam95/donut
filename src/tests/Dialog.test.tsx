import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '../components/Dialog';

// Cleanup after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Mock onOpenChange for controlled mode
const mockOnOpenChange = vi.fn();

describe('Dialog Component', () => {
  describe('Uncontrolled Mode', () => {
    it('renders nothing initially when defaultOpen is false', () => {
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent>Content</DialogContent>
          </DialogPortal>
        </Dialog>
      );

      expect(screen.queryByText('Content')).not.toBeInTheDocument();
      expect(screen.queryByText('Close')).not.toBeInTheDocument();
      expect(screen.getByText('Open')).toBeInTheDocument();
    });

    it('opens dialog when DialogTrigger is clicked', async () => {
      render(
        <Dialog>
          <DialogTrigger data-testid='trigger'>Open</DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent>Content</DialogContent>
          </DialogPortal>
        </Dialog>
      );

      await userEvent.click(screen.getByTestId('trigger'));
      expect(screen.getByText('Content')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
      expect(screen.getByRole('dialog')).toHaveAttribute('data-state', 'open');
    });

    it('closes dialog when X button is clicked', async () => {
      render(
        <Dialog>
          <DialogTrigger data-testid='trigger'>Open</DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent>Content</DialogContent>
          </DialogPortal>
        </Dialog>
      );

      await userEvent.click(screen.getByTestId('trigger'));
      expect(screen.getByText('Content')).toBeInTheDocument();

      await userEvent.click(screen.getByRole('button', { name: 'Close' }));
      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });
    });

    it('closes dialog when DialogClose is clicked', async () => {
      render(
        <Dialog>
          <DialogTrigger data-testid='trigger'>Open</DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent>
              Content
              <DialogClose data-testid='close'>Close</DialogClose>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      );

      await userEvent.click(screen.getByTestId('trigger'));
      expect(screen.getByText('Content')).toBeInTheDocument();

      await userEvent.click(screen.getByTestId('close'));
      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });
    });

    it('closes dialog when DialogOverlay is clicked', async () => {
      render(
        <Dialog>
          <DialogTrigger data-testid='trigger'>Open</DialogTrigger>
          <DialogPortal>
            <DialogOverlay data-testid='overlay' />
            <DialogContent>Content</DialogContent>
          </DialogPortal>
        </Dialog>
      );

      await userEvent.click(screen.getByTestId('trigger'));
      expect(screen.getByText('Content')).toBeInTheDocument();

      await userEvent.click(screen.getByTestId('overlay'));
      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });
    });

    it('renders with defaultOpen true', () => {
      render(
        <Dialog defaultOpen>
          <DialogTrigger>Open</DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent>Content</DialogContent>
          </DialogPortal>
        </Dialog>
      );

      expect(screen.getByText('Content')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
      expect(screen.getByRole('dialog')).toHaveAttribute('data-state', 'open');
    });
  });

  describe('Controlled Mode', () => {
    it('respects open prop and calls onOpenChange', async () => {
      render(
        <Dialog open={false} onOpenChange={mockOnOpenChange}>
          <DialogTrigger data-testid='trigger'>Open</DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent>Content</DialogContent>
          </DialogPortal>
        </Dialog>
      );

      expect(screen.queryByText('Content')).not.toBeInTheDocument();
      await userEvent.click(screen.getByTestId('trigger'));
      expect(mockOnOpenChange).toHaveBeenCalledWith(true);
    });

    it('closes when X button is clicked in controlled mode', async () => {
      render(
        <Dialog open={true} onOpenChange={mockOnOpenChange}>
          <DialogTrigger>Open</DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent>Content</DialogContent>
          </DialogPortal>
        </Dialog>
      );

      expect(screen.getByText('Content')).toBeInTheDocument();
      await userEvent.click(screen.getByRole('button', { name: 'Close' }));
      expect(mockOnOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe('DialogTrigger', () => {
    it('renders asChild with custom element', async () => {
      render(
        <Dialog>
          <DialogTrigger asChild>
            <span data-testid='custom-trigger'>Open</span>
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent>Content</DialogContent>
          </DialogPortal>
        </Dialog>
      );

      await userEvent.click(screen.getByTestId('custom-trigger'));
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('preserves child onClick with asChild', async () => {
      const childOnClick = vi.fn();
      render(
        <Dialog>
          <DialogTrigger asChild>
            <span data-testid='custom-trigger' onClick={childOnClick}>
              Open
            </span>
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent>Content</DialogContent>
          </DialogPortal>
        </Dialog>
      );

      await userEvent.click(screen.getByTestId('custom-trigger'));
      expect(childOnClick).toHaveBeenCalled();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <Dialog>
          <DialogTrigger className='custom-class' data-testid='trigger'>
            Open
          </DialogTrigger>
          <DialogPortal>
            <DialogContent>Content</DialogContent>
          </DialogPortal>
        </Dialog>
      );

      expect(screen.getByTestId('trigger')).toHaveClass('custom-class');
    });
  });

  describe('DialogClose', () => {
    it('renders asChild with custom element', async () => {
      render(
        <Dialog defaultOpen>
          <DialogTrigger>Open</DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent>
              Content
              <DialogClose asChild>
                <span data-testid='custom-close'>Close</span>
              </DialogClose>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      );

      await userEvent.click(screen.getByTestId('custom-close'));
      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });
    });

    it('preserves child onClick with asChild', async () => {
      const childOnClick = vi.fn();
      render(
        <Dialog defaultOpen>
          <DialogTrigger>Open</DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent>
              Content
              <DialogClose asChild>
                <span data-testid='custom-close' onClick={childOnClick}>
                  Close
                </span>
              </DialogClose>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      );

      await userEvent.click(screen.getByTestId('custom-close'));
      expect(childOnClick).toHaveBeenCalled();
      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });
    });
  });

  describe('DialogOverlay', () => {
    it('applies custom className', () => {
      render(
        <Dialog defaultOpen>
          <DialogTrigger>Open</DialogTrigger>
          <DialogPortal>
            <DialogOverlay className='custom-overlay' data-testid='overlay' />
            <DialogContent>Content</DialogContent>
          </DialogPortal>
        </Dialog>
      );

      expect(screen.getByTestId('overlay')).toHaveClass('custom-overlay');
    });
  });

  describe('DialogContent', () => {
    it('applies custom className', () => {
      render(
        <Dialog defaultOpen>
          <DialogTrigger>Open</DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent className='custom-content'>Content</DialogContent>
          </DialogPortal>
        </Dialog>
      );

      expect(screen.getByRole('dialog')).toHaveClass('custom-content');
    });

    it('renders X button with sr-only text', () => {
      render(
        <Dialog defaultOpen>
          <DialogTrigger>Open</DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent>Content</DialogContent>
          </DialogPortal>
        </Dialog>
      );

      expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
      expect(screen.getByText('Close')).toHaveClass('sr-only');
    });
  });

  describe('DialogHeader', () => {
    it('renders with correct classes and custom className', () => {
      render(
        <Dialog defaultOpen>
          <DialogTrigger>Open</DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent>
              <DialogHeader className='custom-header' data-testid='header'>
                Header
              </DialogHeader>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      );

      const header = screen.getByTestId('header');
      expect(header).toHaveClass(
        'flex flex-col gap-2 text-center sm:text-left custom-header'
      );
    });
  });

  describe('DialogFooter', () => {
    it('renders with correct classes and custom className', () => {
      render(
        <Dialog defaultOpen>
          <DialogTrigger>Open</DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent>
              <DialogFooter className='custom-footer' data-testid='footer'>
                Footer
              </DialogFooter>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      );

      const footer = screen.getByTestId('footer');
      expect(footer).toHaveClass(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end custom-footer'
      );
    });
  });

  describe('DialogTitle', () => {
    it('renders with correct classes and custom className', () => {
      render(
        <Dialog defaultOpen>
          <DialogTrigger>Open</DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent>
              <DialogTitle className='custom-title' data-testid='title'>
                Title
              </DialogTitle>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      );

      const title = screen.getByTestId('title');
      expect(title).toHaveClass(
        'text-lg leading-none font-semibold custom-title'
      );
      expect(title.tagName).toBe('H2');
    });
  });

  describe('DialogDescription', () => {
    it('renders with correct classes and custom className', () => {
      render(
        <Dialog defaultOpen>
          <DialogTrigger>Open</DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent>
              <DialogDescription className='custom-desc' data-testid='desc'>
                Description
              </DialogDescription>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      );

      const desc = screen.getByTestId('desc');
      expect(desc).toHaveClass('text-muted-foreground text-sm custom-desc');
      expect(desc.tagName).toBe('P');
    });
  });

  describe('Context', () => {
    it('uses default context when components are used outside DialogContext', () => {
      render(<DialogTrigger data-testid='trigger'>Open</DialogTrigger>);
      expect(screen.getByTestId('trigger')).toBeInTheDocument();

      // Clicking trigger should not throw, but openDialog does nothing
      const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      fireEvent.click(screen.getByTestId('trigger'));
      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();

      render(<DialogClose data-testid='close'>Close</DialogClose>);
      expect(screen.getByTestId('close')).toBeInTheDocument();

      render(<DialogOverlay data-testid='overlay' />);
      expect(screen.getByTestId('overlay')).toBeInTheDocument();

      // DialogContent renders but doesn't open due to default isOpen=false
      render(<DialogContent>Content</DialogContent>);
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });
  });

  it('calls default closeDialog when DialogClose is clicked outside DialogContext', async () => {
    render(<DialogClose data-testid='close'>Close</DialogClose>);
    expect(screen.getByTestId('close')).toBeInTheDocument();

    // Clicking close should invoke default closeDialog (no-op) without errors
    await userEvent.click(screen.getByTestId('close'));
    // Verify no side effects (component still in DOM, no errors)
    expect(screen.getByTestId('close')).toBeInTheDocument();
  });
});
