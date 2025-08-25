import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  colorScheme?: 'blue' | 'green' | 'red' | 'yellow';
  className?: string;
}

export default function Badge({
  children,
  colorScheme = 'blue',
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={clsx(
        // Base styles
        'inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full',
        'transition-colors duration-100',

        // Color schemes with soft, low-contrast combinations
        {
          // Blue - Electric theme
          'bg-electric-blue/10 text-electric-blue': colorScheme === 'blue',

          // Green - Success theme
          'bg-success/10 text-success': colorScheme === 'green',

          // Red - Error theme
          'bg-error/10 text-error': colorScheme === 'red',

          // Yellow - Warning theme
          'bg-yellow-500/10 text-yellow-700': colorScheme === 'yellow',
        },

        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
