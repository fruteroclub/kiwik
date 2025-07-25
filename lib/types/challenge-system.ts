/**
 * Challenge System Types for Builder Onboarding
 * Defines the core types for challenge-based skill certification
 */

export enum ChallengeCategory {
  TECHNICAL = 'technical',
  DESIGN = 'design', 
  MARKETING = 'marketing',
  BUSINESS = 'business',
  COMMUNITY = 'community',
  SUSTAINABILITY = 'sustainability'
}

export enum ChallengeLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate', 
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export enum ChallengeStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  ARCHIVED = 'archived'
}

export enum ParticipantStatus {
  APPLIED = 'applied',
  COMMITTED = 'committed',    // Has commitment NFT
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',    // Has proof NFT
  VERIFIED = 'verified'       // Community verified
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: ChallengeCategory;
  level: ChallengeLevel;
  status: ChallengeStatus;
  
  // Challenge parameters
  duration: number; // days
  maxParticipants?: number;
  minCommitmentScore: number;
  
  // Requirements
  prerequisites: string[];
  deliverables: ChallengeDeliverable[];
  skillsRequired: string[];
  skillsGained: string[];
  
  // Rewards & Recognition
  commitmentNFT: NFTMetadata;
  proofNFT: NFTMetadata;
  curriculumWeight: number; // Impact on curriculum score
  
  // Social & Community
  farcasterChannel?: string;
  communityVerification: boolean;
  
  // Admin
  createdBy: string;
  adminAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChallengeDeliverable {
  id: string;
  title: string;
  description: string;
  type: 'github_repo' | 'demo_url' | 'documentation' | 'farcaster_thread' | 'other';
  required: boolean;
  weight: number; // Contribution to completion score
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

export interface ChallengeParticipant {
  walletAddress: string;
  challengeId: string;
  status: ParticipantStatus;
  
  // Commitment phase
  appliedAt: Date;
  commitmentTxHash?: string;
  commitmentNFTTokenId?: number;
  
  // Progress tracking
  startedAt?: Date;
  deliverables: ParticipantDeliverable[];
  progressScore: number; // 0-100
  
  // Completion phase
  completedAt?: Date;
  proofTxHash?: string;
  proofNFTTokenId?: number;
  finalScore: number;
  
  // Community verification
  verifiedAt?: Date;
  verificationVotes: number;
  verifiedBy?: string[];
  
  // Farcaster integration
  farcasterFid?: number;
  progressCasts: string[]; // Cast hashes
}

export interface ParticipantDeliverable {
  deliverableId: string;
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
  submittedAt?: Date;
  content: string; // URL, text, or other content
  approvedBy?: string;
  feedback?: string;
}

export interface BuilderProfile {
  walletAddress: string;
  farcasterFid?: number;
  
  // Curriculum & Skills
  totalChallengesCompleted: number;
  curriculumScore: number;
  skills: BuilderSkill[];
  achievements: BuilderAchievement[];
  
  // NFT Collection
  commitmentNFTs: number[];
  proofNFTs: number[];
  
  // Social Profile
  farcasterHandle?: string;
  portfolioUrl?: string;
  bio?: string;
  
  // Statistics
  averageCompletionTime: number; // days
  communityVerificationRate: number; // %
  streakDays: number;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface BuilderSkill {
  name: string;
  category: ChallengeCategory;
  level: number; // 1-100 proficiency
  verifiedChallenges: string[]; // Challenge IDs that verified this skill
  lastUpdated: Date;
}

export interface BuilderAchievement {
  id: string;
  title: string;
  description: string;
  type: 'streak' | 'completion' | 'community' | 'special';
  unlockedAt: Date;
  nftTokenId?: number;
}

// Challenge Discovery & Filtering
export interface ChallengeFilters {
  categories?: ChallengeCategory[];
  levels?: ChallengeLevel[];
  duration?: {
    min?: number;
    max?: number;
  };
  skillsRequired?: string[];
  hasSpots?: boolean;
  startingSoon?: boolean;
}

export interface ChallengeSearchResult {
  challenges: Challenge[];
  totalCount: number;
  filters: ChallengeFilters;
  recommendedForUser?: string[]; // Challenge IDs
}

// Smart Contract Events
export interface ChallengeEvent {
  type: 'challenge_created' | 'participant_committed' | 'progress_updated' | 'challenge_completed' | 'nft_awarded';
  challengeId: string;
  participantAddress?: string;
  data: Record<string, any>;
  blockNumber: number;
  transactionHash: string;
  timestamp: Date;
}

// API Response Types
export interface ChallengeResponse {
  success: boolean;
  data?: any;
  error?: string;
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
    };
  };
}