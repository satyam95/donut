import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-9 px-2 min-w-9',
        sm: 'h-8 px-1.5 min-w-8',
        lg: 'h-10 px-2.5 min-w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof toggleVariants> {
  /** Controlled pressed state */
  pressed?: boolean;
  /** Uncontrolled default pressed state */
  defaultPressed?: boolean;
  /** Handler called when pressed state changes */
  onPressedChange?: (pressed: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({
  pressed,
  defaultPressed,
  onPressedChange,
  variant,
  size,
  className,
  onClick,
  ...props
}) => {
  const [internalPressed, setInternalPressed] = React.useState(
    defaultPressed ?? false
  );
  const isControlled = pressed !== undefined;
  const currentPressed = isControlled ? pressed! : internalPressed;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newPressed = !currentPressed;
    if (!isControlled) {
      setInternalPressed(newPressed);
    }
    onPressedChange?.(newPressed);
    onClick?.(event);
  };

  return (
    <button
      type='button'
      data-state={currentPressed ? 'on' : 'off'}
      aria-pressed={currentPressed}
      className={cn(toggleVariants({ variant, size, className }))}
      onClick={handleClick}
      {...props}
    />
  );
};

export { Toggle };
