"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { useFarcasterFrame } from '@/app/hooks/useFarcasterFrame';
import { Button } from '@/app/components/DemoComponents';
import { LandingIcon } from '@/app/components/LandingComponents';

interface AddFrameButtonProps {
  variant?: 'compact' | 'full';
  showBenefits?: boolean;
  className?: string;
}

type FrameState = 'not-saved' | 'saving' | 'saved' | 'error';

export function AddFrameButton({
  variant = 'full',
  showBenefits = false,
  className = ''
}: AddFrameButtonProps) {
  const { frameInfo, frameActions } = useFarcasterFrame();
  const { capabilities, frameAdded, isReady } = frameInfo;
  const { addFrame } = frameActions;

  const [frameState, setFrameState] = useState<FrameState>('not-saved');
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Update frame state based on frameAdded status
  useEffect(() => {
    if (frameAdded) {
      setFrameState('saved');
    }
  }, [frameAdded]);

  // Handle frame addition
  const handleAddFrame = useCallback(async () => {
    if (frameState === 'saving' || !capabilities.canAddFrame) return;
    
    setFrameState('saving');
    setErrorMessage('');
    
    try {
      const result = await addFrame();
      if (result) {
        setFrameState('saved');
        setShowSuccess(true);
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        setFrameState('error');
        setErrorMessage('Failed to save frame. Please try again.');
        
        // Reset to not-saved after error
        setTimeout(() => {
          setFrameState('not-saved');
          setErrorMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error('Failed to add frame:', error);
      setFrameState('error');
      setErrorMessage('An error occurred. Please try again.');
      
      // Reset to not-saved after error
      setTimeout(() => {
        setFrameState('not-saved');
        setErrorMessage('');
      }, 3000);
    }
  }, [frameState, capabilities.canAddFrame, addFrame]);

  // Don't render if frame is already added (unless showing success)
  if (frameAdded && !showSuccess) {
    return null;
  }

  // Don't render if not ready or can't add frame
  if (!isReady || !capabilities.canAddFrame) {
    return null;
  }

  // Compact variant - minimal button
  if (variant === 'compact') {
    return (
      <button
        onClick={handleAddFrame}
        disabled={frameState === 'saving'}
        className={`group relative flex items-center gap-2 px-3 py-2 text-sm font-medium transition-all ${className} ${
          frameState === 'saving' 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:scale-105 active:scale-95'
        }`}
        aria-label="Save kiwik to your mini apps"
      >
        {/* Background glow effect */}
        <div className="absolute inset-0 rounded-lg bg-[var(--app-accent)] opacity-20 blur-lg group-hover:opacity-30 transition-opacity" />
        
        {/* Button content */}
        <div className="relative flex items-center gap-2">
          {frameState === 'saving' ? (
            <>
              <div className="w-4 h-4 border-2 border-[var(--app-accent)] border-t-transparent rounded-full animate-spin" />
              <span className="text-[var(--app-accent)]">Saving...</span>
            </>
          ) : showSuccess ? (
            <>
              <span className="text-green-600 animate-fade-in">✓ Saved!</span>
            </>
          ) : frameState === 'error' ? (
            <>
              <span className="text-red-600">✕ Error</span>
            </>
          ) : (
            <>
              <span className="text-[var(--app-accent)]">+ Save Frame</span>
            </>
          )}
        </div>
      </button>
    );
  }

  // Full variant - detailed button with benefits
  return (
    <div className={`space-y-3 ${className}`}>
      {/* Main button */}
      <div className="bg-[var(--app-card-bg)] rounded-lg p-4 border border-[var(--app-card-border)] hover:border-[var(--app-accent)] transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-base font-medium text-[var(--app-foreground)] flex items-center gap-2">
              <LandingIcon name="sparkles" className="text-[var(--app-accent)]" size="sm" />
              Save kiwik to Your Apps
            </h3>
            <p className="text-sm text-[var(--app-foreground-muted)] mt-1">
              Get notifications and quick access from Farcaster
            </p>
          </div>
          
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddFrame}
            disabled={frameState === 'saving'}
            className="ml-4"
          >
            {frameState === 'saving' ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </div>
            ) : showSuccess ? (
              <div className="flex items-center gap-2">
                <span>✓ Saved!</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>+ Save Frame</span>
              </div>
            )}
          </Button>
        </div>

        {/* Benefits section */}
        {showBenefits && (
          <div className="mt-4 pt-4 border-t border-[var(--app-card-border)]">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-start gap-2">
                <LandingIcon name="zap" className="text-[var(--app-accent)] mt-0.5" size="sm" />
                <div>
                  <p className="text-sm font-medium text-[var(--app-foreground)]">Quick Access</p>
                  <p className="text-xs text-[var(--app-foreground-muted)]">Launch instantly from Farcaster</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[var(--app-accent)] mt-0.5">📢</span>
                <div>
                  <p className="text-sm font-medium text-[var(--app-foreground)]">Notifications</p>
                  <p className="text-xs text-[var(--app-foreground-muted)]">Stay updated on your projects</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <LandingIcon name="users" className="text-[var(--app-accent)] mt-0.5" size="sm" />
                <div>
                  <p className="text-sm font-medium text-[var(--app-foreground)]">Community</p>
                  <p className="text-xs text-[var(--app-foreground-muted)]">Connect with builders</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Success message */}
      {showSuccess && (
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800 animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="text-sm text-green-600 font-medium">
              ✓ Frame saved successfully! You can now receive notifications.
            </span>
          </div>
        </div>
      )}

      {/* Error message */}
      {errorMessage && (
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 border border-red-200 dark:border-red-800 animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="text-sm text-red-600">
              ⚠️ {errorMessage}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}