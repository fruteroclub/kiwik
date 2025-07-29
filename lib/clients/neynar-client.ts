// SERVER-SIDE ONLY - Do not import in client components
import { NeynarAPIClient, Configuration } from '@neynar/nodejs-sdk';

interface NeynarUser {
  fid: number;
  username: string;
  display_name: string;
  pfp_url: string;
  custody_address: string;
  profile?: {
    bio?: {
      text: string;
    };
  };
  follower_count: number;
  following_count: number;
  power_badge: boolean;
  verified_addresses?: {
    eth_addresses: string[];
    sol_addresses: string[];
  };
}

interface NeynarUserEnriched {
  farcasterId: string;
  farcasterUsername: string;
  displayName: string;
  bio?: string;
  avatarUrl: string;
  farcasterCustody: string;
  farcasterVerified: boolean;
  followerCount: number;
  followingCount: number;
  powerBadge: boolean;
  verifiedAddresses: {
    eth: string[];
    sol: string[];
  };
}

class NeynarClient {
  private client: NeynarAPIClient | null = null;
  private initialized = false;
  private rateLimitPerMinute: number;
  private requestCount = 0;
  private requestResetTime: number = Date.now() + 60000;

  constructor() {
    this.rateLimitPerMinute = parseInt(process.env.NEYNAR_RATE_LIMIT_PER_MINUTE || '300');
    this.initialize();
  }

  private initialize() {
    try {
      const apiKey = process.env.NEYNAR_API_KEY;
      
      if (!apiKey || apiKey === 'your_neynar_api_key') {
        console.warn('Neynar API key not configured. User enrichment will be disabled.');
        this.initialized = false;
        return;
      }

      // Create Configuration object for SDK v2
      const config = new Configuration({
        apiKey: apiKey,
        baseOptions: {
          headers: {
            'x-neynar-experimental': true,
          },
        },
      });

      this.client = new NeynarAPIClient(config);
      this.initialized = true;
      console.log('Neynar client initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Neynar client:', error);
      this.initialized = false;
    }
  }

  private async checkRateLimit(): Promise<boolean> {
    const now = Date.now();
    
    // Reset counter if minute has passed
    if (now > this.requestResetTime) {
      this.requestCount = 0;
      this.requestResetTime = now + 60000;
    }

    // Check if we're at the limit
    if (this.requestCount >= this.rateLimitPerMinute) {
      console.warn('Neynar rate limit reached. Waiting for reset.');
      return false;
    }

    this.requestCount++;
    return true;
  }

  async getUserByFid(fid: number): Promise<NeynarUser | null> {
    if (!this.initialized || !this.client) {
      console.warn('Neynar client not initialized. Cannot fetch user by FID.');
      return null;
    }

    if (!(await this.checkRateLimit())) {
      return null;
    }

    try {
      const response = await this.client.fetchBulkUsers({ fids: [fid] });
      const users = response.users as NeynarUser[];
      
      if (!users || users.length === 0) {
        console.log(`No user found for FID: ${fid}`);
        return null;
      }

      return users[0];
    } catch (error) {
      console.error(`Error fetching user by FID ${fid}:`, error);
      return null;
    }
  }

  async getUserByWalletAddress(address: string): Promise<NeynarUser | null> {
    if (!this.initialized || !this.client) {
      console.warn('Neynar client not initialized. Cannot fetch user by wallet.');
      return null;
    }

    if (!(await this.checkRateLimit())) {
      return null;
    }

    try {
      const response = await this.client.fetchBulkUsersByEthOrSolAddress({ addresses: [address] });
      const addressData = response[address.toLowerCase()];
      
      if (!addressData || addressData.length === 0) {
        console.log(`No user found for wallet address: ${address}`);
        return null;
      }

      return addressData[0] as NeynarUser;
    } catch (error) {
      console.error(`Error fetching user by wallet ${address}:`, error);
      return null;
    }
  }

  async enrichUserProfile(fid: number): Promise<NeynarUserEnriched | null> {
    const user = await this.getUserByFid(fid);
    if (!user) return null;

    try {
      return {
        farcasterId: user.fid.toString(),
        farcasterUsername: user.username,
        displayName: user.display_name || user.username,
        bio: user.profile?.bio?.text,
        avatarUrl: user.pfp_url,
        farcasterCustody: user.custody_address,
        farcasterVerified: (user.verified_addresses?.eth_addresses?.length || 0) > 0,
        followerCount: user.follower_count || 0,
        followingCount: user.following_count || 0,
        powerBadge: user.power_badge || false,
        verifiedAddresses: {
          eth: user.verified_addresses?.eth_addresses || [],
          sol: user.verified_addresses?.sol_addresses || []
        }
      };
    } catch (error) {
      console.error('Error enriching user profile:', error);
      return null;
    }
  }

  async enrichUserProfileByWallet(address: string): Promise<NeynarUserEnriched | null> {
    const user = await this.getUserByWalletAddress(address);
    if (!user) return null;

    return this.enrichUserProfile(user.fid);
  }

  // Health check method
  isAvailable(): boolean {
    return this.initialized;
  }

  // Get current rate limit status
  getRateLimitStatus(): { remaining: number; resetTime: Date } {
    const now = Date.now();
    
    if (now > this.requestResetTime) {
      this.requestCount = 0;
      this.requestResetTime = now + 60000;
    }

    return {
      remaining: Math.max(0, this.rateLimitPerMinute - this.requestCount),
      resetTime: new Date(this.requestResetTime)
    };
  }
}

// Export singleton instance
export const neynarClient = new NeynarClient();

// Export types for use in other files
export type { NeynarUser, NeynarUserEnriched };