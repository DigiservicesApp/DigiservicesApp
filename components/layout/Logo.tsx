'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { companyInfo } from '@/lib/data/site-config';

interface LogoProps {
  size?: number; // pixel height
  className?: string;
}

export default function Logo({ size = 100, className }: LogoProps) {
  const logo = companyInfo.logo as string | { src?: string } | undefined;
  const alt = companyInfo.name || 'Site';

  // logo may be a string (src) or an object with { src }
  const src =
    typeof logo === 'string'
      ? logo
      : logo && 'src' in logo
      ? logo.src
      : undefined;

  const [imgError, setImgError] = useState(false);

  // Probe the image with a native Image() to catch 404s even when
  // next/image may not forward onError in some environments.
  useEffect(() => {
    if (!src) return;
    setImgError(false);
    const probe = new window.Image();
    probe.src = src;
    const handleLoad = () => setImgError(false);
    const handleError = () => setImgError(true);
    probe.onload = handleLoad;
    probe.onerror = handleError;
    return () => {
      // cleanup handlers
      probe.onload = null;
      probe.onerror = null;
    };
  }, [src]);

  if (src && !imgError) {
    return (
      <Link
        href="/"
        className={`inline-flex items-center gap-3 ${className || ''}`}
      >
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="rounded-md object-contain w-56 h-auto "
          onError={() => setImgError(true)}
          onLoad={() => setImgError(false)}
        />
      </Link>
    );
  }

  // Fallback: company name when image not available or failed to load
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 ${className || ''}`}
    >
      <span className="text-lg font-bold text-[color:var(--md-sys-color-primary)]">
        {companyInfo.name}
      </span>
    </Link>
  );
}
