// src/components/Dialog.tsx
import * as React from 'react';
import ReactDOM from 'react-dom';
import { XIcon } from 'lucide-react';
import { cn } from '../lib/utils';

// Define the type for the DialogContext
type DialogContextType = {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
};

// Create a context to manage dialog state and actions
const DialogContext = React.createContext<DialogContextType>({
  isOpen: false,
  openDialog: () => {},
  closeDialog: () => {},
});

// Dialog (Root) Component
interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function Dialog({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: DialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const openDialog = () => {
    if (isControlled) {
      onOpenChange?.(true);
    } else {
      setInternalOpen(true);
      onOpenChange?.(true);
    }
  };

  const closeDialog = () => {
    if (isControlled) {
      onOpenChange?.(false);
    } else {
      setInternalOpen(false);
      onOpenChange?.(false);
    }
  };

  const contextValue: DialogContextType = {
    isOpen,
    openDialog,
    closeDialog,
  };

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
    </DialogContext.Provider>
  );
}

// DialogTrigger Component
interface DialogTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children?: React.ReactNode;
}

function DialogTrigger({ asChild, children, ...props }: DialogTriggerProps) {
  const { openDialog } = React.useContext(DialogContext);

  if (asChild && children && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{ onClick?: React.MouseEventHandler }>,
      {
        onClick: (e: React.MouseEvent) => {
          const childOnClick = (
            children as React.ReactElement<{
              onClick?: React.MouseEventHandler;
            }>
          ).props.onClick;
          if (childOnClick) childOnClick(e);
          openDialog();
        },
      }
    );
  }

  return (
    <button data-slot='dialog-trigger' onClick={openDialog} {...props}>
      {children}
    </button>
  );
}

// DialogPortal Component
interface DialogPortalProps {
  children: React.ReactNode;
}

function DialogPortal({ children }: DialogPortalProps) {
  const { isOpen } = React.useContext(DialogContext);
  if (!isOpen) return null;
  return ReactDOM.createPortal(children, document.body);
}

// DialogClose Component
interface DialogCloseProps extends React.HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children?: React.ReactNode;
}

function DialogClose({ asChild, children, ...props }: DialogCloseProps) {
  const { closeDialog } = React.useContext(DialogContext);

  if (asChild && children && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{ onClick?: React.MouseEventHandler }>,
      {
        onClick: (e: React.MouseEvent) => {
          const childOnClick = (
            children as React.ReactElement<{
              onClick?: React.MouseEventHandler;
            }>
          ).props.onClick;
          if (childOnClick) childOnClick(e);
          closeDialog();
        },
      }
    );
  }

  return (
    <button data-slot='dialog-close' onClick={closeDialog} {...props}>
      {children}
    </button>
  );
}

// DialogOverlay Component
type DialogOverlayProps = React.HTMLAttributes<HTMLDivElement>;

function DialogOverlay({ className, ...props }: DialogOverlayProps) {
  const { closeDialog } = React.useContext(DialogContext);
  return (
    <div
      data-slot='dialog-overlay'
      className={cn('fixed inset-0 z-50 bg-black/50', className)}
      onClick={closeDialog}
      {...props}
    />
  );
}

// DialogContent Component
interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function DialogContent({ className, children, ...props }: DialogContentProps) {
  const { closeDialog, isOpen } = React.useContext(DialogContext);
  return (
    <DialogPortal>
      <DialogOverlay />
      <div
        role='dialog'
        aria-modal='true'
        data-slot='dialog-content'
        data-state={isOpen ? 'open' : 'closed'}
        className={cn(
          'fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 sm:max-w-lg',
          className
        )}
        {...props}
      >
        {children}
        <button
          data-slot='dialog-close'
          className="ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          onClick={closeDialog}
        >
          <XIcon />
          <span className='sr-only'>Close</span>
        </button>
      </div>
    </DialogPortal>
  );
}

// DialogHeader Component
type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div
      data-slot='dialog-header'
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  );
}

// DialogFooter Component
type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      data-slot='dialog-footer'
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className
      )}
      {...props}
    />
  );
}

// DialogTitle Component
type DialogTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <h2
      data-slot='dialog-title'
      className={cn('text-lg leading-none font-semibold', className)}
      {...props}
    />
  );
}

// DialogDescription Component
type DialogDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <p
      data-slot='dialog-description'
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

// Export all components
export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
