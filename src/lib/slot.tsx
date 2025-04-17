// components/Slot.tsx
import React from 'react';
import { cn } from '../lib/utils';

export type SlotProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
  className?: string;
};

/**
 * A generic Slot component that merges props and classNames into its child element.
 */
export function Slot({ children, className, ...props }: SlotProps) {
  if (React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, {
      ...props,
      className: cn(className, child.props.className),
    });
  }

  return <>{children}</>;
}
