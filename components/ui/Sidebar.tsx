'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri';

interface SidebarProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'fixed' | 'sticky';
  showToggle?: boolean;
  overlay?: boolean;
  className?: string;
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
}

const sizeClasses = {
  sm: 'w-64',
  md: 'w-72',
  lg: 'w-80',
};

const variantClasses = {
  fixed: 'fixed top-0 bottom-0',
  sticky: 'sticky top-0 h-screen',
};

export default function Sidebar({
  children,
  open = true,
  onOpenChange,
  position = 'left',
  size = 'md',
  variant = 'fixed',
  showToggle = true,
  overlay = false,
  className,
  headerContent,
  footerContent,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(open);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onOpenChange?.(newState);
  };

  const sidebarContent = (
    <motion.aside
      initial={{ width: 0, x: position === 'left' ? -300 : 300 }}
      animate={{
        width: isOpen ? sizeClasses[size].slice(2) : 0,
        x: isOpen ? 0 : position === 'left' ? -300 : 300,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
      className={clsx(
        'flex flex-col h-full',
        'bg-[color:var(--md-sys-color-surface)] text-[color:var(--md-sys-color-on-surface)]',
        'border-[color:var(--md-sys-color-outline)]',
        position === 'left' ? 'border-r' : 'border-l',
        variant === 'fixed' ? 'z-40' : 'z-20',
        position === 'left' ? 'left-0' : 'right-0',
        variantClasses[variant],
        className
      )}
    >
      {/* Header */}
      {headerContent && (
        <div className="p-4 border-b border-[color:var(--md-sys-color-outline)]">
          {headerContent}
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-4">{children}</div>

      {/* Footer */}
      {footerContent && (
        <div className="p-4 border-t border-[color:var(--md-sys-color-outline)]">
          {footerContent}
        </div>
      )}

      {/* Toggle button */}
      {showToggle && (
        <button
          onClick={handleToggle}
          className={clsx(
            'absolute top-4 p-2 rounded-full',
            'bg-[color:var(--md-sys-color-surface)]',
            'border-[color:var(--md-sys-color-outline)]',
            'hover:bg-[color:color-mix(in srgb,var(--md-sys-color-on-surface)6%,transparent)]',
            'transition-colors duration-200',
            position === 'left'
              ? 'right-0 translate-x-1/2'
              : 'left-0 -translate-x-1/2'
          )}
        >
          {isOpen ? <RiMenuFoldLine /> : <RiMenuUnfoldLine />}
        </button>
      )}
    </motion.aside>
  );

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (isMobile || overlay) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleToggle}
            className="fixed inset-0 bg-black/20 dark:bg-black/40 z-30"
          />
        )}
      </AnimatePresence>

      {sidebarContent}
    </>
  );
}
