/**
 * TypeScript interfaces for MiniKit integration
 */

export type FrameStatus = 'initializing' | 'ready' | 'error' | 'disconnected' | 'connecting';

export type ConnectionStatus = 'connected' | 'disconnected' | 'reconnecting' | 'failed';

export interface FrameState {
  status: FrameStatus;
  isReady: boolean;
  error: string | null;
  retryCount: number;
  lastConnected: Date | null;
}

export interface FrameContext {
  client: {
    added: boolean;
    fid?: number;
    username?: string;
    displayName?: string;
    pfpUrl?: string;
  };
  location: {
    placeId?: string;
    latitude?: number;
    longitude?: number;
  };
  user: {
    fid: number;
    username: string;
    displayName: string;
    pfpUrl: string;
  };
}

export interface FrameCapabilities {
  canSendNotifications: boolean;
  canOpenUrls: boolean;
  canViewProfiles: boolean;
  canAddFrame: boolean;
  hasWalletAccess: boolean;
  supportsPrimaryButton: boolean;
}

export interface MiniKitConfig {
  apiKey: string;
  projectName: string;
  iconUrl?: string;
  splashImageUrl?: string;
  splashBackgroundColor?: string;
  autoInitialize: boolean;
  retryAttempts: number;
  retryDelay: number;
  debug: boolean;
}

export interface NotificationConfig {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  requireUserGesture?: boolean;
}

export interface FrameError {
  code: string;
  message: string;
  recoverable: boolean;
  retryable: boolean;
  context?: Record<string, unknown>;
}

export type FrameEventType = 
  | 'frame_ready'
  | 'frame_added' 
  | 'frame_removed'
  | 'connection_lost'
  | 'connection_restored'
  | 'error'
  | 'focus'
  | 'blur'
  | 'visibility_change';

export interface FrameEvent {
  type: FrameEventType;
  timestamp: Date;
  data?: Record<string, unknown>;
}

export interface MiniKitManagerProps {
  config?: Partial<MiniKitConfig>;
  onStatusChange?: (status: FrameStatus) => void;
  onError?: (error: FrameError) => void;
  onReady?: () => void;
  children: React.ReactNode;
}