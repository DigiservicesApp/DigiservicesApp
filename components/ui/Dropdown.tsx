import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { RiArrowDownSLine, RiCheckLine } from 'react-icons/ri';

interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
  disabled?: boolean;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled';
  fullWidth?: boolean;
  error?: string;
  className?: string;
  menuClassName?: string;
}

const sizeClasses = {
  sm: 'h-8 text-sm',
  md: 'h-10 text-base',
  lg: 'h-12 text-lg',
};

const paddingClasses = {
  sm: 'px-2',
  md: 'px-3',
  lg: 'px-4',
};

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  size = 'md',
  variant = 'outline',
  fullWidth = false,
  error,
  className,
  menuClassName,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: DropdownOption) => {
    if (option.disabled) return;
    onChange?.(option.value);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={clsx('relative', fullWidth ? 'w-full' : 'w-fit', className)}
    >
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={clsx(
          'flex items-center justify-between gap-2',
          'rounded-lg transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-electric-blue/50',
          sizeClasses[size],
          paddingClasses[size],
          fullWidth && 'w-full',
          variant === 'outline' && [
            'border',
            error
              ? 'border-error text-error'
              : 'border-slate-200 dark:border-slate-700',
            !disabled && 'hover:border-electric-blue',
          ],
          variant === 'filled' && [
            error ? 'bg-error/5 text-error' : 'bg-slate-100 dark:bg-slate-800',
            !disabled && 'hover:bg-slate-200 dark:hover:bg-slate-700',
          ],
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <span className={clsx('truncate', !selectedOption && 'text-slate-400')}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <RiArrowDownSLine
          className={clsx(
            'w-5 h-5 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={clsx(
              'absolute z-50 w-full min-w-[12rem] mt-1',
              'bg-white dark:bg-slate-800',
              'rounded-lg shadow-lg border border-slate-200 dark:border-slate-700',
              'focus:outline-none',
              menuClassName
            )}
          >
            <ul
              role="listbox"
              className="py-1"
              aria-activedescendant={value ? `option-${value}` : undefined}
            >
              {options.map((option) => (
                <li
                  key={option.value}
                  id={`option-${option.value}`}
                  role="option"
                  aria-selected={value === option.value}
                  onClick={() => handleSelect(option)}
                  className={clsx(
                    'flex items-center gap-2',
                    paddingClasses[size],
                    'py-2 cursor-pointer',
                    option.disabled
                      ? 'opacity-50 cursor-not-allowed'
                      : [
                          'hover:bg-slate-50 dark:hover:bg-slate-700',
                          'transition-colors duration-200',
                        ],
                    value === option.value && 'text-electric-blue'
                  )}
                >
                  {option.icon && (
                    <span className="flex-shrink-0">{option.icon}</span>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="truncate">{option.label}</span>
                      {value === option.value && (
                        <RiCheckLine className="w-5 h-5 flex-shrink-0" />
                      )}
                    </div>
                    {option.description && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                        {option.description}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
}
