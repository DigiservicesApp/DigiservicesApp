import React from 'react';
import { clsx } from 'clsx';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'default' | 'light' | 'dark';
  label?: React.ReactNode;
  labelPosition?: 'left' | 'center' | 'right';
  className?: string;
}

const sizeClasses = {
  xs: 'border-[0.5px]',
  sm: 'border-[1px]',
  md: 'border-[1.5px]',
  lg: 'border-2',
};

const colorClasses = {
  default: 'border-slate-200 dark:border-slate-700',
  light: 'border-slate-100 dark:border-slate-800',
  dark: 'border-slate-300 dark:border-slate-600',
};

const variantClasses = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
};

const labelPositionClasses = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

export default function Divider({
  orientation = 'horizontal',
  variant = 'solid',
  size = 'sm',
  color = 'default',
  label,
  labelPosition = 'center',
  className,
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        className={clsx(
          'h-full w-0 mx-2 border-l',
          sizeClasses[size],
          colorClasses[color],
          variantClasses[variant],
          className
        )}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        className={clsx(
          'flex items-center w-full gap-3',
          labelPositionClasses[labelPosition],
          className
        )}
      >
        {labelPosition !== 'right' && (
          <div
            className={clsx(
              'flex-grow border-t',
              sizeClasses[size],
              colorClasses[color],
              variantClasses[variant]
            )}
          />
        )}

        <span
          className={clsx(
            'text-sm font-medium whitespace-nowrap',
            'text-slate-500 dark:text-slate-400'
          )}
        >
          {label}
        </span>

        {labelPosition !== 'left' && (
          <div
            className={clsx(
              'flex-grow border-t',
              sizeClasses[size],
              colorClasses[color],
              variantClasses[variant]
            )}
          />
        )}
      </div>
    );
  }

  return (
    <hr
      role="separator"
      className={clsx(
        'w-full border-t',
        sizeClasses[size],
        colorClasses[color],
        variantClasses[variant],
        className
      )}
    />
  );
}

// Helper components for common use cases
interface SpacerProps {
  size?: number;
  axis?: 'horizontal' | 'vertical';
  className?: string;
}

export function Spacer({
  size = 1,
  axis = 'vertical',
  className,
}: SpacerProps) {
  const width = axis === 'horizontal' ? `${size * 0.25}rem` : undefined;
  const height = axis === 'vertical' ? `${size * 0.25}rem` : undefined;

  return (
    <div
      style={{ width, height, minWidth: width, minHeight: height }}
      className={className}
    />
  );
}

// Section Divider with enhanced styling
interface SectionDividerProps extends Omit<DividerProps, 'label'> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  titlePosition?: 'left' | 'center' | 'right';
}

export function SectionDivider({
  title,
  subtitle,
  titlePosition = 'left',
  ...props
}: SectionDividerProps) {
  if (!title) return <Divider {...props} />;

  return (
    <div className="w-full">
      <div
        className={clsx(
          'flex flex-col mb-2',
          titlePosition === 'center' && 'items-center text-center',
          titlePosition === 'right' && 'items-end text-right'
        )}
      >
        <h3 className="text-lg font-semibold text-dark-slate">{title}</h3>
        {subtitle && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
      <Divider {...props} />
    </div>
  );
}
