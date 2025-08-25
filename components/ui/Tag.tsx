'use client';
import React from 'react';
import { clsx } from 'clsx';
import { RiCloseLine } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';

interface TagProps {
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'subtle';
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  icon?: React.ReactNode;
  interactive?: boolean;
  disabled?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1.5',
};

const iconSizeClasses = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

const colorClasses = {
  solid: {
    default:
      'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-100',
    primary: 'bg-electric-blue text-white',
    success: 'bg-success text-white',
    warning: 'bg-warning text-slate-900',
    error: 'bg-error text-white',
    info: 'bg-info text-white',
  },
  outline: {
    default:
      'border border-slate-200 text-slate-800 dark:border-slate-600 dark:text-slate-100',
    primary: 'border border-electric-blue text-electric-blue',
    success: 'border border-success text-success',
    warning: 'border border-warning text-warning',
    error: 'border border-error text-error',
    info: 'border border-info text-info',
  },
  subtle: {
    default:
      'bg-slate-100/50 text-slate-800 dark:bg-slate-700/50 dark:text-slate-100',
    primary: 'bg-electric-blue/10 text-electric-blue',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error',
    info: 'bg-info/10 text-info',
  },
};

const interactiveClasses = {
  solid: {
    default: 'hover:bg-slate-200 dark:hover:bg-slate-600',
    primary: 'hover:bg-electric-blue/90',
    success: 'hover:bg-success/90',
    warning: 'hover:bg-warning/90',
    error: 'hover:bg-error/90',
    info: 'hover:bg-info/90',
  },
  outline: {
    default: 'hover:bg-slate-100 dark:hover:bg-slate-800',
    primary: 'hover:bg-electric-blue/10',
    success: 'hover:bg-success/10',
    warning: 'hover:bg-warning/10',
    error: 'hover:bg-error/10',
    info: 'hover:bg-info/10',
  },
  subtle: {
    default: 'hover:bg-slate-200/50 dark:hover:bg-slate-600/50',
    primary: 'hover:bg-electric-blue/20',
    success: 'hover:bg-success/20',
    warning: 'hover:bg-warning/20',
    error: 'hover:bg-error/20',
    info: 'hover:bg-info/20',
  },
};

export default function Tag({
  children,
  variant = 'solid',
  color = 'default',
  size = 'md',
  rounded = true,
  removable = false,
  onRemove,
  icon,
  interactive = false,
  disabled = false,
  className,
}: TagProps) {
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && onRemove) {
      onRemove();
    }
  };

  const tagContent = (
    <span className="flex items-center gap-1.5">
      {icon && (
        <span className={clsx('shrink-0', iconSizeClasses[size])}>
          {icon}
        </span>
      )}
      {children}
      {removable && (
        <button
          type="button"
          onClick={handleRemove}
          disabled={disabled}
          className={clsx(
            'shrink-0 -mr-1 ml-1',
            'hover:opacity-75',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            'focus:ring-electric-blue/50',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          <RiCloseLine className={iconSizeClasses[size]} />
          <span className="sr-only">Remove</span>
        </button>
      )}
    </span>
  );

  const baseClasses = clsx(
    'inline-flex items-center font-medium',
    'transition-colors duration-200',
    sizeClasses[size],
    colorClasses[variant][color],
    rounded && 'rounded-full',
    interactive &&
      !disabled && ['cursor-pointer', interactiveClasses[variant][color]],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  return interactive ? (
    <button type="button" disabled={disabled} className={baseClasses}>
      {tagContent}
    </button>
  ) : (
    <span className={baseClasses}>{tagContent}</span>
  );
}

// Group component for managing multiple tags
interface TagGroupProps {
  children: React.ReactNode;
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function TagGroup({
  children,
  spacing = 'md',
  className,
}: TagGroupProps) {
  return (
    <div
      className={clsx(
        'flex flex-wrap',
        {
          'gap-1': spacing === 'sm',
          'gap-2': spacing === 'md',
          'gap-3': spacing === 'lg',
        },
        className
      )}
    >
      {children}
    </div>
  );
}

// Animated tag group for tag lists that change
interface AnimatedTagGroupProps<T> {
  items: T[];
  renderTag: (item: T) => React.ReactNode;
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function AnimatedTagGroup<T>({
  items,
  renderTag,
  spacing = 'md',
  className,
}: AnimatedTagGroupProps<T>) {
  return (
    <div
      className={clsx(
        'flex flex-wrap',
        {
          'gap-1': spacing === 'sm',
          'gap-2': spacing === 'md',
          'gap-3': spacing === 'lg',
        },
        className
      )}
    >
      <AnimatePresence initial={false}>
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {renderTag(item)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
