import React, {
  useState,
  useRef,
  useContext,
  createContext,
  useEffect,
  ReactNode,
  RefObject,
  useCallback,
  memo,
} from 'react';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { cn } from '../lib/utils';

// Context interface
interface SelectContextProps {
  isOpen: boolean;
  selectedValue: string | null;
  placeholder: string;
  toggle: () => void;
  selectValue: (value: string) => void;
  contentRef: RefObject<HTMLDivElement>;
}

// Create context
const SelectContext = createContext<SelectContextProps | null>(null);

// Hook to consume context
const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context)
    throw new Error('Select components must be used within a <Select />');
  return context;
};

// Props for Select root
interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
}

const Select = memo(
  ({
    children,
    className,
    placeholder = 'Select an option',
    onValueChange,
    defaultValue,
    disabled,
    ...props
  }: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | null>(
      defaultValue ?? null
    );
    const contentRef = useRef<HTMLDivElement>(null!);

    const toggle = useCallback(() => {
      if (!disabled) setIsOpen((open) => !open); // Prevent toggling if disabled
    }, [disabled]);
    const selectValue = useCallback(
      (value: string) => {
        setSelectedValue(value);
        onValueChange?.(value);
        setIsOpen(false);
      },
      [onValueChange]
    );

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          contentRef.current &&
          !contentRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <SelectContext.Provider
        value={{
          isOpen,
          selectedValue,
          placeholder,
          toggle,
          selectValue,
          contentRef,
        }}
      >
        <div
          className={cn('relative inline-block text-left', className)}
          {...props}
        >
          {children}
        </div>
      </SelectContext.Provider>
    );
  }
);

// Trigger button
interface SelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size?: 'sm' | 'default';
  disabled?: boolean;
}

const SelectTrigger = memo(
  ({ className, size = 'default', disabled, ...props }: SelectTriggerProps) => {
    const { isOpen, toggle, selectedValue, placeholder } = useSelectContext();
    const displayValue = selectedValue
      ? selectedValue.replace(/(^|\s)\w/g, (c) => c.toUpperCase())
      : placeholder;

    return (
      <button
        type='button'
        className={cn(
          'border-input bg-transparent border rounded-md px-3 py-2 flex items-center justify-between gap-2 shadow-xs transition outline-none focus:ring-2 focus:ring-ring focus:border-ring',
          size === 'sm' ? 'h-8 text-sm' : 'h-9 text-sm',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        onClick={toggle}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        disabled={disabled}
        {...props}
      >
        <span
          className={cn('truncate', !selectedValue && 'text-muted-foreground')}
        >
          {displayValue}
        </span>
        {isOpen ? (
          <ChevronUpIcon className='size-4' />
        ) : (
          <ChevronDownIcon className='size-4 opacity-50' />
        )}
      </button>
    );
  }
);

// Value display
interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  placeholder?: string;
}

const SelectValue = ({
  className,
  placeholder,
  ...props
}: SelectValueProps) => {
  const { selectedValue, placeholder: contextPlaceholder } = useSelectContext();
  const displayValue = selectedValue
    ? selectedValue.replace(/(^|\s)\w/g, (c) => c.toUpperCase())
    : placeholder || contextPlaceholder;

  return (
    <span
      className={cn(
        'truncate',
        !selectedValue && 'text-muted-foreground',
        className
      )}
      {...props}
    >
      {displayValue}
    </span>
  );
};

// Dropdown content
interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const SelectContent = memo(
  ({ className, children, ...props }: SelectContentProps) => {
    const { isOpen, contentRef } = useSelectContext();
    const [scrollState, setScrollState] = useState({
      showScrollUp: false,
      showScrollDown: false,
    });

    useEffect(() => {
      const element = contentRef.current;
      if (!element || !isOpen) return;

      const updateScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = element;
        const hasOverflow = scrollHeight > clientHeight;
        setScrollState({
          showScrollUp: hasOverflow && scrollTop > 0,
          showScrollDown:
            hasOverflow && scrollTop + clientHeight < scrollHeight,
        });
      };

      updateScroll();
      const observer = new ResizeObserver(updateScroll);
      observer.observe(element);
      element.addEventListener('scroll', updateScroll);

      return () => {
        observer.disconnect();
        element.removeEventListener('scroll', updateScroll);
      };
    }, [isOpen, contentRef]);

    if (!isOpen) return null;

    return (
      <div className='relative'>
        <div
          ref={contentRef}
          className={cn(
            'z-40 mt-1 w-full bg-white rounded-md border shadow-md overflow-auto max-h-[300px]',
            className
          )}
          role='listbox'
          tabIndex={-1}
          {...props}
        >
          {scrollState.showScrollUp && (
            <div
              data-testid='scroll-up-button-1'
              onClick={() =>
                contentRef.current?.scrollBy({ top: -50, behavior: 'smooth' })
              }
              className='sticky top-0 bg-white cursor-pointer flex justify-center py-0.5'
            >
              <ChevronUpIcon className='size-3' />
            </div>
          )}
          <div className='py-1'>{children}</div>
          {scrollState.showScrollDown && (
            <div
              data-testid='scroll-down-button-1'
              onClick={() =>
                contentRef.current?.scrollBy({ top: 50, behavior: 'smooth' })
              }
              className='sticky bottom-0 bg-white cursor-pointer flex justify-center py-0.5'
            >
              <ChevronDownIcon className='size-3' />
            </div>
          )}
        </div>
      </div>
    );
  }
);

