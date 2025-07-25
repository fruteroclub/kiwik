'use client';

import { BuilderProfile as BuilderProfileType, ChallengeCategory } from '@/lib/types/challenge-system';

interface BuilderProfileProps {
  profile: BuilderProfileType | null;
  farcasterInfo?: {
    fid?: number;
    username?: string;
    displayName?: string;
    pfpUrl?: string;
    bio?: string;
  } | null;
}

const categoryColors = {
  [ChallengeCategory.TECHNICAL]: 'bg-blue-100 text-blue-800',
  [ChallengeCategory.DESIGN]: 'bg-purple-100 text-purple-800',
  [ChallengeCategory.MARKETING]: 'bg-green-100 text-green-800',
  [ChallengeCategory.BUSINESS]: 'bg-orange-100 text-orange-800',
  [ChallengeCategory.COMMUNITY]: 'bg-pink-100 text-pink-800',
  [ChallengeCategory.SUSTAINABILITY]: 'bg-emerald-100 text-emerald-800',
};

const achievementIcons = {
  streak: '🔥',
  completion: '✅',
  community: '👥',
  special: '⭐',
};

export function BuilderProfile({ profile, farcasterInfo }: BuilderProfileProps) {
  if (!profile && !farcasterInfo) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
        <div className="text-6xl mb-4">👤</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No Profile Yet
        </h3>
        <p className="text-gray-600 mb-4">
          Connect your wallet and complete challenges to build your builder profile.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {farcasterInfo?.pfpUrl ? (
              <img
                src={farcasterInfo.pfpUrl}
                alt={farcasterInfo.displayName || farcasterInfo.username}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">👤</span>
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">
              {farcasterInfo?.displayName || farcasterInfo?.username || 'Anonymous Builder'}
            </h2>
            {farcasterInfo?.username && (
              <p className="text-gray-600">@{farcasterInfo.username}</p>
            )}
            {(farcasterInfo?.bio || profile?.bio) && (
              <p className="mt-2 text-gray-700">
                {farcasterInfo?.bio || profile?.bio}
              </p>
            )}
            {profile?.portfolioUrl && (
              <a
                href={profile.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-blue-600 hover:text-blue-700 text-sm"
              >
                🔗 Portfolio
              </a>
            )}
          </div>

          {/* Curriculum Score */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl p-4">
              <p className="text-xs font-medium opacity-90">Curriculum Score</p>
              <p className="text-3xl font-bold">{profile?.curriculumScore || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">
            {profile?.totalChallengesCompleted || 0}
          </p>
          <p className="text-sm text-gray-600">Challenges Completed</p>
        </div>
        
        <div className="bg-white rounded-lg shadow border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">
            {profile?.averageCompletionTime || 0} days
          </p>
          <p className="text-sm text-gray-600">Avg Completion Time</p>
        </div>
        
        <div className="bg-white rounded-lg shadow border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">
            {profile?.communityVerificationRate || 0}%
          </p>
          <p className="text-sm text-gray-600">Verification Rate</p>
        </div>
        
        <div className="bg-white rounded-lg shadow border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">
            {profile?.streakDays || 0} 🔥
          </p>
          <p className="text-sm text-gray-600">Day Streak</p>
        </div>
      </div>

      {/* Skills */}
      {profile?.skills && profile.skills.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Skills & Expertise</h3>
          <div className="space-y-3">
            {profile.skills.map((skill) => (
              <div key={skill.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    categoryColors[skill.category]
                  }`}>
                    {skill.category}
                  </span>
                  <span className="font-medium text-gray-800">{skill.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 min-w-[3ch]">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {profile?.achievements && profile.achievements.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <span className="text-2xl">
                  {achievementIcons[achievement.type] || '🏆'}
                </span>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NFT Collection */}
      {profile && (profile.commitmentNFTs.length > 0 || profile.proofNFTs.length > 0) && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">NFT Collection</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-3xl mb-2">🎫</div>
              <p className="text-2xl font-bold text-blue-800">
                {profile.commitmentNFTs.length}
              </p>
              <p className="text-sm text-blue-600">Commitment NFTs</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-3xl mb-2">🏅</div>
              <p className="text-2xl font-bold text-green-800">
                {profile.proofNFTs.length}
              </p>
              <p className="text-sm text-green-600">Proof NFTs</p>
            </div>
          </div>
        </div>
      )}

      {/* Empty State for New Users */}
      {profile && profile.totalChallengesCompleted === 0 && (
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6 text-center">
          <div className="text-4xl mb-3">🚀</div>
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Ready to Start Your Journey?
          </h3>
          <p className="text-blue-700">
            Complete your first challenge to start building your builder profile and earning curriculum points!
          </p>
        </div>
      )}
    </div>
  );
}