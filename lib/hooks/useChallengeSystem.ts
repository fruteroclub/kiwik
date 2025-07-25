import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Challenge, BuilderProfile, ChallengeFilters, ChallengeCategory, ChallengeLevel, ChallengeStatus } from '@/lib/types/challenge-system';

// Mock data for development - replace with actual API calls
const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Build Your First DeFi Dashboard',
    description: 'Create a comprehensive DeFi dashboard using React, wagmi, and real-time price feeds. Learn to integrate with multiple protocols and display portfolio analytics.',
    category: ChallengeCategory.TECHNICAL,
    level: ChallengeLevel.INTERMEDIATE,
    status: ChallengeStatus.ACTIVE,
    duration: 14,
    maxParticipants: 25,
    spotsAvailable: 18,
    totalSpots: 25,
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-02-15'),
    minCommitmentScore: 7,
    prerequisites: [
      'Basic React knowledge',
      'Understanding of Web3 concepts',
      'Have deployed a smart contract before'
    ],
    deliverables: [
      {
        id: '1-1',
        title: 'GitHub Repository',
        description: 'Complete source code with README and deployment instructions',
        type: 'github_repo',
        required: true,
        weight: 40
      },
      {
        id: '1-2',
        title: 'Live Demo',
        description: 'Working application deployed on Vercel or similar platform',
        type: 'demo_url',
        required: true,
        weight: 30
      },
      {
        id: '1-3',
        title: 'Progress Thread',
        description: 'Daily progress updates shared on Farcaster',
        type: 'farcaster_thread',
        required: false,
        weight: 20
      },
      {
        id: '1-4',
        title: 'Technical Documentation',
        description: 'Architecture decisions and lessons learned',
        type: 'documentation',
        required: true,
        weight: 10
      }
    ],
    skillsRequired: ['React', 'JavaScript', 'Web3'],
    skillsGained: ['DeFi Integration', 'Real-time Data', 'Portfolio Analytics', 'User Experience Design'],
    commitmentNFT: {
      name: 'DeFi Dashboard Builder - Commitment',
      description: 'Commitment to build a comprehensive DeFi dashboard',
      image: '/nft/commitment-defi-dashboard.png',
      attributes: [
        { trait_type: 'Challenge', value: 'DeFi Dashboard' },
        { trait_type: 'Duration', value: 14 },
        { trait_type: 'Level', value: 'Intermediate' }
      ]
    },
    proofNFT: {
      name: 'DeFi Dashboard Builder - Proof',
      description: 'Verified completion of DeFi dashboard challenge',
      image: '/nft/proof-defi-dashboard.png',
      attributes: [
        { trait_type: 'Skill', value: 'DeFi Integration' },
        { trait_type: 'Complexity', value: 'Intermediate' },
        { trait_type: 'Curriculum Points', value: 15 }
      ]
    },
    curriculumWeight: 15,
    farcasterChannel: '/defi-builders',
    communityVerification: true,
    createdBy: 'admin',
    adminAddress: '0x1234...5678',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Design a Sustainable Web3 UX',
    description: 'Create user-centered designs for a regenerative finance application, focusing on accessibility and environmental impact visualization.',
    category: ChallengeCategory.DESIGN,
    level: ChallengeLevel.BEGINNER,
    status: ChallengeStatus.ACTIVE,
    duration: 10,
    maxParticipants: 20,
    spotsAvailable: 15,
    totalSpots: 20,
    startDate: new Date('2024-02-05'),
    endDate: new Date('2024-02-15'),
    minCommitmentScore: 6,
    prerequisites: [
      'Basic design principles knowledge',
      'Access to design tools (Figma, Sketch, etc.)'
    ],
    deliverables: [
      {
        id: '2-1',
        title: 'User Research Report',
        description: 'Interviews and insights from 5+ potential users',
        type: 'documentation',
        required: true,
        weight: 25
      },
      {
        id: '2-2',
        title: 'Design System',
        description: 'Complete design system with components and guidelines',
        type: 'other',
        required: true,
        weight: 35
      },
      {
        id: '2-3',
        title: 'Interactive Prototype',
        description: 'Clickable prototype demonstrating key user flows',
        type: 'demo_url',
        required: true,
        weight: 40
      }
    ],
    skillsRequired: ['Design Thinking', 'User Research'],
    skillsGained: ['Sustainable UX', 'Web3 Design Patterns', 'Accessibility', 'Environmental Impact Design'],
    commitmentNFT: {
      name: 'Sustainable UX Designer - Commitment',
      description: 'Commitment to design sustainable Web3 experiences',
      image: '/nft/commitment-sustainable-ux.png',
      attributes: [
        { trait_type: 'Challenge', value: 'Sustainable UX' },
        { trait_type: 'Duration', value: 10 },
        { trait_type: 'Level', value: 'Beginner' }
      ]
    },
    proofNFT: {
      name: 'Sustainable UX Designer - Proof',
      description: 'Verified expertise in sustainable Web3 UX design',
      image: '/nft/proof-sustainable-ux.png',
      attributes: [
        { trait_type: 'Skill', value: 'Sustainable UX' },
        { trait_type: 'Complexity', value: 'Beginner' },
        { trait_type: 'Curriculum Points', value: 10 }
      ]
    },
    curriculumWeight: 10,
    farcasterChannel: '/design-for-good',
    communityVerification: true,
    createdBy: 'admin',
    adminAddress: '0x1234...5678',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '3',
    title: 'Launch a Community-Driven Token',
    description: 'Design and execute a token launch strategy using Clanker, focusing on community engagement and sustainable tokenomics.',
    category: ChallengeCategory.BUSINESS,
    level: ChallengeLevel.ADVANCED,
    status: ChallengeStatus.ACTIVE,
    duration: 21,
    maxParticipants: 15,
    spotsAvailable: 10,
    totalSpots: 15,
    startDate: new Date('2024-02-10'),
    endDate: new Date('2024-03-03'),
    minCommitmentScore: 8,
    prerequisites: [
      'Previous token/project launch experience',
      'Understanding of tokenomics',
      'Active Farcaster presence with 100+ followers'
    ],
    deliverables: [
      {
        id: '3-1',
        title: 'Tokenomics Design',
        description: 'Complete tokenomics model with sustainability analysis',
        type: 'documentation',
        required: true,
        weight: 30
      },
      {
        id: '3-2',
        title: 'Community Strategy',
        description: 'Go-to-market plan with community engagement strategy',
        type: 'documentation',
        required: true,
        weight: 25
      },
      {
        id: '3-3',
        title: 'Token Launch',
        description: 'Successful token deployment via Clanker',
        type: 'other',
        required: true,
        weight: 35
      },
      {
        id: '3-4',
        title: 'Growth Documentation',
        description: 'Weekly progress and community growth metrics',
        type: 'farcaster_thread',
        required: true,
        weight: 10
      }
    ],
    skillsRequired: ['Tokenomics', 'Community Building', 'Marketing'],
    skillsGained: ['Token Launch Strategy', 'Community Management', 'Sustainable Economics', 'Clanker Integration'],
    commitmentNFT: {
      name: 'Token Launch Expert - Commitment',
      description: 'Commitment to launch a community-driven token',
      image: '/nft/commitment-token-launch.png',
      attributes: [
        { trait_type: 'Challenge', value: 'Token Launch' },
        { trait_type: 'Duration', value: 21 },
        { trait_type: 'Level', value: 'Advanced' }
      ]
    },
    proofNFT: {
      name: 'Token Launch Expert - Proof',
      description: 'Verified success in community-driven token launches',
      image: '/nft/proof-token-launch.png',
      attributes: [
        { trait_type: 'Skill', value: 'Token Launch Strategy' },
        { trait_type: 'Complexity', value: 'Advanced' },
        { trait_type: 'Curriculum Points', value: 25 }
      ]
    },
    curriculumWeight: 25,
    farcasterChannel: '/token-builders',
    communityVerification: true,
    createdBy: 'admin',
    adminAddress: '0x1234...5678',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05')
  }
];

