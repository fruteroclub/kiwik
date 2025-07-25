"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  useMiniKit,
  useAddFrame,
  useOpenUrl,
  useClose,
  useNotification,
  useViewProfile,
  usePrimaryButton
} from '@coinbase/onchainkit/minikit';
import { useMiniKitManager } from '@/app/components/MiniKitManager';
import type { 
  FrameContext, 
  FrameCapabilities, 
  ConnectionStatus,
  NotificationConfig,
  FrameEventType,
  FrameEvent
} from '@/app/types/minikit';
import { debugLog } from '@/app/lib/minikit-config';

/**
 * Enhanced frame information interface
 */
export interface FrameInfo {
  isReady: boolean;
  connectionStatus: ConnectionStatus;
  context: FrameContext | null;
  capabilities: FrameCapabilities;
  userInfo: {
    fid?: number;
    username?: string;
    displayName?: string;
    pfpUrl?: string;
  } | null;
  frameAdded: boolean;
  lastActivity: Date | null;
}

/**
 * Frame action handlers interface
 */
export interface FrameActions {
  addFrame: () => Promise<{ url?: string; token?: string } | null>;
  openUrl: (url: string) => void;
  closeFrame: () => void;
  sendNotification: (config: NotificationConfig) => Promise<void>;
  viewProfile: (fid?: number) => void;
  setPrimaryButton: (config: { text: string }, callback: () => void) => void;
  clearPrimaryButton: () => void;
  refreshFrame: () => Promise<void>;
}

/**
 * Primary hook for Farcaster Frame integration
 * Provides comprehensive frame state management and actions
 */
