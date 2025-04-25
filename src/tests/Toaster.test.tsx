import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Toaster, toast } from '../components'; // Adjust path to your component
import * as utils from '../lib/utils';
import type { AddToastFunction } from '../components/Toaster';

// Mock class-variance-authority
vi.mock('class-variance-authority', () => ({
  cva: () => (props: { variant?: string }) =>
    [
      'relative rounded-lg border w-full px-4 py-3 text-sm grid grid-cols-[1fr_auto] gap-x-4 gap-y-0.5 items-start shadow-lg min-w-[300px] max-w-[500px] text-black',
      props.variant === 'default' ? 'bg-white' : '',
      props.variant === 'destructive' ? 'bg-white border-destructive' : '',
    ]
      .filter(Boolean)
      .join(' '),
}));

// Mock cn utility
vi.mock('../lib/utils', () => ({
  cn: (...args: string[]) => args.filter(Boolean).join(' '),
}));

declare global {
  interface Window {
    __addToast: AddToastFunction | null;
  }
}

describe('Toaster', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
    window.__addToast = null;
  });

  it('renders without toasts initially', () => {
    render(<Toaster position='bottom-right' visibleToasts={3} />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('renders with correct position classes', () => {
    const positions: Array<
      'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    > = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

    positions.forEach((position) => {
      const { container } = render(
        <Toaster position={position} visibleToasts={3} />
      );
      const toasterDiv = container.firstChild as HTMLElement;
      expect(toasterDiv).toHaveClass(
        `fixed flex flex-col gap-3 z-50 ${positionClasses[position]}`
      );
    });
  });

  it('displays a default toast with title only', async () => {
    render(<Toaster position='bottom-right' visibleToasts={3} />);
    await act(async () => {
      toast('Test Toast');
    });

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(screen.getByText('Test Toast')).toBeInTheDocument();
    expect(screen.queryByText('description')).not.toBeInTheDocument();
    expect(screen.queryByText('action')).not.toBeInTheDocument();
    expect(alert).toHaveClass('bg-white');
  });

  it('displays a default toast with title and description', async () => {
    render(<Toaster position='bottom-right' visibleToasts={3} />);
    await act(async () => {
      toast('Test Toast', { description: 'This is a description' });
    });

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(screen.getByText('Test Toast')).toBeInTheDocument();
    expect(screen.getByText('This is a description')).toBeInTheDocument();
    expect(alert).toHaveClass('bg-white');
  });

  it('displays a destructive toast', async () => {
    render(<Toaster position='bottom-right' visibleToasts={3} />);
    await act(async () => {
      toast.destructive('Error Toast', { description: 'Something went wrong' });
    });

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(screen.getByText('Error Toast')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(alert).toHaveClass('bg-white border-destructive');
  });

  it('applies toastVariants via cn util', async () => {
    const cnSpy = vi.spyOn(utils, 'cn');
    render(<Toaster position='bottom-right' visibleToasts={3} />);
    await act(async () => {
      toast('Spy Toast');
    });

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    const base =
      'relative rounded-lg border w-full px-4 py-3 text-sm grid grid-cols-[1fr_auto] gap-x-4 gap-y-0.5 items-start shadow-lg min-w-[300px] max-w-[500px] text-black';
    expect(cnSpy).toHaveBeenCalledWith(`${base} bg-white`);
  });

  it('displays a toast with an action button', async () => {
    const actionSpy = vi.fn();
    render(<Toaster position='bottom-right' visibleToasts={3} />);
    await act(async () => {
      toast('Action Toast', {
        action: {
          label: 'Undo',
          onClick: actionSpy,
        },
      });
    });

    const actionButton = screen.getByText('Undo');
    expect(actionButton).toBeInTheDocument();
    expect(actionButton).toHaveClass(
      'self-center text-sm font-medium underline hover:opacity-80'
    );

    fireEvent.click(actionButton);
    expect(actionSpy).toHaveBeenCalledTimes(1);
  });

  it('limits the number of visible toasts', async () => {
    render(<Toaster position='bottom-right' visibleToasts={2} />);
    await act(async () => {
      toast('Toast 1');
      toast('Toast 2');
      toast('Toast 3');
    });

    const alerts = screen.getAllByRole('alert');
    expect(alerts).toHaveLength(2);
    expect(screen.getByText('Toast 2')).toBeInTheDocument();
    expect(screen.getByText('Toast 3')).toBeInTheDocument();
    expect(screen.queryByText('Toast 1')).not.toBeInTheDocument();
  });

  it('warns when toast is called without Toaster mounted', () => {
    const consoleWarnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {});
    toast('Unmounted Toast');
    expect(consoleWarnSpy).toHaveBeenCalledWith('Toaster is not mounted.');
    consoleWarnSpy.mockRestore();
  });

  it('calls toast.default correctly', async () => {
    render(<Toaster position='bottom-right' visibleToasts={3} />);
    await act(async () => {
      toast.default('Default Toast', { description: 'Default description' });
    });

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(screen.getByText('Default Toast')).toBeInTheDocument();
    expect(screen.getByText('Default description')).toBeInTheDocument();
    expect(alert).toHaveClass('bg-white');
  });

  it('handles multiple toasts with different types and actions', async () => {
    const actionSpy = vi.fn();
    render(<Toaster position='bottom-right' visibleToasts={3} />);
    await act(async () => {
      toast('Default Toast', { description: 'Default description' });
      toast.destructive('Error Toast', { description: 'Error description' });
      toast('Action Toast', {
        action: { label: 'Retry', onClick: actionSpy },
      });
    });

    const alerts = screen.getAllByRole('alert');
    expect(alerts).toHaveLength(3);
    expect(screen.getByText('Default Toast')).toBeInTheDocument();
    expect(screen.getByText('Error Toast')).toBeInTheDocument();
    expect(screen.getByText('Action Toast')).toBeInTheDocument();

    const retryButton = screen.getByText('Retry');
    fireEvent.click(retryButton);
    expect(actionSpy).toHaveBeenCalledTimes(1);
  });

  it('cleans up window.__addToast on unmount', () => {
    const { unmount } = render(
      <Toaster position='bottom-right' visibleToasts={3} />
    );
    act(() => {
      toast('Test Toast');
    });
    expect(screen.getByText('Test Toast')).toBeInTheDocument();
    expect(window.__addToast).toBeTruthy();

    unmount();
    expect(window.__addToast).toBeNull();

    const consoleWarnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {});
    toast('Unmounted Toast');
    expect(consoleWarnSpy).toHaveBeenCalledWith('Toaster is not mounted.');
    consoleWarnSpy.mockRestore();
  });

  it('automatically removes toast after duration', async () => {
    vi.useFakeTimers();
    render(<Toaster position='bottom-right' visibleToasts={3} />);
    await act(async () => {
      toast('Test Toast', { duration: 1000 });
    });

    expect(screen.getByRole('alert')).toBeInTheDocument();
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('warns when toast.default and toast.destructive are called without Toaster mounted', () => {
    const consoleWarnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {});
    toast.default('Default Toast');
    expect(consoleWarnSpy).toHaveBeenCalledWith('Toaster is not mounted.');
    toast.destructive('Destructive Toast');
    expect(consoleWarnSpy).toHaveBeenCalledWith('Toaster is not mounted.');
    expect(consoleWarnSpy).toHaveBeenCalledTimes(2);
    consoleWarnSpy.mockRestore();
  });

  it('falls back to default variant when toast.type is undefined', async () => {
    render(<Toaster position='bottom-right' visibleToasts={3} />);
    await act(async () => {
      toast('NoTypeToast', { description: 'No type provided' });
    });

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('bg-white');
  });

  it('cleans up timer when toast is added and component unmounts', async () => {
    vi.useFakeTimers();
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    const { unmount } = render(
      <Toaster position='bottom-right' visibleToasts={3} />
    );
    await act(async () => {
      toast('Test Toast', { duration: 5000 });
    });

    expect(screen.getByRole('alert')).toBeInTheDocument();
    unmount();
    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });

  it('uses crypto.randomUUID for toast IDs', async () => {
    const uuidSpy = vi
      .spyOn(crypto, 'randomUUID')
      .mockReturnValue('123e4567-e89b-12d3-a456-426614174000');
    render(<Toaster position='bottom-right' visibleToasts={3} />);
    await act(async () => {
      toast('Test Toast');
    });

    const alert = screen.getByRole('alert');
    expect(uuidSpy).toHaveBeenCalled();
    expect(alert).toHaveAttribute(
      'data-testid',
      'toast-123e4567-e89b-12d3-a456-426614174000'
    );
    uuidSpy.mockRestore();
  });

  it('handles empty toasts array gracefully', () => {
    render(<Toaster position='bottom-right' visibleToasts={3} />);
    const { container } = render(
      <Toaster position='bottom-right' visibleToasts={3} />
    );
    const toasterDiv = container.firstChild as HTMLElement;
    expect(toasterDiv).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('renders with custom visibleToasts value of 0', async () => {
    render(<Toaster position='bottom-right' visibleToasts={0} />);
    await act(async () => {
      toast('Test Toast');
    });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('handles undefined position prop with default', () => {
    const { container } = render(<Toaster visibleToasts={3} />);
    const toasterDiv = container.firstChild as HTMLElement;
    expect(toasterDiv).toHaveClass(
      'fixed flex flex-col gap-3 z-50 bottom-4 right-4'
    );
  });

  it('handles undefined visibleToasts prop with default', async () => {
    render(<Toaster position='bottom-right' />);
    await act(async () => {
      toast('Toast 1');
      toast('Toast 2');
      toast('Toast 3');
      toast('Toast 4');
    });

    const alerts = screen.getAllByRole('alert');
    expect(alerts).toHaveLength(3); // Default visibleToasts is 3
  });
});

// Helper to map position classes
const positionClasses: Record<string, string> = {
  'top-left': 'top-4 left-4',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-right': 'bottom-4 right-4',
};
