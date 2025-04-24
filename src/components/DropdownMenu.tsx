import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
  ReactElement,
  Children,
  cloneElement,
} from 'react';
import ReactDOM from 'react-dom';
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';
import { cn } from '../lib/utils'; // Adjust path to your utility function

// Main dropdown context
interface DropdownContextValue {
  open: boolean;
  toggle: () => void;
  close: () => void;
  registerItem: (node: HTMLElement) => void;
  focusNext: () => void;
  focusPrev: () => void;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

// Submenu context
interface SubContextValue {
  open: boolean;
  toggle: () => void;
  close: () => void;
  keepOpen: () => void;
}

const SubContext = createContext<SubContextValue | null>(null);

interface DropdownMenuProps {
  children: ReactNode;
}

function DropdownMenu({ children }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const itemsRef = useRef<HTMLElement[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const focusNext = () => {
    const idx = itemsRef.current.findIndex(
      (el) => el === document.activeElement
    );
    const next = itemsRef.current[idx + 1] || itemsRef.current[0];
    next?.focus();
  };

  const focusPrev = () => {
    const idx = itemsRef.current.findIndex(
      (el) => el === document.activeElement
    );
    const prev =
      itemsRef.current[idx - 1] ||
      itemsRef.current[itemsRef.current.length - 1];
    prev?.focus();
  };

  const registerItem = (node: HTMLElement) => {
    if (node && !itemsRef.current.includes(node)) itemsRef.current.push(node);
  };

  return (
    <div
      ref={rootRef}
      data-slot='dropdown-menu'
      className='relative inline-block'
    >
      <DropdownContext.Provider
        value={{
          open,
          toggle: () => setOpen((o) => !o),
          close: () => setOpen(false),
          registerItem,
          focusNext,
          focusPrev,
        }}
      >
        {children}
      </DropdownContext.Provider>
    </div>
  );
}

interface TriggerProps {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
}

function DropdownMenuTrigger({
  children,
  className,
  asChild = false,
}: TriggerProps) {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error('DropdownMenuTrigger must be inside DropdownMenu');
  const props = {
    onClick: ctx.toggle,
    'aria-expanded': ctx.open,
    'data-slot': 'dropdown-menu-trigger',
    className: cn(
      'inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-accent hover:text-accent-foreground',
      className
    ),
  };
  if (asChild) {
    const child = Children.only(children) as ReactElement;
    return cloneElement(child, props);
  }
  return (
    <button type='button' {...props}>
      {children}
    </button>
  );
}

interface ContentProps {
  children: ReactNode;
  className?: string;
  sideOffset?: number;
  asChild?: boolean;
}

function DropdownMenuContent({
  children,
  className,
  sideOffset = 4,
  asChild = false,
}: ContentProps) {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error('DropdownMenuContent must be inside DropdownMenu');
  if (!ctx.open) return null;
  const content = (
    <div
      data-slot='dropdown-menu-content'
      data-side='bottom'
      className={cn(
        'absolute top-full left-0',
        'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        'z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem]',
        'origin-[var(--radix-dropdown-menu-content-transform-origin)] overflow-x-hidden overflow-y-auto',
        'rounded-md border p-1 shadow-md',
        className
      )}
      style={{ marginTop: sideOffset }}
    >
      {children}
    </div>
  );
  return asChild
    ? cloneElement(Children.only(children) as ReactElement, content.props)
    : content;
}

interface PortalProps {
  children: ReactNode;
}

function DropdownMenuPortal({ children }: PortalProps) {
  return ReactDOM.createPortal(
    <div data-slot='dropdown-menu-portal'>{children}</div>,
    document.body
  );
}

interface GroupProps {
  children: ReactNode;
  className?: string;
}

function DropdownMenuGroup({ children, className }: GroupProps) {
  return (
    <div
      data-slot='dropdown-menu-group'
      role='group'
      className={cn('py-1', className)}
    >
      {children}
    </div>
  );
}

interface ItemProps {
  children: ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'destructive';
  className?: string;
  inset?: boolean;
}

function DropdownMenuItem({
  children,
  onSelect,
  disabled,
  variant = 'default',
  className,
  inset = false,
}: ItemProps) {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error('DropdownMenuItem must be inside DropdownMenu');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) ctx.registerItem(ref.current);
  }, [ctx]);

  const handleKey = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!disabled) onSelect?.();
        ctx.close();
        break;
      case 'ArrowDown':
        ctx.focusNext();
        break;
      case 'ArrowUp':
        ctx.focusPrev();
        break;
      case 'Escape':
        ctx.close();
        break;
    }
  };

  return (
    <div
      role='menuitem'
      tabIndex={disabled ? -1 : 0}
      ref={ref}
      onClick={() => {
        if (!disabled) {
          onSelect?.();
          ctx.close();
        }
      }}
      onKeyDown={handleKey}
      data-slot='dropdown-menu-item'
      data-inset={inset}
      data-variant={variant}
      data-disabled={disabled}
      className={cn(
        'relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none',
        'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground transition-colors',
        variant === 'destructive' &&
          'text-destructive hover:bg-destructive/10 focus:bg-destructive/10 dark:data-[variant=destructive]:hover:bg-destructive/20 dark:data-[variant=destructive]:focus:bg-destructive/20',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        "[&_svg:not([class*='text-'])]:text-muted-foreground",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CheckboxItemProps {
  children: ReactNode;
  checked: boolean;
  onChange: (value: boolean) => void;
}

function DropdownMenuCheckboxItem({
  children,
  checked,
  onChange,
}: CheckboxItemProps) {
  return (
    <DropdownMenuItem inset onSelect={() => onChange(!checked)}>
      <span className='pointer-events-none absolute left-2 flex size-3.5 items-center'>
        {checked && <CheckIcon className='size-4' />}
      </span>
      {children}
    </DropdownMenuItem>
  );
}

interface RadioGroupProps {
  children: ReactNode;
}

function DropdownMenuRadioGroup({ children }: RadioGroupProps) {
  return (
    <div data-slot='dropdown-menu-radio-group' role='group'>
      {children}
    </div>
  );
}

interface RadioItemProps {
  children: ReactNode;
  checked: boolean;
  onSelect: () => void;
}

function DropdownMenuRadioItem({
  children,
  checked,
  onSelect,
}: RadioItemProps) {
  return (
    <DropdownMenuItem inset onSelect={onSelect}>
      <span className='pointer-events-none absolute left-2 flex size-3.5 items-center'>
        {checked ? (
          <CircleIcon className='size-2 fill-current' />
        ) : (
          <span className='size-2' />
        )}
      </span>
      {children}
    </DropdownMenuItem>
  );
}

function DropdownMenuSeparator() {
  return (
    <div
      data-slot='dropdown-menu-separator'
      className={cn('bg-border -mx-1 my-1 h-px')}
    />
  );
}

interface LabelProps {
  children: ReactNode;
  inset?: boolean;
}

function DropdownMenuLabel({ children, inset }: LabelProps) {
  return (
    <div
      data-slot='dropdown-menu-label'
      data-inset={inset}
      className={cn('px-2 py-1.5 text-sm font-medium', inset && 'pl-8')}
    >
      {children}
    </div>
  );
}

interface ShortcutProps {
  children: ReactNode;
  className?: string;
}

function DropdownMenuShortcut({ children, className }: ShortcutProps) {
  return (
    <span
      data-slot='dropdown-menu-shortcut'
      className={cn(
        'text-muted-foreground ml-auto text-xs tracking-widest',
        className
      )}
    >
      {children}
    </span>
  );
}

interface SubProps {
  children: ReactNode;
}

function DropdownMenuSub({ children }: SubProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const clearTimeoutId = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
  };

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        clearTimeoutId();
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('mousedown', onClick);
      clearTimeoutId();
    };
  }, []);

  return (
    <div ref={rootRef} data-slot='dropdown-menu-sub' className='relative'>
      <SubContext.Provider
        value={{
          open,
          toggle: () => {
            setOpen((o) => !o);
            clearTimeoutId();
          },
          close: () => {
            timeoutId.current = setTimeout(() => {
              setOpen(false);
              clearTimeoutId();
            }, 100); // 100ms delay for hover transition
          },
          keepOpen: () => {
            clearTimeoutId();
            setOpen(true);
          },
        }}
      >
        {children}
      </SubContext.Provider>
    </div>
  );
}

