import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { RiCloseLine } from 'react-icons/ri';

interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  offset?: number;
  arrow?: boolean;
  closeOnClick?: boolean;
  closeOnOutsideClick?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

const positionStyles = {
  top: 'bottom-full mb-2',
  bottom: 'top-full mt-2',
  left: 'right-full mr-2',
  right: 'left-full ml-2',
};

const alignStyles = {
  start: '',
  center: 'translate-x-[-50%]',
  end: 'translate-x-[-100%]',
};

const arrowStyles = {
  top: 'bottom-[-6px] rotate-45',
  bottom: 'top-[-6px] rotate-45',
  left: 'right-[-6px] rotate-45',
  right: 'left-[-6px] rotate-45',
};

export function Popover({
  trigger,
  content,
  position = 'bottom',
  align = 'center',
  offset = 8,
  arrow = true,
  closeOnClick = true,
  closeOnOutsideClick = true,
  open: controlledOpen,
  onOpenChange,
  className,
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const open = controlledOpen ?? isOpen;

  const handleOpen = (value: boolean) => {
    if (controlledOpen === undefined) {
      setIsOpen(value);
    }
    onOpenChange?.(value);
  };

  useEffect(() => {
    if (!closeOnOutsideClick) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        handleOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeOnOutsideClick]);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <div onClick={() => handleOpen(!open)}>{trigger}</div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className={clsx(
              'absolute z-50',
              positionStyles[position],
              align !== 'start' && alignStyles[align],
              className
            )}
            onClick={closeOnClick ? () => handleOpen(false) : undefined}
            style={{
              [position]: `${offset}px`,
            }}
          >
            <div
              className={clsx(
                'relative bg-white dark:bg-slate-800',
                'rounded-lg shadow-lg border border-slate-200 dark:border-slate-700',
                'p-4'
              )}
            >
              {arrow && (
                <div
                  className={clsx(
                    'absolute w-3 h-3 bg-inherit transform rotate-45',
                    'border border-slate-200 dark:border-slate-700',
                    arrowStyles[position]
                  )}
                />
              )}
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Dialog Component
interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOutsideClick?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

const dialogSizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full mx-4',
};

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  size = 'md',
  closeOnOutsideClick = true,
  showCloseButton = true,
  className,
}: DialogProps) {
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={closeOnOutsideClick ? onClose : undefined}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className={clsx(
                'relative w-full',
                'bg-white dark:bg-slate-800',
                'rounded-lg shadow-xl',
                'border border-slate-200 dark:border-slate-700',
                dialogSizes[size],
                className
              )}
            >
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className={clsx(
                    'absolute top-4 right-4',
                    'text-slate-400 hover:text-slate-500',
                    'dark:text-slate-500 dark:hover:text-slate-400'
                  )}
                >
                  <RiCloseLine className="w-5 h-5" />
                  <span className="sr-only">Close</span>
                </button>
              )}

              <div className="p-6">
                {title && (
                  <h2 className="text-lg font-semibold text-dark-slate mb-2">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="text-slate-500 dark:text-slate-400 mb-4">
                    {description}
                  </p>
                )}
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