// Grouping
interface SelectGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

const SelectGroup = ({ className, children, ...props }: SelectGroupProps) => (
  <div className={cn('py-1', className)} role='group' {...props}>
    {children}
  </div>
);

// Label
interface SelectLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

const SelectLabel = ({ className, children, ...props }: SelectLabelProps) => (
  <div
    className={cn('px-2 py-1.5 text-xs text-muted-foreground', className)}
    {...props}
  >
    {children}
  </div>
);

// Separator
interface SelectSeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  className?: string;
}

const SelectSeparator = ({ className, ...props }: SelectSeparatorProps) => (
  <hr className={cn('border-border my-1', className)} {...props} />
);

// Item
interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
}

const SelectItem = memo(
  ({ value, children, className, disabled, ...props }: SelectItemProps) => {
    const { selectValue, selectedValue } = useSelectContext();
    const isSelected = selectedValue === value;

    return (
      <div
        className={cn(
          'flex items-center justify-between px-2 py-1.5 cursor-pointer hover:bg-accent hover:text-accent-foreground text-xs',
          isSelected && 'bg-accent text-accent-foreground',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        role='option'
        aria-selected={isSelected}
        aria-disabled={disabled}
        onClick={() => !disabled && selectValue(value)}
        {...props}
      >
        <span className='truncate'>{children}</span>
        {isSelected && <CheckIcon className='size-4' />}
      </div>
    );
  }
);

// Scroll buttons
interface SelectScrollButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const SelectScrollUpButton = memo(
  ({ className, ...props }: SelectScrollButtonProps) => {
    const { contentRef } = useSelectContext();
    return (
      <div
        data-testid='scroll-up-button'
        className={cn(
          'flex justify-center py-1.5 cursor-pointer hover:bg-accent/10',
          className
        )}
        onClick={() =>
          contentRef.current?.scrollBy({ top: -50, behavior: 'smooth' })
        }
        {...props}
      >
        <ChevronUpIcon className='size-4' />
      </div>
    );
  }
);

const SelectScrollDownButton = memo(
  ({ className, ...props }: SelectScrollButtonProps) => {
    const { contentRef } = useSelectContext();
    return (
      <div
        data-testid='scroll-down-button'
        className={cn(
          'flex justify-center py-1.5 cursor-pointer hover:bg-accent/10',
          className
        )}
        onClick={() =>
          contentRef.current?.scrollBy({ top: 50, behavior: 'smooth' })
        }
        {...props}
      >
        <ChevronDownIcon className='size-4' />
      </div>
    );
  }
);

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
