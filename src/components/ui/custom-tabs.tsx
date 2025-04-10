import React, { createContext, useContext, useState } from "react";
import { cn } from "../../lib/utils";

// Types
type TabsContextValue = {
  selectedTab: string;
  setSelectedTab: (id: string) => void;
};

// Context
const TabsContext = createContext<TabsContextValue | undefined>(undefined);

// Hook to use the tabs context
const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider");
  }
  return context;
};

// Main Tabs Container
interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  children: React.ReactNode;
}

export const Tabs = ({
  defaultValue,
  children,
  className,
  ...props
}: TabsProps) => {
  const [selectedTab, setSelectedTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ selectedTab, setSelectedTab }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// Tabs List (contains triggers)
interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const TabsList = ({ children, className, ...props }: TabsListProps) => {
  return (
    <div
      className={cn("flex items-center", className)}
      role="tablist"
      {...props}
    >
      {children}
    </div>
  );
};

// Individual Tab Trigger
interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  children: React.ReactNode;
}

export const TabsTrigger = ({
  value,
  children,
  className,
  ...props
}: TabsTriggerProps) => {
  const { selectedTab, setSelectedTab } = useTabsContext();
  const isSelected = selectedTab === value;

  return (
    <button
      role="tab"
      aria-selected={isSelected}
      data-state={isSelected ? "active" : "inactive"}
      onClick={() => setSelectedTab(value)}
      className={cn(
        "inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium transition-all",
        "focus:outline-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

// Tab Content
interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

export const TabsContent = ({
  value,
  children,
  className,
  ...props
}: TabsContentProps) => {
  const { selectedTab } = useTabsContext();
  const isSelected = selectedTab === value;

  if (!isSelected) return null;

  return (
    <div
      role="tabpanel"
      data-state={isSelected ? "active" : "inactive"}
      className={cn("mt-2", className)}
      {...props}
    >
      {children}
    </div>
  );
};
