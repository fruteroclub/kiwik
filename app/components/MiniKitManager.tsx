"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import type { 
  FrameState, 
  FrameError, 
  MiniKitManagerProps,
  FrameEvent,
  FrameEventType
} from '@/app/types/minikit';
import { createMiniKitConfig, debugLog, isFrameEnvironment } from '@/app/lib/minikit-config';

/**
 * MiniKit Manager Context
 */
interface MiniKitManagerContext {
  frameState: FrameState;
  refreshFrame: () => Promise<void>;
  isFrameEnvironment: boolean;
  addEventListener: (type: FrameEventType, callback: (event: FrameEvent) => void) => () => void;
  sendEvent: (type: FrameEventType, data?: Record<string, unknown>) => void;
}

const MiniKitContext = createContext<MiniKitManagerContext | null>(null);

/**
 * Custom hook to access MiniKit Manager context
 */
export function useMiniKitManager() {
  const context = useContext(MiniKitContext);
  if (!context) {
    throw new Error('useMiniKitManager must be used within a MiniKitManager');
  }
  return context;
}

/**
 * MiniKit Manager Component
 * Handles comprehensive MiniKit lifecycle and state management
 */
export function MiniKitManager({ 
  config: configOverrides = {},
  onStatusChange,
  onError,
  onReady,
  children 
}: MiniKitManagerProps) {
  const config = createMiniKitConfig(configOverrides);
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  
  // State management
  const [frameState, setFrameState] = useState<FrameState>({
    status: 'initializing',
    isReady: false,
    error: null,
    retryCount: 0,
    lastConnected: null,
  });

  // Refs for managing timers and event listeners
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const eventListenersRef = useRef<Map<FrameEventType, Set<(event: FrameEvent) => void>>>(new Map());
  const initializationAttemptedRef = useRef(false);

  /**
   * Updates frame state and triggers callbacks
   */
  const updateFrameState = useCallback((updates: Partial<FrameState>) => {
    debugLog('Updating frame state', updates);
    
    setFrameState(prevState => {
      const newState = { ...prevState, ...updates };
      
      // Trigger status change callback
      if (updates.status && updates.status !== prevState.status) {
        onStatusChange?.(updates.status);
        
        // Trigger ready callback
        if (updates.status === 'ready' && !prevState.isReady) {
          onReady?.();
        }
      }
      
      // Trigger error callback
      if (updates.error && updates.error !== prevState.error) {
        const frameError: FrameError = {
          code: 'FRAME_ERROR',
          message: updates.error,
          recoverable: true,
          retryable: true,
        };
        onError?.(frameError);
      }
      
      return newState;
    });
  }, [onStatusChange, onError, onReady]);

  /**
   * Sends events to registered listeners
   */
  const sendEvent = useCallback((type: FrameEventType, data?: Record<string, unknown>) => {
    const event: FrameEvent = {
      type,
      timestamp: new Date(),
      data,
    };
    
    debugLog(`Sending event: ${type}`, event);
    
    const listeners = eventListenersRef.current.get(type);
    if (listeners) {
      listeners.forEach(callback => {
        try {
          callback(event);
        } catch (error) {
          console.error(`Error in event listener for ${type}:`, error);
        }
      });
    }
  }, []);

  /**
   * Adds event listener and returns cleanup function
   */
  const addEventListener = useCallback((
    type: FrameEventType, 
    callback: (event: FrameEvent) => void
  ) => {
    if (!eventListenersRef.current.has(type)) {
      eventListenersRef.current.set(type, new Set());
    }
    
    eventListenersRef.current.get(type)!.add(callback);
    
    // Return cleanup function
    return () => {
      eventListenersRef.current.get(type)?.delete(callback);
    };
  }, []);

  /**
   * Initializes the MiniKit frame
   */
  const initializeFrame = useCallback(async () => {
    if (initializationAttemptedRef.current) return;
    initializationAttemptedRef.current = true;

    debugLog('Initializing MiniKit frame', { config, isFrameEnvironment: isFrameEnvironment() });
    
    updateFrameState({ 
      status: 'connecting',
      error: null 
    });

    sendEvent('frame_ready');

    try {
      if (!isFrameReady) {
        debugLog('Setting frame ready');
        setFrameReady();
      }

      // Wait for frame to be ready with timeout
      const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Frame initialization timeout')), 10000)
      );

      const frameReadyPromise = new Promise<void>((resolve) => {
        if (isFrameReady) {
          resolve();
        } else {
          const checkReady = () => {
            if (isFrameReady) {
              resolve();
            } else {
              setTimeout(checkReady, 100);
            }
          };
          checkReady();
        }
      });

      await Promise.race([frameReadyPromise, timeout]);

      updateFrameState({
        status: 'ready',
        isReady: true,
        lastConnected: new Date(),
        retryCount: 0,
      });

      debugLog('Frame initialization successful');
      sendEvent('connection_restored');

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown initialization error';
      debugLog('Frame initialization failed', { error: errorMessage });
      
      updateFrameState({
        status: 'error',
        isReady: false,
        error: errorMessage,
      });

      sendEvent('error', { error: errorMessage });
      
      // Schedule retry if configured
      if (frameState.retryCount < config.retryAttempts) {
        scheduleRetry();
      }
    }
  }, [isFrameReady, setFrameReady, config, frameState.retryCount, updateFrameState, sendEvent]);

  /**
   * Schedules a retry attempt
   */
  const scheduleRetry = useCallback(() => {
    if (frameState.retryCount >= config.retryAttempts) {
      debugLog('Max retry attempts reached');
      return;
    }

    const delay = config.retryDelay * Math.pow(2, frameState.retryCount); // Exponential backoff
    debugLog(`Scheduling retry in ${delay}ms (attempt ${frameState.retryCount + 1})`);

    retryTimeoutRef.current = setTimeout(() => {
      updateFrameState({ 
        retryCount: frameState.retryCount + 1,
        status: 'connecting' 
      });
      
      initializationAttemptedRef.current = false; // Allow retry
      initializeFrame();
    }, delay);
  }, [frameState.retryCount, config.retryAttempts, config.retryDelay, updateFrameState, initializeFrame]);

  /**
   * Manual frame refresh
   */
  const refreshFrame = useCallback(async () => {
    debugLog('Manual frame refresh requested');
    
    // Clear any pending retries
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }

    // Reset state and reinitialize
    updateFrameState({
      status: 'initializing',
      isReady: false,
      error: null,
      retryCount: 0,
    });

    initializationAttemptedRef.current = false;
    await initializeFrame();
  }, [updateFrameState, initializeFrame]);

  /**
   * Auto-initialize on mount if configured
   */
  useEffect(() => {
    if (config.autoInitialize && !initializationAttemptedRef.current) {
      debugLog('Auto-initializing MiniKit');
      initializeFrame();
    }
  }, [config.autoInitialize, initializeFrame]);

  /**
   * Monitor frame ready state changes
   */
  useEffect(() => {
    if (isFrameReady && frameState.status !== 'ready') {
      debugLog('Frame ready state changed to true');
      updateFrameState({
        status: 'ready',
        isReady: true,
        lastConnected: new Date(),
        error: null,
      });
    }
  }, [isFrameReady, frameState.status, updateFrameState]);

  /**
   * Monitor context changes
   */
  useEffect(() => {
    if (context) {
      debugLog('Frame context updated', context);
      sendEvent('frame_added', { context });
    }
  }, [context, sendEvent]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      eventListenersRef.current.clear();
    };
  }, []);

  /**
   * Handle visibility changes
   */
  useEffect(() => {
    const handleVisibilityChange = () => {
      debugLog('Visibility changed', { hidden: document.hidden });
      sendEvent('visibility_change', { hidden: document.hidden });
      
      if (document.hidden) {
        sendEvent('blur');
      } else {
        sendEvent('focus');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [sendEvent]);

  const contextValue: MiniKitManagerContext = {
    frameState,
    refreshFrame,
    isFrameEnvironment: isFrameEnvironment(),
    addEventListener,
    sendEvent,
  };

  return (
    <MiniKitContext.Provider value={contextValue}>
      {children}
    </MiniKitContext.Provider>
  );
}