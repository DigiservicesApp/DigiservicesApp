import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
  variant: 'filled' | 'outlined' | 'minimal';
  size: 'sm' | 'md' | 'lg';
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
  defaultTab?: string;
  variant?: 'filled' | 'outlined' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onChange?: (id: string) => void;
  className?: string;
  children: React.ReactNode;
}

const sizeClasses = {
  sm: 'text-sm h-8',
  md: 'text-base h-10',
  lg: 'text-lg h-12',
};

export function Tabs({
  defaultTab,
  variant = 'filled',
  size = 'md',
  fullWidth = false,
  onChange,
  className,
  children,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(
    defaultTab || React.Children.toArray(children)[0]?.['props']?.id || ''
  );

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    onChange?.(id);
  };

  return (
    <TabsContext.Provider
      value={{ activeTab, setActiveTab: handleTabChange, variant, size }}
    >
      <div className={clsx('flex flex-col gap-4', className)}>{children}</div>
    </TabsContext.Provider>
  );
}

interface TabListProps {
  'aria-label': string;
  className?: string;
  children: React.ReactNode;
}

export function TabList({
  'aria-label': ariaLabel,
  className,
  children,
}: TabListProps) {
  const { variant, size } = useContext(TabsContext) || {};
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, x: 0 });
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateIndicator = () => {
      if (!tabsRef.current) return;
      const activeTab = tabsRef.current.querySelector('[data-active="true"]');
      if (activeTab) {
        const { width, x } = activeTab.getBoundingClientRect();
        const parentX = tabsRef.current.getBoundingClientRect().x;
        setIndicatorStyle({ width, x: x - parentX });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, []);

  return (
    <div
      ref={tabsRef}
      role="tablist"
      aria-label={ariaLabel}
      className={clsx(
        'relative flex',
        variant === 'outlined' &&
          'border-b border-slate-200 dark:border-slate-700',
        className
      )}
    >
      {children}
      {variant !== 'minimal' && (
        <motion.div
          className={clsx(
            'absolute bottom-0 h-0.5 rounded-full',
            variant === 'filled' ? 'bg-electric-blue' : 'bg-dark-slate'
          )}
          initial={false}
          animate={{
            width: indicatorStyle.width,
            x: indicatorStyle.x,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </div>
  );
}

interface TabProps {
  id: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Tab({ id, disabled, className, children }: TabProps) {
  const { activeTab, setActiveTab, variant, size } =
    useContext(TabsContext) || {};
  const isActive = activeTab === id;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${id}`}
      id={`tab-${id}`}
      data-active={isActive}
      disabled={disabled}
      onClick={() => setActiveTab?.(id)}
      className={clsx(
        'relative px-4 font-medium transition-colors outline-none',
        sizeClasses[size || 'md'],
        variant === 'filled' && [
          'hover:bg-slate-100 dark:hover:bg-slate-800',
          isActive && 'text-electric-blue',
        ],
        variant === 'outlined' && [
          'hover:bg-slate-50 dark:hover:bg-slate-800',
          isActive && 'text-dark-slate',
        ],
        variant === 'minimal' && [
          'hover:bg-transparent',
          isActive
            ? 'text-electric-blue'
            : 'text-slate-500 hover:text-slate-900',
        ],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  );
}

interface TabPanelProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export function TabPanel({ id, className, children }: TabPanelProps) {
  const { activeTab } = useContext(TabsContext) || {};
  const isActive = activeTab === id;

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          role="tabpanel"
          id={`panel-${id}`}
          aria-labelledby={`tab-${id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Compound component exports
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;
