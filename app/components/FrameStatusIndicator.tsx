"use client";

import React from 'react';
import { useFarcasterFrame } from '@/app/hooks/useFarcasterFrame';

interface FrameStatusIndicatorProps {
  showText?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig = {
  connected: {
    color: 'bg-green-500',
    text: 'Connected',
    icon: '●',
  },
  disconnected: {
    color: 'bg-red-500', 
    text: 'Disconnected',
    icon: '●',
  },
  reconnecting: {
    color: 'bg-yellow-500',
    text: 'Connecting...',
    icon: '◐',
  },
  failed: {
    color: 'bg-red-600',
    text: 'Connection Failed',
    icon: '✕',
  },
};

const sizeConfig = {
  sm: {
    dot: 'w-2 h-2',
    text: 'text-xs',
    gap: 'gap-1',
  },
  md: {
    dot: 'w-3 h-3',
    text: 'text-sm',
    gap: 'gap-2',
  },
  lg: {
    dot: 'w-4 h-4',
    text: 'text-base',
    gap: 'gap-2',
  },
};

export function FrameStatusIndicator({ 
  showText = false, 
  className = '',
  size = 'md'
}: FrameStatusIndicatorProps) {
  const { frameInfo } = useFarcasterFrame();
  const { connectionStatus } = frameInfo;
  
  const status = statusConfig[connectionStatus];
  const sizeStyles = sizeConfig[size];
  
  const isAnimating = connectionStatus === 'reconnecting';

  return (
    <div className={`flex items-center ${sizeStyles.gap} ${className}`}>
      <div 
        className={`
          ${sizeStyles.dot} 
          ${status.color} 
          rounded-full 
          ${isAnimating ? 'animate-pulse' : ''}
        `}
        title={status.text}
      />
      {showText && (
        <span className={`${sizeStyles.text} text-[var(--app-foreground-muted)]`}>
          {status.text}
        </span>
      )}
    </div>
  );
}