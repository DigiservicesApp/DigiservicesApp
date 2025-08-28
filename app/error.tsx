'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] text-center">
      <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
      <p className="text-lg mb-8">{error.message}</p>
      <button
        onClick={reset}
        className="inline-block px-6 py-3 text-white bg-[color:var(--md-sys-color-primary)] rounded-lg hover:bg-[color:var(--md-sys-color-primary-hover)] transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
