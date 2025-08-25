import { InputHTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  className?: string;
  // Optional icons for on/off states
  iconOn?: React.ReactNode;
  iconOff?: React.ReactNode;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    { label, error, className, disabled, checked, iconOn, iconOff, ...props },
    ref
  ) => {
    // Track width calculation based on design
    const trackWidth = 44; // Material You-inspired dimensions
    const thumbSize = 20;
    const trackPadding = 2;
    const travel = trackWidth - thumbSize - trackPadding * 2;

    return (
      <div className={clsx('relative flex items-start', className)}>
        <div className="flex items-center h-6">
          <input
            type="checkbox"
            ref={ref}
            disabled={disabled}
            checked={checked}
            className="sr-only"
            {...props}
          />

          {/* Track */}
          <motion.div
            className={clsx(
              'relative rounded-full transition-colors duration-200',
              'cursor-pointer',
              {
                'bg-electric-blue/90': checked,
                'bg-gray-200': !checked,
                'cursor-not-allowed opacity-50': disabled,
              }
            )}
            style={{
              width: trackWidth,
              height: 24,
            }}
            animate={{
              backgroundColor: checked
                ? 'rgb(0, 123, 255, 0.9)'
                : 'rgb(229, 231, 235)',
            }}
          >
            {/* Thumb */}
            <motion.div
              className={clsx(
                'absolute top-1/2 -translate-y-1/2',
                'rounded-full shadow-lg',
                'flex items-center justify-center',
                'bg-white'
              )}
              style={{
                width: thumbSize,
                height: thumbSize,
                x: trackPadding,
              }}
              animate={{
                x: checked ? travel + trackPadding : trackPadding,
                scale: checked ? 1.1 : 1,
                backgroundColor: checked
                  ? 'rgb(255, 255, 255)'
                  : 'rgb(255, 255, 255)',
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
              }}
            >
              {/* Icon container */}
              <motion.div
                initial={false}
                animate={{ opacity: checked ? 1 : 0 }}
                className="text-electric-blue"
                style={{ fontSize: '12px' }}
              >
                {iconOn}
              </motion.div>
              <motion.div
                initial={false}
                animate={{ opacity: checked ? 0 : 1 }}
                className="absolute text-gray-400"
                style={{ fontSize: '12px' }}
              >
                {iconOff}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {label && (
          <div className="ml-3 select-none">
            <label
              htmlFor={props.id}
              className={clsx('text-sm font-medium', {
                'text-dark-slate cursor-pointer': !disabled,
                'text-gray-400 cursor-not-allowed': disabled,
              })}
            >
              {label}
            </label>
          </div>
        )}

        {error && (
          <p className="absolute -bottom-5 left-0 text-sm text-error">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
