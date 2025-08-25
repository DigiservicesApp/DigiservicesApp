'use client';
import { HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface ProgressProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  value?: number;
  variant?: 'linear' | 'circular';
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'success' | 'error';
  indeterminate?: boolean;
  label?: string;
  showValue?: boolean;
  thickness?: number;
  className?: string;
}

const sizeClasses = {
  linear: {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  },
  circular: {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  },
};

const colorClasses = {
  default: {
    base: 'bg-electric-blue',
    track: 'bg-electric-blue/20',
  },
  success: {
    base: 'bg-success',
    track: 'bg-success/20',
  },
  error: {
    base: 'bg-error',
    track: 'bg-error/20',
  },
};

export default function Progress({
  value = 0,
  variant = 'linear',
  size = 'md',
  color = 'default',
  indeterminate = false,
  label,
  showValue,
  thickness = 4,
  className,
  ...props
}: ProgressProps) {
  const normalizedValue = Math.min(100, Math.max(0, value));
  const variantSize = sizeClasses[variant][size];
  const variantColor = colorClasses[color];

  // Linear Progress
  if (variant === 'linear') {
    return (
      <div className={clsx('w-full', className)} {...props}>
        {(label || showValue) && (
          <div className="flex justify-between mb-1">
            {label && (
              <span className="text-sm font-medium text-dark-slate">
                {label}
              </span>
            )}
            {showValue && (
              <span className="text-sm font-medium text-dark-slate">
                {normalizedValue}%
              </span>
            )}
          </div>
        )}

        <div
          className={clsx(
            'overflow-hidden rounded-full',
            variantSize,
            variantColor.track
          )}
        >
          {indeterminate ? (
            <motion.div
              className={clsx('h-full rounded-full', variantColor.base)}
              animate={{
                x: ['-100%', '100%'],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                },
              }}
              style={{ width: '50%' }}
            />
          ) : (
            <motion.div
              className={clsx('h-full rounded-full', variantColor.base)}
              initial={{ width: 0 }}
              animate={{ width: `${normalizedValue}%` }}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>
      </div>
    );
  }

  // Circular Progress
  const center = 16;
  const radius = 16 - thickness / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset =
    circumference - (normalizedValue / 100) * circumference;

  return (
    <div
      className={clsx(
        'relative inline-flex items-center justify-center',
        variantSize,
        className
      )}
      {...props}
    >
      <svg className="w-full h-full -rotate-90">
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={thickness}
          className={clsx('fill-none', variantColor.track)}
        />

        {indeterminate ? (
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={thickness}
            className={clsx('fill-none', variantColor.base)}
            animate={{
              rotate: [0, 360],
              strokeDashoffset: [0, circumference],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              strokeDasharray: circumference,
            }}
          />
        ) : (
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={thickness}
            className={clsx('fill-none', variantColor.base)}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.3 }}
            style={{
              strokeDasharray: circumference,
            }}
          />
        )}
      </svg>

      {showValue && !indeterminate && (
        <span className="absolute text-sm font-medium text-dark-slate">
          {normalizedValue}%
        </span>
      )}
    </div>
  );
}