interface SubTriggerProps {
  children: ReactNode;
  inset?: boolean;
  className?: string;
  asChild?: boolean;
}

function DropdownMenuSubTrigger({
  children,
  inset,
  className,
  asChild = false,
}: SubTriggerProps) {
  const ctx = useContext(SubContext);
  if (!ctx) throw new Error('SubTrigger must be inside DropdownMenuSub');
  const props = {
    onMouseEnter: () => {
      ctx.toggle();
    },
    onMouseLeave: () => {
      ctx.close();
    },
    onClick: ctx.toggle,
    'data-slot': 'dropdown-menu-sub-trigger',
    'data-inset': inset,
    className: cn(
      'flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none',
      'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground transition-colors',
      inset && 'pl-8',
      className
    ),
  };
  if (asChild) {
    const child = Children.only(children) as ReactElement;
    return cloneElement(child, props);
  }
  return (
    <div {...props}>
      {children}
      <ChevronRightIcon className='ml-auto size-4' />
    </div>
  );
}

interface SubContentProps {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
}

function DropdownMenuSubContent({
  children,
  className,
  asChild = false,
}: SubContentProps) {
  const subCtx = useContext(SubContext);
  const dropdownCtx = useContext(DropdownContext);
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    if (dropdownCtx?.open && subCtx?.open) {
      const contentEl = document.querySelector(
        '[data-slot="dropdown-menu-content"]'
      );
      const triggerEl = document.querySelector(
        '[data-slot="dropdown-menu-sub-trigger"]'
      );
      if (contentEl && triggerEl) {
        const contentRect = contentEl.getBoundingClientRect();
        const triggerRect = triggerEl.getBoundingClientRect();
        setPosition({
          top: triggerRect.top,
          left: contentRect.right + 4,
        });
      }
    }
  }, [dropdownCtx?.open, subCtx?.open]);

  if (!subCtx || !dropdownCtx)
    throw new Error('SubContent must be inside DropdownMenuSub');
  if (!subCtx.open) return null;

  const content = (
    <div
      data-slot='dropdown-menu-sub-content'
      data-side='right'
      className={cn(
        'fixed',
        'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        'z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem]',
        'origin-[var(--radix-dropdown-menu-content-transform-origin)] overflow-x-hidden overflow-y-auto',
        'rounded-md border p-1 shadow-md',
        className
      )}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      onMouseEnter={() => subCtx.keepOpen()}
      onMouseLeave={() => subCtx.close()}
    >
      {children}
    </div>
  );
  return asChild
    ? cloneElement(Children.only(children) as ReactElement, content.props)
    : content;
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
