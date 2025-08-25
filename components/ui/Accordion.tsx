'use client';
import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { RiArrowDownSLine } from 'react-icons/ri';

interface AccordionContextType {
  expandedItems: string[];
  toggleItem: (id: string) => void;
  variant: 'single' | 'multiple';
  size: 'sm' | 'md' | 'lg';
  bordered: boolean;
  iconPosition: 'left' | 'right';
}

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

interface AccordionProps {
  defaultExpanded?: string[];
  onChange?: (expanded: string[]) => void;
  variant?: 'single' | 'multiple';
  size?: 'sm' | 'md' | 'lg';
  bordered?: boolean;
  iconPosition?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const headerPaddingClasses = {
  sm: 'px-3 py-2',
  md: 'px-4 py-3',
  lg: 'px-6 py-4',
};

const contentPaddingClasses = {
  sm: 'px-3 py-2',
  md: 'px-4 py-3',
  lg: 'px-6 py-4',
};

export default function Accordion({
  defaultExpanded = [],
  onChange,
  variant = 'single',
  size = 'md',
  bordered = true,
  iconPosition = 'right',
  className,
  children,
}: AccordionProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(defaultExpanded);

  const toggleItem = (id: string) => {
    let newExpanded: string[];

    if (variant === 'single') {
      newExpanded = expandedItems.includes(id) ? [] : [id];
    } else {
      newExpanded = expandedItems.includes(id)
        ? expandedItems.filter((item) => item !== id)
        : [...expandedItems, id];
    }

    setExpandedItems(newExpanded);
    onChange?.(newExpanded);
  };

  return (
    <AccordionContext.Provider
      value={{
        expandedItems,
        toggleItem,
        variant,
        size,
        bordered,
        iconPosition,
      }}
    >
      <div
        className={clsx(
          'divide-y divide-slate-200 dark:divide-slate-700',
          bordered &&
            'border border-slate-200 dark:border-slate-700 rounded-lg',
          sizeClasses[size],
          className
        )}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  id: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function AccordionItem({
  id,
  title,
  subtitle,
  icon,
  disabled = false,
  className,
  children,
}: AccordionItemProps) {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionItem must be used within Accordion');

  const { expandedItems, toggleItem, size, iconPosition } = context;
  const isExpanded = expandedItems.includes(id);

  return (
    <div className={clsx('overflow-hidden', className)}>
      <button
        type="button"
        onClick={() => !disabled && toggleItem(id)}
        disabled={disabled}
        className={clsx(
          'flex items-center justify-between w-full text-left',
          headerPaddingClasses[size],
          'transition-colors duration-200',
          !disabled && 'hover:bg-slate-50 dark:hover:bg-slate-800',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          {icon && iconPosition === 'left' && (
            <span className="flex-shrink-0 text-slate-400">{icon}</span>
          )}
          <div>
            <div className="font-medium text-dark-slate">{title}</div>
            {subtitle && (
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {subtitle}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {icon && iconPosition === 'right' && (
            <span className="flex-shrink-0 text-slate-400">{icon}</span>
          )}
          <motion.div
            initial={false}
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <RiArrowDownSLine
              className={clsx(
                'w-5 h-5',
                'text-slate-400',
                'transition-transform duration-200'
              )}
            />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={contentPaddingClasses[size]}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Compound component assignment
Accordion.Item = AccordionItem;

// Helper component for common use cases
interface AccordionGroupProps {
  items: Array<{
    id: string;
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    icon?: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
  }>;
  defaultExpanded?: string[];
  onChange?: (expanded: string[]) => void;
  variant?: 'single' | 'multiple';
  size?: 'sm' | 'md' | 'lg';
  bordered?: boolean;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export function AccordionGroup({
  items,
  ...accordionProps
}: AccordionGroupProps) {
  return (
    <Accordion {...accordionProps}>
      {items.map(({ id, title, subtitle, icon, content, disabled }) => (
        <AccordionItem
          key={id}
          id={id}
          title={title}
          subtitle={subtitle}
          icon={icon}
          disabled={disabled}
        >
          {content}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
