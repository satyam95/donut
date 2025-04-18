import * as React from 'react';
import { CheckIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface CheckboxProps {
  id?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
  tabIndex?: number;
}

function Checkbox({
  id,
  checked,
  defaultChecked,
  onChange,
  disabled,
  className,
  ...props
}: CheckboxProps) {
  // Determine if the component is controlled or uncontrolled
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = React.useState(
    defaultChecked ?? false
  );
  const currentChecked = isControlled ? checked : internalChecked;

  // Handle click event to toggle state and call onChange
  const handleClick = () => {
    const newChecked = !currentChecked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <button
      id={id}
      type='button'
      role='checkbox'
      aria-checked={currentChecked}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        'peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      data-state={currentChecked ? 'checked' : 'unchecked'}
      {...props}
    >
      {currentChecked && (
        <span className='flex items-center justify-center text-current transition-none'>
          <CheckIcon className='size-3.5' data-testid='check-icon' />
        </span>
      )}
    </button>
  );
}

export { Checkbox };
