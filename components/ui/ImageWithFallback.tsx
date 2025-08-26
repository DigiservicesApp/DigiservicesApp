'use client';

import React from 'react';
import Image, { type ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

export interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  fallbackAlt?: string;
  fallbackClassName?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = '/placeholder-image.png',
  fallbackAlt,
  className,
  fallbackClassName,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = React.useState<boolean>(false);

  return (
    <>
      {!error ? (
        <Image
          className={className}
          src={src}
          alt={alt}
          onError={() => setError(true)}
          {...props}
        />
      ) : (
        <Image
          className={cn(className, fallbackClassName)}
          src={fallbackSrc}
          alt={fallbackAlt ?? alt}
          {...props}
        />
      )}
    </>
  );
}

// Usage example:
/*
import { ImageWithFallback } from './ImageWithFallback.new';

function Example() {
  return (
    <ImageWithFallback
      src="/path/to/image.jpg"
      alt="Main Image"
      fallbackSrc="/path/to/fallback.jpg"
      fallbackAlt="Fallback Image"
      width={300}
      height={200}
      className="rounded-lg"
      fallbackClassName="opacity-50"
    />
  );
}

// Basic usage
<ImageWithFallback
  src="/image.jpg"
  alt="Image"
  width={200}
  height={200}
/>

// With custom fallback
<ImageWithFallback
  src="/image.jpg"
  alt="Image"
  fallbackSrc="/custom-fallback.jpg"
  fallbackAlt="Custom Fallback"
  width={200}
  height={200}
/>

// With different styles for main and fallback
<ImageWithFallback
  src="/image.jpg"
  alt="Image"
  className="rounded-lg shadow-md"
  fallbackClassName="opacity-50 grayscale"
  width={200}
  height={200}
/>

// As a responsive image
<ImageWithFallback
  src="/image.jpg"
  alt="Image"
  className="w-full h-auto"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  fill
/>
*/
