'use client';

import { Challenge, ChallengeCategory, ChallengeLevel, BuilderProfile, ParticipantStatus } from '@/lib/types/challenge-system';
import { useState } from 'react';

interface ChallengeCardProps {
  challenge: Challenge;
  builderProfile?: BuilderProfile | null;
  onAction: (challengeId: string, action: 'register' | 'commit') => Promise<void>;
}

const categoryColors = {
  [ChallengeCategory.TECHNICAL]: 'bg-blue-100 text-blue-800 border-blue-200',
  [ChallengeCategory.DESIGN]: 'bg-purple-100 text-purple-800 border-purple-200',
  [ChallengeCategory.MARKETING]: 'bg-green-100 text-green-800 border-green-200',
  [ChallengeCategory.BUSINESS]: 'bg-orange-100 text-orange-800 border-orange-200',
  [ChallengeCategory.COMMUNITY]: 'bg-pink-100 text-pink-800 border-pink-200',
  [ChallengeCategory.SUSTAINABILITY]: 'bg-emerald-100 text-emerald-800 border-emerald-200',
};

const categoryIcons = {
  [ChallengeCategory.TECHNICAL]: '💻',
  [ChallengeCategory.DESIGN]: '🎨',
  [ChallengeCategory.MARKETING]: '📢',
  [ChallengeCategory.BUSINESS]: '💼',
  [ChallengeCategory.COMMUNITY]: '👥',
  [ChallengeCategory.SUSTAINABILITY]: '🌱',
};

const levelColors = {
  [ChallengeLevel.BEGINNER]: 'bg-gray-100 text-gray-700',
  [ChallengeLevel.INTERMEDIATE]: 'bg-yellow-100 text-yellow-700',
  [ChallengeLevel.ADVANCED]: 'bg-orange-100 text-orange-700',
  [ChallengeLevel.EXPERT]: 'bg-red-100 text-red-700',
};

export function ChallengeCard({ challenge, onAction }: ChallengeCardProps) {
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Check if user is already participating
  const participantStatus: ParticipantStatus | 'not_registered' = 'not_registered'; // TODO: Get from builderProfile
  const hasSpots = !challenge.spotsAvailable || (challenge.spotsAvailable > 0);
  const isEligible = true; // TODO: Check prerequisites

  const handleAction = async (action: 'register' | 'commit') => {
    setIsActionLoading(true);
    try {
      await onAction(challenge.id, action);
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setIsActionLoading(false);
    }
  };

  const getActionButton = () => {
    if (!isEligible) {
      return (
        <button 
          disabled 
          className="w-full py-3 px-4 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed"
        >
          Prerequisites Not Met
        </button>
      );
    }

    if (!hasSpots) {
      return (
        <button 
          disabled 
          className="w-full py-3 px-4 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed"
        >
          Challenge Full
        </button>
      );
    }

    if (participantStatus === 'not_registered') {
      return (
        <button
          onClick={() => handleAction('register')}
          disabled={isActionLoading}
          className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isActionLoading ? 'Registering...' : 'Register Interest'}
        </button>
      );
    }
    
    if (participantStatus === ParticipantStatus.APPLIED) {
      return (
        <button
          onClick={() => handleAction('commit')}
          disabled={isActionLoading}
          className="w-full py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isActionLoading ? 'Committing...' : 'Commit & Get NFT'}
        </button>
      );
    }
    
    if (participantStatus === ParticipantStatus.IN_PROGRESS) {
      return (
        <button
          disabled
          className="w-full py-3 px-4 bg-yellow-100 text-yellow-800 rounded-lg border border-yellow-200"
        >
          ⏳ Challenge in Progress
        </button>
      );
    }
    
    if (participantStatus === ParticipantStatus.COMPLETED) {
      return (
        <button
          disabled
          className="w-full py-3 px-4 bg-green-100 text-green-800 rounded-lg border border-green-200"
        >
          ✅ Challenge Completed
        </button>
      );
    }

    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{categoryIcons[challenge.category]}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryColors[challenge.category]}`}>
              {challenge.category}
            </span>
          </div>
          <span className={`px-2 py-1 rounded text-xs font-medium ${levelColors[challenge.level]}`}>
            {challenge.level}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {challenge.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {challenge.description}
        </p>

        {/* Challenge Info */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">⏱️</span>
            <span className="text-gray-600">{challenge.duration} days</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">👥</span>
            <span className="text-gray-600">
              {challenge.spotsAvailable ? `${challenge.spotsAvailable}/${challenge.totalSpots || challenge.maxParticipants} spots` : 'Unlimited'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">📋</span>
            <span className="text-gray-600">{challenge.deliverables.length} deliverables</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">⭐</span>
            <span className="text-gray-600">{challenge.curriculumWeight} CV points</span>
          </div>
        </div>

        {/* Skills */}
        {challenge.skillsGained.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-gray-500 mb-2">Skills You&apos;ll Gain:</p>
            <div className="flex flex-wrap gap-1">
              {challenge.skillsGained.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200"
                >
                  {skill}
                </span>
              ))}
              {challenge.skillsGained.length > 3 && (
                <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                  +{challenge.skillsGained.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-6 pb-6">
        {getActionButton()}
        
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full mt-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
        >
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>
      </div>

      {/* Expanded Details */}
      {showDetails && (
        <div className="border-t border-gray-100 p-6 bg-gray-50">
          {/* Prerequisites */}
          {challenge.prerequisites.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-gray-800 mb-2">Prerequisites:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {challenge.prerequisites.map((prereq, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-gray-400 mt-0.5">•</span>
                    {prereq}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Deliverables */}
          <div className="mb-4">
            <h4 className="font-medium text-gray-800 mb-2">Key Deliverables:</h4>
            <div className="space-y-2">
              {challenge.deliverables.slice(0, 3).map((deliverable) => (
                <div key={deliverable.id} className="flex items-start gap-2 text-sm">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <div>
                    <span className="font-medium text-gray-800">{deliverable.title}</span>
                    <p className="text-gray-600">{deliverable.description}</p>
                  </div>
                </div>
              ))}
              {challenge.deliverables.length > 3 && (
                <p className="text-sm text-gray-500">
                  And {challenge.deliverables.length - 3} more deliverables...
                </p>
              )}
            </div>
          </div>

          {/* NFT Rewards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <h5 className="font-medium text-gray-800 text-sm mb-1">Commitment NFT</h5>
              <p className="text-xs text-gray-600">{challenge.commitmentNFT.name}</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <h5 className="font-medium text-gray-800 text-sm mb-1">Proof NFT</h5>
              <p className="text-xs text-gray-600">{challenge.proofNFT.name}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}