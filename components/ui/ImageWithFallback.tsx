import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { RiImageLine, RiAlertLine } from 'react-icons/ri';

interface ImageWithFallbackProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  showLoadingState?: boolean;
  showErrorState?: boolean;
  fallbackComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  aspectRatio?: '1/1' | '4/3' | '16/9' | '21/9';
  rounded?: boolean;
  containerClassName?: string;
}

const aspectRatioClasses = {
  '1/1': 'aspect-square',
  '4/3': 'aspect-[4/3]',
  '16/9': 'aspect-video',
  '21/9': 'aspect-[21/9]',
};

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc,
  showLoadingState = true,
  showErrorState = true,
  fallbackComponent,
  errorComponent,
  aspectRatio,
  rounded = false,
  containerClassName,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setError(true);
    setIsLoading(false);

    // If fallback image is provided, try to load it
    if (fallbackSrc) {
      const img = document.createElement('img');
      img.src = fallbackSrc;
      img.onload = () => {
        setError(false);
      };
    }
  };

  // Default loading state
  const LoadingState = () => (
    <div
      className={clsx(
        'w-full h-full',
        'flex items-center justify-center',
        'bg-slate-100 dark:bg-slate-800',
        'animate-pulse'
      )}
    >
      <RiImageLine className="w-8 h-8 text-slate-400" />
    </div>
  );

  // Default error state
  const ErrorState = () => (
    <div
      className={clsx(
        'w-full h-full',
        'flex flex-col items-center justify-center gap-2',
        'bg-error/5 text-error'
      )}
    >
      <RiAlertLine className="w-8 h-8" />
      <span className="text-sm">Failed to load image</span>
    </div>
  );

  return (
    <div
      className={clsx(
        'relative overflow-hidden',
        aspectRatio && aspectRatioClasses[aspectRatio],
        rounded && 'rounded-lg',
        containerClassName
      )}
    >
      <AnimatePresence mode="wait">
        {isLoading && showLoadingState && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            {fallbackComponent || <LoadingState />}
          </motion.div>
        )}

        {error && showErrorState && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            {errorComponent || <ErrorState />}
          </motion.div>
        )}

        {!error && (
          <motion.div
            key="image"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={error && fallbackSrc ? fallbackSrc : src}
              alt={alt}
              onLoadingComplete={handleLoad}
              onError={handleError}
              className={clsx(
                'w-full h-full',
                aspectRatio ? 'object-cover' : 'object-contain',
                className
              )}
              {...props}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Lazy loaded image component
interface LazyImageProps extends ImageWithFallbackProps {
  threshold?: number;
}

export function LazyImage({ threshold = 0.1, ...props }: LazyImageProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={props.containerClassName}
      ref={(el) => {
        if (!el) return;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.disconnect();
            }
          },
          { threshold }
        );

        observer.observe(el);
      }}
    >
      {isVisible ? (
        <ImageWithFallback {...props} />
      ) : (
        <div
          className={clsx(
            'w-full',
            props.aspectRatio && aspectRatioClasses[props.aspectRatio],
            'bg-slate-100 dark:bg-slate-800'
          )}
        />
      )}
    </div>
  );
}

// Image grid component
interface ImageGridProps {
  images: Array<Omit<ImageWithFallbackProps, 'containerClassName'>>;
  columns?: number;
  gap?: number;
  aspectRatio?: ImageWithFallbackProps['aspectRatio'];
  className?: string;
}

export function ImageGrid({
  images,
  columns = 3,
  gap = 4,
  aspectRatio = '1/1',
  className,
}: ImageGridProps) {
  return (
    <div
      className={clsx('grid gap-4', `grid-cols-${columns}`, className)}
      style={{ gap: `${gap}px` }}
    >
      {images.map((image, index) => (
        <ImageWithFallback key={index} {...image} aspectRatio={aspectRatio} />
      ))}
    </div>
  );
}