export function useFarcasterFrame() {
  const { context } = useMiniKit();
  const { frameState, refreshFrame, addEventListener, sendEvent } = useMiniKitManager();
  
  // Native MiniKit hooks
  const addFrameHook = useAddFrame();
  const openUrlHook = useOpenUrl();
  const closeHook = useClose();
  const notificationHook = useNotification();
  const viewProfileHook = useViewProfile();
  const primaryButtonHook = usePrimaryButton;

  // Local state
  const [frameAdded, setFrameAdded] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [lastActivity, setLastActivity] = useState<Date | null>(null);
  const [capabilities, setCapabilities] = useState<FrameCapabilities>({
    canSendNotifications: false,
    canOpenUrls: false,
    canViewProfiles: false,
    canAddFrame: false,
    hasWalletAccess: false,
    supportsPrimaryButton: false,
  });

  // Refs for managing primary button
  const primaryButtonConfigRef = useRef<{ text: string; callback: () => void } | null>(null);

  /**
   * Updates connection status based on frame state
   */
  useEffect(() => {
    const updateConnectionStatus = () => {
      switch (frameState.status) {
        case 'ready':
          setConnectionStatus('connected');
          setLastActivity(new Date());
          break;
        case 'connecting':
        case 'initializing':
          setConnectionStatus('reconnecting');
          break;
        case 'error':
          setConnectionStatus('failed');
          break;
        default:
          setConnectionStatus('disconnected');
      }
    };

    updateConnectionStatus();
  }, [frameState.status]);

  /**
   * Updates capabilities based on context and environment
   */
  useEffect(() => {
    const updateCapabilities = () => {
      const hasContext = !!context;
      const isConnected = connectionStatus === 'connected';
      
      setCapabilities({
        canSendNotifications: hasContext && context?.client?.added === true,
        canOpenUrls: isConnected && typeof openUrlHook === 'function',
        canViewProfiles: isConnected && typeof viewProfileHook === 'function',
        canAddFrame: isConnected && typeof addFrameHook === 'function',
        hasWalletAccess: hasContext && isConnected,
        supportsPrimaryButton: isConnected && typeof primaryButtonHook === 'function',
      });

      debugLog('Updated frame capabilities', {
        hasContext,
        isConnected,
        clientAdded: context?.client?.added,
      });
    };

    updateCapabilities();
  }, [context, connectionStatus, addFrameHook, openUrlHook, viewProfileHook, notificationHook, primaryButtonHook]);

  /**
   * Monitor frame added status
   */
  useEffect(() => {
    if (context?.client?.added !== undefined) {
      setFrameAdded(context.client.added);
      debugLog('Frame added status changed', { added: context.client.added });
    }
  }, [context?.client?.added]);

  /**
   * Enhanced add frame function
   */
  const addFrame = useCallback(async () => {
    if (!capabilities.canAddFrame) {
      debugLog('Cannot add frame - capability not available');
      return null;
    }

    try {
      debugLog('Adding frame');
      const result = await addFrameHook();
      
      if (result) {
        setFrameAdded(true);
        setLastActivity(new Date());
        sendEvent('frame_added', { result });
        debugLog('Frame added successfully', result);
      }
      
      return result;
    } catch (error) {
      debugLog('Failed to add frame', { error });
      return null;
    }
  }, [capabilities.canAddFrame, addFrameHook, sendEvent]);

  /**
   * Enhanced open URL function
   */
  const openUrl = useCallback((url: string) => {
    if (!capabilities.canOpenUrls) {
      debugLog('Cannot open URL - capability not available');
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      debugLog('Invalid URL provided', { url });
      return;
    }

    debugLog('Opening URL', { url });
    setLastActivity(new Date());
    openUrlHook(url);
  }, [capabilities.canOpenUrls, openUrlHook]);

  /**
   * Enhanced close frame function
   */
  const closeFrame = useCallback(() => {
    debugLog('Closing frame');
    setLastActivity(new Date());
    sendEvent('frame_removed');
    closeHook();
  }, [closeHook, sendEvent]);

  /**
   * Enhanced notification function
   */
  const sendNotification = useCallback(async (config: NotificationConfig) => {
    if (!capabilities.canSendNotifications) {
      throw new Error('Notifications not available - frame must be added first');
    }

    debugLog('Sending notification', config);
    setLastActivity(new Date());
    
    try {
      await notificationHook(config);
      debugLog('Notification sent successfully');
    } catch (error) {
      debugLog('Failed to send notification', { error });
      throw error;
    }
  }, [capabilities.canSendNotifications, notificationHook]);

  /**
   * Enhanced view profile function
   */
  const viewProfile = useCallback((fid?: number) => {
    if (!capabilities.canViewProfiles) {
      debugLog('Cannot view profile - capability not available');
      return;
    }

    debugLog('Viewing profile', { fid });
    setLastActivity(new Date());
    
    if (fid) {
      viewProfileHook(fid);
    } else {
      viewProfileHook();
    }
  }, [capabilities.canViewProfiles, viewProfileHook]);

  /**
   * Enhanced primary button function
   */
  const setPrimaryButton = useCallback((config: { text: string }, callback: () => void) => {
    if (!capabilities.supportsPrimaryButton) {
      debugLog('Cannot set primary button - capability not available');
      return;
    }

    debugLog('Setting primary button', config);
    primaryButtonConfigRef.current = { text: config.text, callback };
    
    // Call the hook with the configuration
    primaryButtonHook(config, callback);
  }, [capabilities.supportsPrimaryButton, primaryButtonHook]);

  /**
   * Clear primary button
   */
  const clearPrimaryButton = useCallback(() => {
    debugLog('Clearing primary button');
    primaryButtonConfigRef.current = null;
    // Note: OnchainKit doesn't provide a clear method, so we set empty config
    if (capabilities.supportsPrimaryButton) {
      primaryButtonHook({ text: '' }, () => {});
    }
  }, [capabilities.supportsPrimaryButton, primaryButtonHook]);

  /**
   * Event listener management
   */
  const addFrameEventListener = useCallback((
    type: FrameEventType,
    callback: (event: FrameEvent) => void
  ) => {
    return addEventListener(type, callback);
  }, [addEventListener]);

  /**
   * Frame info object
   */
  const frameInfo: FrameInfo = {
    isReady: frameState.isReady,
    connectionStatus,
    context: context as FrameContext | null,
    capabilities,
    userInfo: context?.user || null,
    frameAdded,
    lastActivity,
  };

  /**
   * Frame actions object
   */
  const frameActions: FrameActions = {
    addFrame,
    openUrl,
    closeFrame,
    sendNotification,
    viewProfile,
    setPrimaryButton,
    clearPrimaryButton,
    refreshFrame,
  };

  return {
    frameInfo,
    frameActions,
    addEventListener: addFrameEventListener,
    sendEvent,
    // Expose raw frame state for advanced usage
    rawFrameState: frameState,
    rawContext: context,
  };
}