import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';
import Avatar, { AvatarProps } from './Avatar';

interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  avatars: Array<Omit<AvatarProps, 'size'>>;
  size?: AvatarProps['size'];
  max?: number;
  className?: string;
}

export default function AvatarGroup({
  avatars,
  size = 'md',
  max = 4,
  className,
  ...props
}: AvatarGroupProps) {
  const displayAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div className={clsx('flex items-center -space-x-2', className)} {...props}>
      {displayAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          {...avatar}
          size={size}
          className={clsx(
            'transition-transform hover:translate-x-1',
            avatar.className
          )}
        />
      ))}

      {remainingCount > 0 && (
        <div
          className={clsx(
            'relative rounded-full bg-light-accent',
            'flex items-center justify-center font-medium text-dark-slate',
            'ring-2 ring-white',
            {
              'h-8 w-8 text-xs': size === 'sm',
              'h-10 w-10 text-sm': size === 'md',
              'h-12 w-12 text-base': size === 'lg',
              'h-16 w-16 text-lg': size === 'xl',
            }
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
