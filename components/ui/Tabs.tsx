'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const tabsListVariants = cva(
  'relative flex rounded-full gap-1 p-1 transition-all duration-200',
  {
    variants: {
      variant: {
        filled: 'bg-[color:var(--md-sys-color-surface-container-highest)]',
        outlined: 'border-2 border-[color:var(--md-sys-color-outline)]',
        underlined: 'border-b border-[color:var(--md-sys-color-outline)]',
      },
      fullWidth: {
        true: 'w-full',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'filled',
      size: 'md',
      fullWidth: false,
    },
  }
);

const tabTriggerVariants = cva(
  'relative inline-flex items-center justify-center whitespace-nowrap rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--md-sys-color-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        filled: [
          'hover:bg-[color:var(--md-sys-color-surface-container-low)]',
          'data-[state=active]:bg-[color:var(--md-sys-color-secondary-container)]',
          'data-[state=active]:text-[color:var(--md-sys-color-on-secondary-container)]',
        ],
        outlined: [
          'hover:bg-[color:var(--md-sys-color-surface-container-low)]',
          'data-[state=active]:bg-[color:var(--md-sys-color-secondary-container)]',
          'data-[state=active]:text-[color:var(--md-sys-color-on-secondary-container)]',
        ],
        underlined: [
          'rounded-none',
          'data-[state=active]:text-[color:var(--md-sys-color-primary)]',
        ],
      },
      fullWidth: {
        true: 'flex-1',
      },
      size: {
        sm: 'h-8 px-3',
        md: 'h-10 px-4',
        lg: 'h-12 px-5',
      },
    },
    defaultVariants: {
      variant: 'filled',
      size: 'md',
      fullWidth: false,
    },
  }
);

const tabContentVariants = cva(
  'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        filled: '',
        outlined: '',
        underlined: '',
      },
    },
    defaultVariants: {
      variant: 'filled',
    },
  }
);

interface TabsProps extends VariantProps<typeof tabsListVariants> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface TabTriggerProps extends VariantProps<typeof tabTriggerVariants> {
  value: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

interface TabContentProps extends VariantProps<typeof tabContentVariants> {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabsContext = React.createContext<{
  selectedTab: string;
  setSelectedTab: (value: string) => void;
  variant?: 'filled' | 'outlined' | 'underlined';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
} | null>(null);

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  variant,
  size,
  fullWidth,
  children,
  className,
}: TabsProps) {
  const [selectedTab, setSelectedTab] = useState(value || defaultValue || '');
  const isControlled = value !== undefined;

  const handleTabChange = (newValue: string) => {
    if (!isControlled) {
      setSelectedTab(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider
      value={{
        selectedTab: isControlled ? value : selectedTab,
        setSelectedTab: handleTabChange,
        variant,
        size,
        fullWidth,
      }}
    >
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabsList must be used within Tabs');

  const { variant, size, fullWidth } = context;

  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    transform: 'translateX(0)',
  });
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeTab = listRef.current?.querySelector(
      '[data-state="active"]'
    ) as HTMLElement;
    if (activeTab && variant === 'underlined') {
      setIndicatorStyle({
        width: activeTab.offsetWidth,
        transform: `translateX(${activeTab.offsetLeft}px)`,
      });
    }
  }, [context.selectedTab, variant]);

  return (
    <div
      ref={listRef}
      className={cn(tabsListVariants({ variant, size, fullWidth }), className)}
    >
      {children}
      {variant === 'underlined' && (
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-[color:var(--md-sys-color-primary)] transition-all duration-200"
          style={indicatorStyle}
        />
      )}
    </div>
  );
}

export function TabTrigger({
  value,
  children,
  className,
  icon,
}: TabTriggerProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabTrigger must be used within Tabs');

  const { selectedTab, setSelectedTab, variant, size, fullWidth } = context;
  const isActive = selectedTab === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? 'active' : 'inactive'}
      onClick={() => setSelectedTab(value)}
      className={cn(
        tabTriggerVariants({ variant, size, fullWidth }),
        className
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}

export function TabContent({ value, children, className }: TabContentProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabContent must be used within Tabs');

  const { selectedTab, variant } = context;
  const isSelected = selectedTab === value;

  if (!isSelected) return null;

  return (
    <div
      role="tabpanel"
      className={cn(tabContentVariants({ variant }), className)}
    >
      {children}
    </div>
  );
}

// Usage example:
/*
import { Tabs, TabsList, TabTrigger, TabContent } from './Tabs.new';

// Basic usage
<Tabs defaultValue="tab1">
  <TabsList>
    <TabTrigger value="tab1">Tab 1</TabTrigger>
    <TabTrigger value="tab2">Tab 2</TabTrigger>
    <TabTrigger value="tab3">Tab 3</TabTrigger>
  </TabsList>
  <TabContent value="tab1">Content 1</TabContent>
  <TabContent value="tab2">Content 2</TabContent>
  <TabContent value="tab3">Content 3</TabContent>
</Tabs>

// Different variants
<Tabs variant="filled">...</Tabs>
<Tabs variant="outlined">...</Tabs>
<Tabs variant="underlined">...</Tabs>

// Different sizes
<Tabs size="sm">...</Tabs>
<Tabs size="md">...</Tabs>
<Tabs size="lg">...</Tabs>

// Full width
<Tabs fullWidth>...</Tabs>

// With icons
<TabTrigger value="home" icon={<HomeIcon />}>
  Home
</TabTrigger>

// Controlled
const [activeTab, setActiveTab] = useState('tab1');
<Tabs value={activeTab} onValueChange={setActiveTab}>
  ...
</Tabs>
*/
