import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-xl border border-border-color bg-white p-6',
        'shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]',
        'hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)] transition-shadow duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
