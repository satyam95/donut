import * as React from 'react';
import { cn } from '../lib/utils';

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-testid='separator'
      role={decorative ? undefined : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        'bg-border shrink-0',
        orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
        className
      )}
      {...props}
    />
  );
}

export { Separator };
