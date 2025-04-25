import * as React from 'react';
import { useState, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

export type ToastType = 'default' | 'destructive';
export type ToastPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface Toast {
  id: string;
  title: string;
  type?: ToastType;
  duration?: number;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToasterProps {
  position?: ToastPosition;
  visibleToasts?: number;
}

declare global {
  interface Window {
    __addToast: AddToastFunction | null;
  }
}

const toastVariants = cva(
  'relative rounded-lg border w-full px-4 py-3 text-sm grid grid-cols-[1fr_auto] gap-x-4 gap-y-0.5 items-start shadow-lg min-w-[300px] max-w-[500px] text-black',
  {
    variants: {
      variant: {
        default: 'bg-white',
        destructive: 'bg-white border-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const POSITION_CLASSES: Record<ToastPosition, string> = {
  'top-left': 'top-4 left-4',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-right': 'bottom-4 right-4',
};

type ToastOptions = Partial<Omit<Toast, 'id' | 'title'>>;
export type AddToastFunction = (title: string, options?: ToastOptions) => void;

const Toaster: React.FC<ToasterProps> = ({
  position = 'bottom-right',
  visibleToasts = 3,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = React.useRef<Map<string, NodeJS.Timeout>>(new Map());

  const addToast = React.useCallback(
    (title: string, options: ToastOptions = {}) => {
      const id = crypto.randomUUID();
      const toast: Toast = { id, title, ...options };

      setToasts((prev) => [...prev, toast]);

      const timer = setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
        timersRef.current.delete(id);
      }, options.duration || 3000);

      timersRef.current.set(id, timer);
    },
    []
  );

  useEffect(() => {
    const currentTimers = timersRef.current;
    window.__addToast = addToast;
    return () => {
      currentTimers.forEach((timer) => clearTimeout(timer));
      currentTimers.clear();
      window.__addToast = null;
    };
  }, [addToast]);

  const visibleToastsCount = Math.max(0, visibleToasts);
  const displayedToasts =
    visibleToastsCount === 0 ? [] : toasts.slice(-visibleToastsCount);

  return (
    <div
      className={cn(
        'fixed flex flex-col gap-3 z-50',
        POSITION_CLASSES[position]
      )}
    >
      {displayedToasts.map((toast) => (
        <div
          key={toast.id}
          data-testid={`toast-${toast.id}`}
          className={cn(toastVariants({ variant: toast.type }))}
          role='alert'
        >
          <div className='flex flex-col gap-0.5'>
            <div className='font-medium tracking-tight'>{toast.title}</div>
            {toast.description && (
              <div className='text-muted-foreground text-sm [&_p]:leading-relaxed'>
                {toast.description}
              </div>
            )}
          </div>
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className='self-center text-sm font-medium underline hover:opacity-80'
            >
              {toast.action.label}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

const toast = Object.assign(
  (title: string, options: ToastOptions = {}) => {
    if (window.__addToast) {
      window.__addToast(title, { ...options, type: options.type ?? 'default' });
    } else {
      console.warn('Toaster is not mounted.');
    }
  },
  {
    default: (title: string, options: ToastOptions = {}) => {
      if (window.__addToast) {
        window.__addToast(title, { ...options, type: 'default' });
      } else {
        console.warn('Toaster is not mounted.');
      }
    },
    destructive: (title: string, options: ToastOptions = {}) => {
      if (window.__addToast) {
        window.__addToast(title, { ...options, type: 'destructive' });
      } else {
        console.warn('Toaster is not mounted.');
      }
    },
  }
);

export { Toaster, toast };
