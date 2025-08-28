'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
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
