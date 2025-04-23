import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from 'react';
import { cn } from '../lib/utils';

type TooltipContextType = {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
};

// 1. Create context
const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

// 2. The context provider—manages the hover state
const TooltipProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);

  return (
    <TooltipContext.Provider value={{ isVisible, show, hide }}>
      {children}
    </TooltipContext.Provider>
  );
};

// 3. Root wrapper—sets up relative positioning & provider
const Tooltip: FC<{ children: ReactNode }> = ({ children }) => (
  <div className='relative inline-block'>
    <TooltipProvider>{children}</TooltipProvider>
  </div>
);

// 4. Trigger—automatically wires up mouse events
const TooltipTrigger: FC<{ children: ReactNode }> = ({ children }) => {
  const ctx = useContext(TooltipContext);
  if (!ctx) {
    throw new Error('TooltipTrigger must be inside <Tooltip>…</Tooltip>');
  }
  return (
    <div
      className='cursor-pointer'
      onMouseEnter={ctx.show}
      onMouseLeave={ctx.hide}
      onFocus={ctx.show}
      onBlur={ctx.hide}
    >
      {children}
    </div>
  );
};

interface TooltipContentProps {
  children: ReactNode;
  className?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number; // in pixels
}

// 5. Content—reads state from context, no more required prop
const TooltipContent: FC<TooltipContentProps> = ({
  children,
  className,
  side = 'top',
  sideOffset = 8,
}) => {
  const ctx = useContext(TooltipContext);
  if (!ctx) {
    throw new Error('TooltipContent must be inside <Tooltip>…</Tooltip>');
  }
  if (!ctx.isVisible) return null;

  // build a little inline style for the offset
  const offsetStyle: React.CSSProperties = {};
  if (side === 'top') offsetStyle.marginBottom = sideOffset;
  if (side === 'bottom') offsetStyle.marginTop = sideOffset;
  if (side === 'left') offsetStyle.marginRight = sideOffset;
  if (side === 'right') offsetStyle.marginLeft = sideOffset;

  return (
    <div
      className={cn(
        'absolute z-50 w-max max-w-xs bg-primary text-primary-foreground text-xs rounded-md px-3 py-1.5 shadow-md animate-fade-in',
        side === 'top' && 'bottom-full left-1/2 transform -translate-x-1/2',
        side === 'bottom' && 'top-full left-1/2 transform -translate-x-1/2',
        side === 'left' && 'right-full top-1/2 transform -translate-y-1/2',
        side === 'right' && 'left-full top-1/2 transform -translate-y-1/2',
        className
      )}
      style={offsetStyle}
    >
      {children}
      <div
        className={cn(
          'absolute h-2 w-2 bg-primary transform rotate-45',
          side === 'top' && 'bottom-[-4px] left-1/2 transform -translate-x-1/2',
          side === 'bottom' && 'top-[-4px] left-1/2 transform -translate-x-1/2',
          side === 'left' && 'right-[-4px] top-1/2 transform -translate-y-1/2',
          side === 'right' && 'left-[-4px] top-1/2 transform -translate-y-1/2'
        )}
      />
    </div>
  );
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