export function useChallengeSystem() {
  const { address, isConnected } = useAccount();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [builderProfile, setBuilderProfile] = useState<BuilderProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load challenges on mount
  useEffect(() => {
    const loadChallenges = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setChallenges(mockChallenges);
        
        // Load builder profile if connected
        if (address && isConnected) {
          await loadBuilderProfile(address);
        }
      } catch (error) {
        console.error('Failed to load challenges:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadChallenges();
  }, [address, isConnected]);

  const loadBuilderProfile = async (walletAddress: string) => {
    try {
      // Mock builder profile - replace with actual API call
      const mockProfile: BuilderProfile = {
        walletAddress,
        totalChallengesCompleted: 2,
        curriculumScore: 35,
        skills: [
          {
            name: 'React',
            category: ChallengeCategory.TECHNICAL,
            level: 85,
            verifiedChallenges: ['1'],
            lastUpdated: new Date()
          },
          {
            name: 'Sustainable UX',
            category: ChallengeCategory.DESIGN,
            level: 70,
            verifiedChallenges: ['2'],
            lastUpdated: new Date()
          }
        ],
        achievements: [
          {
            id: 'first-challenge',
            title: 'First Challenge Completed',
            description: 'Successfully completed your first challenge',
            type: 'completion',
            unlockedAt: new Date()
          }
        ],
        commitmentNFTs: [1, 2],
        proofNFTs: [1, 2],
        averageCompletionTime: 12,
        communityVerificationRate: 95,
        streakDays: 7,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date()
      };

      setBuilderProfile(mockProfile);
    } catch (error) {
      console.error('Failed to load builder profile:', error);
    }
  };

  const registerForChallenge = async (challengeId: string) => {
    if (!address || !isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(`Registered for challenge ${challengeId}`);
      // TODO: Implement actual registration logic
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const commitToChallenge = async (challengeId: string) => {
    if (!address || !isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      // Simulate smart contract interaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(`Committed to challenge ${challengeId} - NFT minted`);
      // TODO: Implement actual commitment and NFT minting
    } catch (error) {
      console.error('Commitment failed:', error);
      throw error;
    }
  };

  const searchChallenges = async (filters: ChallengeFilters) => {
    try {
      // Apply filters to mock data
      let filtered = mockChallenges;

      if (filters.categories && filters.categories.length > 0) {
        filtered = filtered.filter(c => filters.categories!.includes(c.category));
      }

      if (filters.levels && filters.levels.length > 0) {
        filtered = filtered.filter(c => filters.levels!.includes(c.level));
      }

      if (filters.duration?.min) {
        filtered = filtered.filter(c => c.duration >= filters.duration!.min!);
      }

      if (filters.duration?.max) {
        filtered = filtered.filter(c => c.duration <= filters.duration!.max!);
      }

      setChallenges(filtered);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return {
    challenges,
    builderProfile,
    isLoading,
    registerForChallenge,
    commitToChallenge,
    searchChallenges,
    // Additional functions for future implementation
    submitDeliverable: async (challengeId: string, deliverableId: string, content: string) => {
      console.log('Submit deliverable:', { challengeId, deliverableId, content });
    },
    getChallengeDetails: async (challengeId: string) => {
      return challenges.find(c => c.id === challengeId);
    },
  };
}