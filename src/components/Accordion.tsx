import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '../lib/utils';

type AccordionProps = {
  children: React.ReactNode;
  defaultOpenKeys?: string[];
  type?: 'single' | 'multiple';
  className?: string;
};

type AccordionItemProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  isOpen?: boolean;
  onToggle?: () => void;
};

type AccordionTriggerProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  isOpen?: boolean;
  onToggle?: () => void;
};

type AccordionContentProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  isOpen?: boolean;
};

export function Accordion({
  children,
  defaultOpenKeys = [],
  type = 'single',
  className,
}: AccordionProps) {
  const [openKeys, setOpenKeys] = React.useState<string[]>(defaultOpenKeys);

  const handleToggle = (key: string) => {
    setOpenKeys((prevKeys) => {
      if (type === 'single') {
        return prevKeys.includes(key) ? [] : [key];
      }
      return prevKeys.includes(key)
        ? prevKeys.filter((k) => k !== key)
        : [...prevKeys, key];
    });
  };

  const childrenArray = React.Children.toArray(children).filter(
    React.isValidElement
  );
  const itemIds = childrenArray.map((_, index) => `accordion-item-${index}`);

  return (
    <div className={cn('accordion', className)}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<AccordionItemProps>(child)) {
          const itemId = child.props.id || itemIds[index];
          return React.cloneElement(child, {
            id: itemId,
            isOpen: openKeys.includes(itemId),
            onToggle: () => handleToggle(itemId),
          });
        }
        // CHANGED: cover fallback for non-element children
        return child;
      })}
    </div>
  );
}

export function AccordionItem({
  children,
  className,
  id,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  return (
    <div
      id={id}
      className={cn('accordion-item border-b last:border-b-0', className)}
    >
      {React.Children.map(children, (child) => {
        if (
          React.isValidElement<AccordionTriggerProps | AccordionContentProps>(
            child
          )
        ) {
          return React.cloneElement(child, { id, isOpen, onToggle });
        }
        // CHANGED: cover fallback for non-element children in item
        return child;
      })}
    </div>
  );
}

export function AccordionTrigger({
  children,
  className,
  id,
  isOpen,
  onToggle,
}: AccordionTriggerProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle?.();
    }
  };

  return (
    <button
      id={`${id}-trigger`}
      className={cn(
        'flex justify-between items-center w-full py-4 text-sm font-medium text-left transition-all hover:underline focus:outline-none focus-visible:ring focus-visible:ring-offset-2',
        className
      )}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      aria-expanded={isOpen}
      aria-controls={`${id}-content`}
    >
      {children}
      <ChevronDownIcon
        className={cn(
          'transition-transform duration-200',
          isOpen ? 'rotate-180' : 'rotate-0'
        )}
      />
    </button>
  );
}

export function AccordionContent({
  children,
  className,
  id,
  isOpen,
}: AccordionContentProps) {
  return (
    <div
      id={`${id}-content`}
      className={cn(
        'overflow-hidden transition-all duration-300 ease-in-out',
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      )}
      aria-hidden={!isOpen}
      data-testid={`accordion-content-${id}`}
      style={{ display: isOpen ? 'block' : 'none' }}
    >
      <div className={cn('pb-4 text-sm', className)}>{children}</div>
    </div>
  );
}
