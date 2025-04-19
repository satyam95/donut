import React, { useState } from 'react';
import { cn } from '../lib/utils';

interface SwitchProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const Switch: React.FC<SwitchProps> = ({
  className,
  checked: controlledChecked,
  onChange,
  disabled,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(controlledChecked ?? false);

  const handleClick = () => {
    if (disabled) return;
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <button
      type='button'
      role='switch'
      aria-checked={isChecked}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        'inline-flex h-[1.15rem] w-8 items-center rounded-full transition-all focus-visible:ring-[3px] focus-visible:ring-ring/50',
        isChecked
          ? 'bg-primary dark:bg-primary-foreground'
          : 'bg-input dark:bg-input/80',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      {...props}
    >
      <span
        className={cn(
          'block h-4 w-4 rounded-full bg-background shadow transition-transform',
          isChecked
            ? 'translate-x-[calc(100%-2px)] dark:bg-primary-foreground'
            : 'translate-x-0 dark:bg-foreground'
        )}
      />
    </button>
  );
};

export { Switch };
