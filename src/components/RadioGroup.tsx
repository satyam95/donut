import { createContext, useContext, useId, useState, ReactNode } from 'react';
import { CircleIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface RadioGroupContextValue {
  value: string | null;
  onChange: (value: string) => void;
  name: string;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  className?: string;
  children: ReactNode;
  orientation?: 'horizontal' | 'vertical';
}

export function RadioGroup({
  value,
  defaultValue,
  onValueChange,
  name,
  className,
  children,
  orientation = 'vertical',
  ...props
}: RadioGroupProps) {
  const generatedName = useId();
  const groupName = name || `radio-group-${generatedName}`;

  const [internalValue, setInternalValue] = useState<string | null>(
    defaultValue ?? null
  );

  const selectedValue = value !== undefined ? value : internalValue;

  const handleChange = (val: string) => {
    setInternalValue(val);
    onValueChange?.(val);
  };

  return (
    <RadioGroupContext.Provider
      value={{ value: selectedValue, onChange: handleChange, name: groupName }}
    >
      <div
        role='radiogroup'
        aria-orientation={orientation}
        className={cn(
          orientation === 'vertical' ? 'grid gap-3' : 'flex gap-4',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

interface RadioGroupItemProps {
  value: string;
  id?: string;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

export function RadioGroupItem({
  value,
  id,
  disabled = false,
  className,
  children,
  ...props
}: RadioGroupItemProps) {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('RadioGroupItem must be used within a RadioGroup');
  }

  const { value: groupValue, onChange, name } = context;
  const checked = groupValue === value;

  return (
    <label
      htmlFor={id}
      data-slot='radio-group-item'
      className={cn('inline-flex items-center space-x-2', className)}
    >
      <input
        type='radio'
        id={id}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        className='sr-only'
        onChange={() => onChange(value)}
        {...props}
      />
      <span
        className={cn(
          'relative border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
          checked && 'bg-primary/20'
        )}
      >
        {checked && (
          <CircleIcon className='stroke-primary fill-primary absolute top-1/2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2' />
        )}
      </span>
      {children && <span className='text-sm'>{children}</span>}
    </label>
  );
}
