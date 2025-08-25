import { HTMLAttributes } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

export default function Avatar({
  src,
  alt = '',
  name = '',
  size = 'md',
  className,
  ...props
}: AvatarProps) {
  // Get initials from name (up to 2 characters)
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div
      className={clsx(
        'relative rounded-full bg-electric-blue/10 overflow-hidden',
        'flex items-center justify-center font-medium text-electric-blue',
        'ring-2 ring-white',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src ? (
        <Image
          src={src}
          alt={alt || name}
          fill
          className="object-cover"
          sizes={`(max-width: 768px) ${sizeClasses[size].split(' ')[0]}, ${
            sizeClasses[size].split(' ')[0]
          }`}
        />
      ) : (
        initials || '?'
      )}
    </div>
  );
}
