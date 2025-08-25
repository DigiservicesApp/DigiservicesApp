'use client';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { RiCloseLine } from 'react-icons/ri';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  overlay?: boolean;
  closeOnOutsideClick?: boolean;
  showCloseButton?: boolean;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

const sizeClasses = {
  left: {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96',
    xl: 'w-[32rem]',
    full: 'w-screen',
  },
  right: {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96',
    xl: 'w-[32rem]',
    full: 'w-screen',
  },
  top: {
    sm: 'h-32',
    md: 'h-48',
    lg: 'h-64',
    xl: 'h-96',
    full: 'h-screen',
  },
  bottom: {
    sm: 'h-32',
    md: 'h-48',
    lg: 'h-64',
    xl: 'h-96',
    full: 'h-screen',
  },
};

const positionClasses = {
  left: 'left-0 top-0 bottom-0',
  right: 'right-0 top-0 bottom-0',
  top: 'top-0 left-0 right-0',
  bottom: 'bottom-0 left-0 right-0',
};

const slideAnimations = {
  left: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
  },
  right: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
  },
  top: {
    initial: { y: '-100%' },
    animate: { y: 0 },
    exit: { y: '-100%' },
  },
  bottom: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
  },
};

export default function Drawer({
  open,
  onClose,
  position = 'right',
  size = 'md',
  overlay = true,
  closeOnOutsideClick = true,
  showCloseButton = true,
  className,
  header,
  footer,
  children,
}: DrawerProps) {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          {overlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50"
              onClick={closeOnOutsideClick ? onClose : undefined}
              aria-hidden="true"
            />
          )}

          {/* Drawer */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className={clsx(
              'fixed z-50',
              'bg-white dark:bg-slate-800',
              'shadow-xl',
              positionClasses[position],
              sizeClasses[position][size],
              className
            )}
            initial={slideAnimations[position].initial}
            animate={slideAnimations[position].animate}
            exit={slideAnimations[position].exit}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              {(header || showCloseButton) && (
                <div
                  className={clsx(
                    'flex items-center justify-between',
                    'px-6 py-4',
                    'border-b border-slate-200 dark:border-slate-700'
                  )}
                >
                  {header}
                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      className={clsx(
                        'p-2 rounded-lg',
                        '-mr-2',
                        'text-slate-400 hover:text-slate-500',
                        'hover:bg-slate-100 dark:hover:bg-slate-700',
                        'transition-colors duration-200'
                      )}
                    >
                      <RiCloseLine className="w-5 h-5" />
                      <span className="sr-only">Close</span>
                    </button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">{children}</div>

              {/* Footer */}
              {footer && (
                <div
                  className={clsx(
                    'px-6 py-4',
                    'border-t border-slate-200 dark:border-slate-700'
                  )}
                >
                  {footer}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Action sheet variant for mobile
interface ActionSheetProps extends Omit<DrawerProps, 'position'> {
  actions: Array<{
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    destructive?: boolean;
    disabled?: boolean;
  }>;
}

export function ActionSheet({
  actions,
  size = 'sm',
  ...props
}: ActionSheetProps) {
  return (
    <Drawer position="bottom" size={size} {...props}>
      <div className="space-y-2">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            disabled={action.disabled}
            className={clsx(
              'w-full flex items-center gap-3 px-4 py-3 rounded-lg',
              'text-left text-base font-medium',
              'transition-colors duration-200',
              action.destructive
                ? 'text-error hover:bg-error/10'
                : 'text-dark-slate hover:bg-slate-100 dark:hover:bg-slate-700',
              action.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {action.icon}
            {action.label}
          </button>
        ))}
      </div>
    </Drawer>
  );
}
