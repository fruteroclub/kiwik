"use client";

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/app/components/DemoComponents';
import { LandingIcon } from '@/app/components/LandingComponents';
import type { FrameError } from '@/app/types/minikit';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: FrameError, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class FrameErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Frame Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Call the onError callback if provided
    if (this.props.onError) {
      const frameError: FrameError = {
        code: 'FRAME_BOUNDARY_ERROR',
        message: error.message,
        recoverable: true,
        retryable: true,
        context: {
          stack: error.stack,
          componentStack: errorInfo.componentStack,
        },
      };
      this.props.onError(frameError, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--app-background)] p-4">
          <div className="max-w-md w-full">
            <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl p-6 border border-[var(--app-card-border)] text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LandingIcon name="zap" className="text-red-600" size="lg" />
                </div>
                <h2 className="text-xl font-bold text-[var(--app-foreground)] mb-2">
                  Oops! Something went wrong
                </h2>
                <p className="text-[var(--app-foreground-muted)] mb-4">
                  We encountered an unexpected error while loading the frame. This might be a temporary issue.
                </p>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-left">
                  <h3 className="text-sm font-semibold text-red-800 dark:text-red-300 mb-2">
                    Development Error Details:
                  </h3>
                  <pre className="text-xs text-red-700 dark:text-red-400 overflow-auto max-h-32">
                    {this.state.error.message}
                  </pre>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <Button
                  variant="primary"
                  onClick={this.handleRetry}
                  className="w-full"
                >
                  Try Again
                </Button>
                
                <Button
                  variant="outline"
                  onClick={this.handleRefresh}
                  className="w-full"
                >
                  Refresh Page
                </Button>
                
                <div className="mt-4 pt-4 border-t border-[var(--app-card-border)]">
                  <p className="text-xs text-[var(--app-foreground-muted)]">
                    If this problem persists, please try refreshing the frame or contact support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Functional component wrapper for easier usage
 */
interface FrameErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
  title?: string;
  message?: string;
  showDetails?: boolean;
}

export function FrameErrorFallback({
  error,
  resetError,
  title = "Something went wrong",
  message = "We encountered an unexpected error. Please try again.",
  showDetails = false
}: FrameErrorFallbackProps) {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl p-6 border border-[var(--app-card-border)]">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-xl">⚠️</span>
          </div>
          
          <h3 className="text-lg font-semibold text-[var(--app-foreground)] mb-2">
            {title}
          </h3>
          
          <p className="text-[var(--app-foreground-muted)] mb-4">
            {message}
          </p>

          {showDetails && error && process.env.NODE_ENV === 'development' && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-left">
              <pre className="text-xs text-red-700 dark:text-red-400 overflow-auto max-h-24">
                {error.message}
              </pre>
            </div>
          )}

          {resetError && (
            <Button
              variant="primary"
              onClick={resetError}
              size="sm"
            >
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}