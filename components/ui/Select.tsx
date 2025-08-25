'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { clsx } from 'clsx';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  className?: string;
}

export default function Select({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  error,
  label,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case 'Space':
        event.preventDefault();
        if (isOpen && options[highlightedIndex]) {
          onChange(options[highlightedIndex].value);
          setIsOpen(false);
        } else {
          setIsOpen(true);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isOpen) {
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : options.length - 1
          );
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (isOpen) {
          setHighlightedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : 0
          );
        } else {
          setIsOpen(true);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className={clsx('relative w-full', className)} ref={containerRef}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-dark-slate">
          {label}
        </label>
      )}

      <div
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="select-listbox"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        className={clsx(
          'relative w-full px-3 py-2 text-left bg-white rounded-lg',
          'border transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-electric-blue',
          {
            'cursor-default': !disabled,
            'cursor-not-allowed opacity-50 bg-gray-50': disabled,
            'border-error': error,
            'border-border-color': !error,
          }
        )}
      >
        <span
          className={clsx('block truncate', !selectedOption && 'text-gray-500')}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <span className="absolute inset-y-0 right-0 flex items-center pr-2">
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <FiChevronDown className="w-5 h-5 text-gray-400" />
          </motion.span>
        </span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            id="select-listbox"
            ref={listboxRef}
            role="listbox"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={clsx(
              'absolute z-50 w-full py-1 mt-1 bg-white rounded-lg shadow-lg',
              'border border-border-color max-h-60 overflow-auto focus:outline-none'
            )}
          >
            {options.map((option, index) => (
              <motion.li
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15, delay: index * 0.03 }}
                className={clsx(
                  'px-3 py-2 cursor-default select-none',
                  'transition-colors duration-200',
                  {
                    'bg-electric-blue/10 text-electric-blue':
                      highlightedIndex === index,
                    'text-dark-slate hover:bg-gray-50':
                      highlightedIndex !== index,
                    'font-medium': option.value === value,
                  }
                )}
              >
                {option.label}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
}
