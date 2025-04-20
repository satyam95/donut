import * as React from 'react';
import { cn } from '../lib/utils';

type TabsProps = {
  className?: string;
  children: React.ReactNode;
  defaultValue?: string;
};

function Tabs({ className, children, defaultValue }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const contextValue = React.useMemo(
    () => ({ activeTab, onChange: handleTabChange }),
    [activeTab]
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={cn('flex flex-col gap-2', className)}>{children}</div>
    </TabsContext.Provider>
  );
}

type TabsListProps = {
  className?: string;
  children: React.ReactNode;
};

function TabsList({ className, children }: TabsListProps) {
  return (
    <div
      className={cn(
        'bg-muted inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]',
        className
      )}
    >
      {children}
    </div>
  );
}

type TabsTriggerProps = {
  className?: string;
  value: string;
  children: React.ReactNode;
};

function TabsTrigger({ className, value, children }: TabsTriggerProps) {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('TabsTrigger must be used within a Tabs component');
  }

  const { activeTab, onChange } = context;
  const isActive = activeTab === value;

  return (
    <button
      className={cn(
        'inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium transition-[color,box-shadow]',
        isActive
          ? 'bg-background text-foreground shadow-sm'
          : 'text-muted-foreground',
        'focus-visible:ring-[3px] focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      onClick={() => onChange(value)}
    >
      {children}
    </button>
  );
}

type TabsContentProps = {
  className?: string;
  value: string;
  children: React.ReactNode;
};

function TabsContent({ className, value, children }: TabsContentProps) {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('TabsContent must be used within a Tabs component');
  }

  const { activeTab } = context;

  if (activeTab !== value) return null;

  return <div className={cn('flex-1 outline-none', className)}>{children}</div>;
}

type TabsContextType = {
  activeTab: string | undefined;
  onChange: (value: string) => void;
};

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

export { Tabs, TabsList, TabsTrigger, TabsContent };
