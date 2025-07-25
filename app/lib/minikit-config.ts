import type { MiniKitConfig } from '@/app/types/minikit';

/**
 * MiniKit configuration utility with environment validation
 */

export class MiniKitConfigError extends Error {
  constructor(
    message: string,
    public field: string,
    public recoverable: boolean = true
  ) {
    super(message);
    this.name = 'MiniKitConfigError';
  }
}

export const DEFAULT_CONFIG: MiniKitConfig = {
  apiKey: '',
  projectName: 'kiwik',
  autoInitialize: true,
  retryAttempts: 3,
  retryDelay: 1000,
  debug: process.env.NODE_ENV === 'development',
};

/**
 * Validates required environment variables for MiniKit
 */
export function validateEnvironment(): string[] {
  const errors: string[] = [];
  
  if (!process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY) {
    errors.push('NEXT_PUBLIC_ONCHAINKIT_API_KEY is required for OnchainKit integration');
  }
  
  if (!process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME) {
    errors.push('NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME is required for frame metadata');
  }

  if (!process.env.NEXT_PUBLIC_URL) {
    errors.push('NEXT_PUBLIC_URL is required for frame manifest and callbacks');
  }

  // Validate Farcaster manifest variables if notifications are needed
  const manifestVars = [
    'FARCASTER_HEADER',
    'FARCASTER_PAYLOAD', 
    'FARCASTER_SIGNATURE'
  ];
  
  const missingManifest = manifestVars.filter(varName => !process.env[varName]);
  if (missingManifest.length > 0 && missingManifest.length < manifestVars.length) {
    errors.push('Partial Farcaster manifest configuration detected. All manifest variables are required for notifications.');
  }

  return errors;
}

/**
 * Creates validated MiniKit configuration
 */
export function createMiniKitConfig(overrides: Partial<MiniKitConfig> = {}): MiniKitConfig {
  const errors = validateEnvironment();
  
  if (errors.length > 0) {
    console.warn('MiniKit configuration warnings:', errors);
    
    // Only throw if critical variables are missing AND we're in runtime (not build time)
    const hasCriticalErrors = errors.some(error => 
      error.includes('ONCHAINKIT_API_KEY') || error.includes('PROJECT_NAME')
    );
    
    // Don't throw during build/static generation - only at runtime
    const isBuildTime = process.env.NODE_ENV === 'production' && typeof window === 'undefined';
    
    if (hasCriticalErrors && !isBuildTime) {
      throw new MiniKitConfigError(
        'Critical MiniKit configuration missing: ' + errors.join(', '),
        'environment',
        false
      );
    }
  }

  const config: MiniKitConfig = {
    ...DEFAULT_CONFIG,
    apiKey: process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || '',
    projectName: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || DEFAULT_CONFIG.projectName,
    iconUrl: process.env.NEXT_PUBLIC_ICON_URL,
    splashImageUrl: process.env.NEXT_PUBLIC_SPLASH_IMAGE_URL,
    splashBackgroundColor: process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR,
    ...overrides,
  };

  // Validate final configuration (skip during build time)
  const isBuildTime = process.env.NODE_ENV === 'production' && typeof window === 'undefined';
  
  if (!config.apiKey && !isBuildTime) {
    throw new MiniKitConfigError(
      'OnchainKit API key is required',
      'apiKey',
      false
    );
  }

  if (config.retryAttempts < 0 || config.retryAttempts > 10) {
    throw new MiniKitConfigError(
      'Retry attempts must be between 0 and 10',
      'retryAttempts'
    );
  }

  if (config.retryDelay < 100 || config.retryDelay > 10000) {
    throw new MiniKitConfigError(
      'Retry delay must be between 100ms and 10s',
      'retryDelay'
    );
  }

  return config;
}

/**
 * Checks if running in frame environment
 */
export function isFrameEnvironment(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check for Farcaster frame indicators
  return !!(
    window.parent !== window ||
    window.location !== window.parent?.location ||
    document.referrer.includes('farcaster') ||
    window.navigator.userAgent.includes('Farcaster')
  );
}

/**
 * Gets frame-specific environment information
 */
export function getFrameEnvironmentInfo() {
  if (typeof window === 'undefined') {
    return {
      isFrame: false,
      userAgent: null,
      referrer: null,
      parentOrigin: null,
    };
  }

  return {
    isFrame: isFrameEnvironment(),
    userAgent: window.navigator.userAgent,
    referrer: document.referrer,
    parentOrigin: window.location.ancestorOrigins?.[0] || null,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  };
}

/**
 * Debug logging utility
 */
export function debugLog(message: string, data?: unknown) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[MiniKit Debug] ${message}`, data || '');
  }
}