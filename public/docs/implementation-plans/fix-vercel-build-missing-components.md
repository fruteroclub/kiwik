# Fix Vercel Build - Missing Components Implementation Plan

**Date**: 2025-07-28  
**PR**: #29 - Builder Challenge System with NFT Progression  
**Branch**: `feat/builder-challenge-system`  
**Status**: Build Failing

## Problem Summary

The Vercel deployment is failing with the following errors:
```
Module not found: Can't resolve './components/ChallengeFilters'
Module not found: Can't resolve './components/BuilderProfile'
```

## Root Cause Analysis

The `app/challenges/page.tsx` file imports two components that don't exist:
- `ChallengeFilters` component (line 5)
- `BuilderProfile` component (line 6)

Additionally, the page depends on:
- `@/lib/hooks/useChallengeSystem` hook
- `@/lib/types/challenge-system` types

## Implementation Plan

### Phase 1: Create Missing Components

#### 1.1 Create ChallengeFilters Component
**File**: `app/challenges/components/ChallengeFilters.tsx`

**Purpose**: Filter UI for challenge discovery
- Category filters (enum: ChallengeCategory)
- Level filters (enum: ChallengeLevel)
- Duration range slider
- "Has spots available" toggle
- "Starting soon" toggle

**Props Interface**:
```typescript
interface ChallengeFiltersProps {
  filters: {
    categories: ChallengeCategory[];
    levels: ChallengeLevel[];
    duration: { min?: number; max?: number };
    hasSpots: boolean;
    startingSoon: boolean;
  };
  onFiltersChange: (filters: FilterState) => void;
}
```

#### 1.2 Create BuilderProfile Component
**File**: `app/challenges/components/BuilderProfile.tsx`

**Purpose**: Display builder profile with curriculum score and achievements

**Props Interface**:
```typescript
interface BuilderProfileProps {
  profile: BuilderProfile | null;
  farcasterInfo?: FarcasterUserInfo;
}
```

**Features**:
- Curriculum score display
- Achievement badges
- Challenge history
- NFT proof gallery
- Skills visualization

### Phase 2: Verify Dependencies

#### 2.1 Check/Create Challenge System Hook
**File**: `lib/hooks/useChallengeSystem.ts`

**Required exports**:
- `challenges`: Challenge[]
- `builderProfile`: BuilderProfile | null
- `isLoading`: boolean
- `registerForChallenge`: (id: string) => Promise<void>
- `commitToChallenge`: (id: string) => Promise<void>
- `searchChallenges`: (query: string) => Promise<Challenge[]>

#### 2.2 Check/Create Type Definitions
**File**: `lib/types/challenge-system.ts`

**Required types**:
```typescript
export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: ChallengeCategory;
  level: ChallengeLevel;
  duration: number; // in days
  spotsAvailable: number;
  totalSpots: number;
  startDate: Date;
  endDate: Date;
  nftReward?: NFTReward;
  curriculumPoints: number;
}

export enum ChallengeCategory {
  FRONTEND = 'frontend',
  BACKEND = 'backend',
  FULLSTACK = 'fullstack',
  SMART_CONTRACT = 'smart_contract',
  DESIGN = 'design',
  DEVOPS = 'devops'
}

export enum ChallengeLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export interface BuilderProfile {
  id: string;
  farcasterFid?: number;
  curriculumScore: number;
  completedChallenges: number;
  activeChallenges: Challenge[];
  achievements: Achievement[];
  nftProofs: NFTProof[];
}
```

### Phase 3: Implementation Order

1. **Create type definitions** (if missing)
2. **Create or verify the hook** implementation
3. **Create ChallengeFilters component** with basic UI
4. **Create BuilderProfile component** with placeholder content
5. **Test local build** to ensure compilation succeeds
6. **Enhance components** with proper styling and functionality

### Phase 4: Testing & Validation

1. Run `bun install` to ensure dependencies are up to date
2. Run `bun run build` locally to verify build succeeds
3. Test component rendering in development mode
4. Verify TypeScript types are properly resolved
5. Check that all imports are correctly referenced

### Phase 5: Commit & Deploy

1. Stage all changes
2. Create commit with message: "fix: add missing challenge components for build"
3. Push to PR branch
4. Monitor Vercel deployment status

## Success Criteria

- [x] Vercel build succeeds without errors
- [x] All TypeScript errors are resolved
- [x] Components render without runtime errors
- [x] PR can be merged to `dev` branch

## Risk Mitigation

- Create minimal viable components first to unblock build
- Add TODO comments for features to implement later
- Ensure backwards compatibility with existing code
- Test thoroughly before pushing changes

## Timeline

- Estimated completion: 30-45 minutes
- Priority: High (blocking PR merge)