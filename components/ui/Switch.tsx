'use client';

import React from 'react';
import { motion, AnimatePresence, AnimationGeneratorType } from 'framer-motion';
import { RiCheckLine } from 'react-icons/ri';

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: SwitchSize;
  withIcon?: boolean;
}

const SIZES = {
  sm: {
    track: 'h-6 w-10',
    thumbPx: 16, // 16px (h-4)
    thumbCheckedPx: 20, // 20px (h-5)
    thumbClass: 'h-4 w-4',
    thumbCheckedClass: 'h-5 w-5',
    icon: 'h-3 w-3',
    x: 18,
  },
  md: {
    track: 'h-8 w-14',
    thumbPx: 24, // 24px (h-6)
    thumbCheckedPx: 28, // 28px (h-7)
    thumbClass: 'h-6 w-6',
    thumbCheckedClass: 'h-7 w-7',
    icon: 'h-4 w-4',
    x: 26,
  },
  lg: {
    track: 'h-10 w-16',
    thumbPx: 32, // 32px (h-8)
    thumbCheckedPx: 36, // 36px (h-9)
    thumbClass: 'h-8 w-8',
    thumbCheckedClass: 'h-9 w-9',
    icon: 'h-5 w-5',
    x: 30,
  },
};

const spring = {
  type: 'spring' as AnimationGeneratorType,
  stiffness: 700,
  damping: 30,
};

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      checked,
      onChange,
      onCheckedChange,
      size = 'md',
      withIcon = true,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onCheckedChange?.(e.target.checked);
    };

    const sizeStyles = SIZES[size];

    return (
      <label
        className={`relative inline-flex items-center ${
          disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
        } ${className}`}
        data-checked={checked}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="peer sr-only"
          ref={ref}
          {...props}
        />
        <motion.div
          className={`relative ${sizeStyles.track} rounded-full transition-colors duration-300 border-2`}
          style={{
            backgroundColor: checked
              ? 'var(--md-sys-color-primary)'
              : 'var(--md-sys-color-surface-container-highest)',
            borderColor: checked
              ? 'var(--md-sys-color-primary)'
              : 'var(--md-sys-color-outline)',
          }}
        >
          <motion.div
            className="absolute top-0 left-0 h-full flex items-center"
            initial={{ x: checked ? sizeStyles.x : 4 }}
            animate={{ x: checked ? sizeStyles.x : 4 }}
            transition={spring}
          >
            <motion.div
              className={`rounded-full flex items-center justify-center ${
                checked ? sizeStyles.thumbCheckedClass : sizeStyles.thumbClass
              }`}
              style={{
                // use a high-contrast visible thumb when unchecked (fallback to white)
                backgroundColor: checked
                  ? 'var(--md-sys-color-on-primary)'
                  : 'var(--md-sys-color-surface, #ffffff)',
                border: checked ? '0' : '1px solid var(--md-sys-color-outline)',
                zIndex: 10,
                boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
              }}
              initial={{
                width: sizeStyles.thumbPx,
                height: sizeStyles.thumbPx,
              }}
              animate={{
                width: checked ? sizeStyles.thumbCheckedPx : sizeStyles.thumbPx,
                height: checked
                  ? sizeStyles.thumbCheckedPx
                  : sizeStyles.thumbPx,
              }}
              transition={spring}
            >
              <AnimatePresence initial={false}>
                {withIcon && checked && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.18 }}
                  >
                    <RiCheckLine
                      className={`${sizeStyles.icon} text-[color:var(--md-sys-color-primary)]`}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      </label>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
