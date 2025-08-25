'use client';
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { clsx } from 'clsx';
import { RiErrorWarningLine } from 'react-icons/ri';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  className?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          className={clsx(
            'p-6 rounded-lg bg-error/5 border border-error/10',
            'flex flex-col items-center justify-center text-center gap-4',
            this.props.className
          )}
          role="alert"
        >
          <RiErrorWarningLine className="w-12 h-12 text-error" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-error">
              Something went wrong
            </h3>
            {this.state.error && (
              <p className="text-sm text-dark-slate/80">
                {this.state.error.message}
              </p>
            )}
          </div>
          <button
            onClick={this.handleReset}
            className={clsx(
              'px-4 py-2 text-sm font-medium rounded-md',
              'bg-error/10 text-error hover:bg-error/20',
              'transition-colors duration-200'
            )}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for easy wrapping
export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) {
  return function WithErrorBoundaryWrapper(props: P) {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}

// Hook for programmatic error throwing (useful for testing)
export function useErrorBoundary() {
  const throwError = (error: Error) => {
    throw error;
  };

  return { throwError };
}

// Optional custom error types
export interface AppError extends Error {
  code?: string;
  details?: unknown;
}

// Utility function to create app-specific errors
export function createAppError(
  message: string,
  code?: string,
  details?: unknown
): AppError {
  const error = new Error(message) as AppError;
  error.code = code;
  error.details = details;
  return error;
}
