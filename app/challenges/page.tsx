'use client';

import { useState, useEffect } from 'react';
import { ChallengeCard } from './components/ChallengeCard';
import { ChallengeFilters } from './components/ChallengeFilters';
import { BuilderProfile } from './components/BuilderProfile';
import { useChallengeSystem } from '@/lib/hooks/useChallengeSystem';
import { useFarcasterFrame } from '@/app/hooks/useFarcasterFrame';
import { Challenge, ChallengeCategory, ChallengeLevel } from '@/lib/types/challenge-system';

export default function ChallengesPage() {
  const { frameInfo } = useFarcasterFrame();
  const { 
    challenges, 
    builderProfile, 
    isLoading, 
    registerForChallenge,
    commitToChallenge
  } = useChallengeSystem();

  const [selectedFilters, setSelectedFilters] = useState({
    categories: [] as ChallengeCategory[],
    levels: [] as ChallengeLevel[],
    duration: { min: undefined as number | undefined, max: undefined as number | undefined },
    hasSpots: false,
    startingSoon: false,
  });

  const [activeTab, setActiveTab] = useState<'discover' | 'my-challenges' | 'profile'>('discover');
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);

  // Filter challenges based on selected criteria
  useEffect(() => {
    const filtered = challenges.filter(challenge => {
      if (selectedFilters.categories.length > 0 && !selectedFilters.categories.includes(challenge.category)) {
        return false;
      }
      if (selectedFilters.levels.length > 0 && !selectedFilters.levels.includes(challenge.level)) {
        return false;
      }
      if (selectedFilters.duration.min && challenge.duration < selectedFilters.duration.min) {
        return false;
      }
      if (selectedFilters.duration.max && challenge.duration > selectedFilters.duration.max) {
        return false;
      }
      return true;
    });
    
    setFilteredChallenges(filtered);
  }, [challenges, selectedFilters]);

  const handleChallengeAction = async (challengeId: string, action: 'register' | 'commit') => {
    try {
      if (action === 'register') {
        await registerForChallenge(challengeId);
      } else if (action === 'commit') {
        await commitToChallenge(challengeId);
      }
    } catch (error) {
      console.error(`Failed to ${action} for challenge:`, error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⚡</div>
          <p className="text-gray-600">Loading challenges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">
                🏆 Builder Challenges
              </h1>
              <p className="text-blue-600 mt-1">
                Build skills, earn proof, grow your curriculum
              </p>
            </div>
            
            {frameInfo.userInfo && (
              <div className="flex items-center gap-3 bg-blue-50 rounded-lg px-4 py-2 border border-blue-200">
                {frameInfo.userInfo.pfpUrl && (
                  <img
                    src={frameInfo.userInfo.pfpUrl}
                    alt={frameInfo.userInfo.displayName || frameInfo.userInfo.username}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    {frameInfo.userInfo.displayName || frameInfo.userInfo.username}
                  </p>
                  <p className="text-xs text-blue-600">
                    {builderProfile?.curriculumScore || 0} curriculum points
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setActiveTab('discover')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'discover'
                  ? 'bg-blue-500 text-white'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              Discover Challenges
            </button>
            <button
              onClick={() => setActiveTab('my-challenges')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'my-challenges'
                  ? 'bg-blue-500 text-white'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              My Challenges
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-blue-500 text-white'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              Builder Profile
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'discover' && (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <ChallengeFilters
                filters={selectedFilters}
                onFiltersChange={setSelectedFilters}
              />
            </div>

            {/* Challenge Grid */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Available Challenges ({filteredChallenges.length})
                </h2>
                <div className="flex gap-2">
                  <button className="text-sm px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    Sort by Level
                  </button>
                  <button className="text-sm px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    Sort by Duration
                  </button>
                </div>
              </div>

              {filteredChallenges.length > 0 ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredChallenges.map((challenge) => (
                    <ChallengeCard
                      key={challenge.id}
                      challenge={challenge}
                      builderProfile={builderProfile}
                      onAction={handleChallengeAction}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No challenges found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or check back later for new challenges.
                  </p>
                  <button
                    onClick={() => setSelectedFilters({
                      categories: [],
                      levels: [],
                      duration: { min: undefined as number | undefined, max: undefined as number | undefined },
                      hasSpots: false,
                      startingSoon: false,
                    })}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'my-challenges' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">My Active Challenges</h2>
              {/* My challenges content */}
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  My Challenges Dashboard
                </h3>
                <p className="text-gray-600 mb-4">
                  Track your active challenges, view progress, and manage commitments.
                </p>
                <p className="text-sm text-blue-600">
                  Coming soon in the next update!
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Builder Profile</h2>
            <BuilderProfile
              profile={builderProfile}
              farcasterInfo={frameInfo.userInfo}
            />
          </div>
        )}
      </main>
    </div>
  );
}