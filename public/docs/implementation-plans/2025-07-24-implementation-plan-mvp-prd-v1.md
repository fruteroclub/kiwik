# Implementation Plan: kiwik MVP - Farcaster Native Builder Platform

**Date**: 2025-07-24  
**Version**: 1.0  
**PRD Reference**: kiwik-mvp-prd-v1.md

## Executive Summary

This implementation plan transforms the current basic MiniKit landing page into a complete Farcaster-native builder platform with accountability features, community engagement, and Clanker token launches on Base L2.

**Timeline**: 3 weeks (14-15 developer days)  
**Team Size**: 2-3 people (1 full-stack dev, 1 frontend support, 1 PM)  
**Total Effort**: ~113 hours

## Architecture Overview

```
Frontend (Next.js 15 + MiniKit)
├── Authentication Layer (Privy + SIWF)
├── UI Components (shadcn/ui)
├── State Management (Zustand + React Query)
└── Farcaster Integration (Neynar SDK)

Backend Services
├── Database (Supabase PostgreSQL)
├── Caching (Upstash Redis)
├── File Storage (Supabase Storage)
└── API Routes (Next.js)

External Integrations
├── Farcaster Protocol (Neynar)
├── Token Creation (Clanker API)
├── Blockchain (Base L2 via OnchainKit)
└── Notifications (Farcaster + Redis)
```

## Phase 1: Technical Foundation & Core Setup (Week 1)

### Epic 1: Infrastructure Setup
**Goal**: Establish technical foundation with all required services and dependencies

#### Ticket 1.1: Database & Backend Setup
- **Priority**: High
- **Estimated**: 4 hours
- **Description**: Set up Supabase project with PostgreSQL database and authentication

**Tasks**:
- Create Supabase project
- Design database schema for:
  - Users table (linked to Farcaster profiles)
  - Projects table
  - Weekly updates table
  - Engagement tracking table
  - Token launches table
- Set up Row Level Security (RLS) policies
- Configure Supabase Storage buckets for media
- Set up environment variables in Next.js

**Acceptance Criteria**:
- Supabase project created and configured
- All tables created with proper relationships
- RLS policies implemented
- Storage buckets configured
- Environment variables documented

#### Ticket 1.2: Authentication Integration
- **Priority**: High  
- **Estimated**: 6 hours
- **Description**: Implement Privy authentication with Farcaster Sign In With Farcaster (SIWF)

**Tasks**:
- Install and configure Privy SDK
- Implement SIWF authentication flow
- Create auth context provider
- Build login/logout UI components
- Handle wallet connections (MetaMask, Coinbase Wallet)
- Store auth state in Zustand

**Acceptance Criteria**:
- Users can sign in with Farcaster
- Wallet connection works
- Auth state persists across sessions
- Logout functionality works
- Error handling for auth failures

#### Ticket 1.3: FruteroKit Design System & UI Component Setup
- **Priority**: High
- **Estimated**: 4 hours
- **Description**: Implement FruteroKit design system with shadcn/ui integration

**Tasks**:
- ✅ Implement FruteroKit OKLCH color system in globals.css
- ✅ Configure custom typography (Funnel Display, Space Grotesk, Raleway, Ledger)
- ✅ Set up CSS architecture with page/container/section patterns
- ✅ Update Tailwind config with FruteroKit font families
- Install shadcn/ui components:
  - Button, Card, Dialog, Form
  - Input, Select, Textarea
  - Toast, Alert, Badge
  - Tabs, Accordion
- Create component showcase demonstrating FruteroKit patterns
- Implement layout structure following FruteroKit guidelines

**Acceptance Criteria**:
- ✅ FruteroKit color system (OKLCH) fully implemented
- ✅ Custom fonts configured with fallbacks
- ✅ CSS architecture with proper responsive patterns
- shadcn/ui components work with FruteroKit theme
- Components follow FruteroKit design patterns
- Application builds successfully with complete theme

#### Ticket 1.4: State Management Setup
- **Priority**: Medium
- **Estimated**: 3 hours
- **Description**: Implement Zustand for state management and React Query for data fetching

**Tasks**:
- Install Zustand and React Query
- Create store structure:
  - Auth store
  - User store
  - Project store
  - UI store
- Set up React Query provider
- Configure query client with caching
- Create custom hooks for data fetching

**Acceptance Criteria**:
- Zustand stores created and typed
- React Query configured
- Custom hooks documented
- State persists appropriately

#### Ticket 1.5: Farcaster Integration Foundation
- **Priority**: High
- **Estimated**: 4 hours
- **Description**: Integrate Neynar SDK for Farcaster protocol access

**Tasks**:
- Install and configure Neynar SDK
- Set up API client with authentication
- Create service layer for Farcaster operations
- Implement user profile fetching
- Test social graph access
- Handle rate limiting

**Acceptance Criteria**:
- Neynar SDK integrated
- Can fetch user profiles
- Can access social graph
- Rate limiting handled
- Error handling implemented

## Phase 2: Core Features Implementation (Week 2)

### Epic 2: Builder Journey Features
**Goal**: Implement complete builder project creation and tracking system

#### Ticket 2.1: Project Creation Flow
- **Priority**: High
- **Estimated**: 8 hours
- **Description**: Build comprehensive project creation interface

**Tasks**:
- Create multi-step project form:
  - Basic info (title, description, category)
  - Problem statement
  - Solution overview
  - Target market
  - 8-12 week milestone roadmap
- Implement form validation with Zod
- Add media upload for project assets
- Create project preview
- Save to Supabase with proper relations

**Acceptance Criteria**:
- Multi-step form works smoothly
- All fields validated
- Media uploads work
- Projects saved to database
- Error handling for failures

#### Ticket 2.2: Weekly Goal Setting
- **Priority**: High
- **Estimated**: 6 hours
- **Description**: Implement Monday goal-setting system

**Tasks**:
- Create goal-setting UI (3-5 goals max)
- Add SMART goal templates
- Implement recurring Monday prompts
- Store goals in database
- Create goal visibility settings
- Add goal carry-over logic

**Acceptance Criteria**:
- Goal UI intuitive and clear
- Monday reminders work
- Goals visible to followers
- Incomplete goals carry over
- Database properly stores goals

#### Ticket 2.3: Progress Update System
- **Priority**: High
- **Estimated**: 8 hours
- **Description**: Build Friday progress update feature with Farcaster casting

**Tasks**:
- Create progress update form:
  - Weekly wins
  - Challenges faced
  - Metrics/KPIs
  - Media uploads
  - Next week preview
- Integrate Neynar for casting
- Implement streak tracking
- Add consistency badges
- Create update templates

**Acceptance Criteria**:
- Update form comprehensive
- Casts to Farcaster successfully
- Streaks tracked accurately
- Media uploads work
- Updates visible in feeds

#### Ticket 2.4: Project Discovery Feed
- **Priority**: High
- **Estimated**: 6 hours
- **Description**: Build project discovery and browsing interface

**Tasks**:
- Create project grid/list views
- Implement filtering:
  - Category
  - Stage
  - Update frequency
  - Engagement level
- Add search functionality
- Create trending algorithm
- Build project cards with key metrics
- Implement pagination

**Acceptance Criteria**:
- Discovery feed loads quickly
- Filters work correctly
- Search returns relevant results
- Trending calculation accurate
- Mobile-responsive design

#### Ticket 2.5: Builder Profile Pages
- **Priority**: Medium
- **Estimated**: 5 hours
- **Description**: Create detailed builder profile pages

**Tasks**:
- Design profile layout
- Display Farcaster profile data
- Show project portfolio
- Add progress history timeline
- Display engagement metrics
- Create follow/unfollow functionality
- Add social links

**Acceptance Criteria**:
- Profiles load Farcaster data
- Projects displayed clearly
- Timeline shows history
- Follow functionality works
- Mobile-optimized layout

## Phase 3: Social & Token Features (Week 3)

### Epic 3: Community Engagement
**Goal**: Enable community interaction and support features

#### Ticket 3.1: Social Engagement Features
- **Priority**: High
- **Estimated**: 6 hours
- **Description**: Implement reactions, comments, and sharing

**Tasks**:
- Add emoji reactions to updates
- Implement comment system
- Add reply threading
- Create mention functionality
- Build share to Farcaster feature
- Track engagement for token allocation

**Acceptance Criteria**:
- Reactions work in real-time
- Comments thread properly
- Mentions notify users
- Sharing creates Farcaster cast
- Engagement tracked in database

#### Ticket 3.2: Notification System
- **Priority**: Medium
- **Estimated**: 5 hours
- **Description**: Build notification system using Redis and Farcaster

**Tasks**:
- Design notification types
- Implement Redis pub/sub
- Create notification preferences
- Build notification UI
- Add Farcaster message integration
- Implement notification history

**Acceptance Criteria**:
- Notifications delivered quickly
- Preferences respected
- UI shows unread count
- History accessible
- Farcaster messages sent

#### Ticket 3.3: Community Voting System
- **Priority**: High
- **Estimated**: 6 hours
- **Description**: Build token launch readiness voting

**Tasks**:
- Create voting eligibility rules
- Design voting UI
- Implement 7-day voting period
- Add 70% approval threshold
- Build results transparency
- Create voting notifications

**Acceptance Criteria**:
- Voting rules enforced
- UI clear and intuitive
- Time limits work
- Results calculated correctly
- Transparency maintained

### Epic 4: Token Launch Integration
**Goal**: Enable Clanker token creation and distribution

#### Ticket 4.1: Clanker API Integration
- **Priority**: High
- **Estimated**: 8 hours
- **Description**: Integrate Clanker for automated token creation

**Tasks**:
- Study Clanker API documentation
- Create API service layer
- Implement token creation flow
- Handle Base L2 transactions
- Add error handling
- Create retry mechanisms

**Acceptance Criteria**:
- Clanker API integrated
- Tokens created successfully
- Transactions confirmed on Base
- Errors handled gracefully
- Retry logic works

#### Ticket 4.2: Token Allocation System
- **Priority**: High
- **Estimated**: 6 hours
- **Description**: Calculate and distribute token allocations

**Tasks**:
- Design allocation algorithm
- Weight by engagement metrics
- Create allocation preview
- Implement vesting schedules
- Build claiming interface
- Add allocation transparency

**Acceptance Criteria**:
- Algorithm fair and transparent
- Calculations accurate
- Vesting enforced
- Claiming works smoothly
- All allocations visible

#### Ticket 4.3: Token Dashboard
- **Priority**: Medium
- **Estimated**: 5 hours
- **Description**: Create comprehensive token management dashboard

**Tasks**:
- Design dashboard layout
- Show token metrics
- Display holder distribution
- Add vesting timeline
- Create transaction history
- Build analytics views

**Acceptance Criteria**:
- Dashboard loads quickly
- Metrics accurate
- Distribution visible
- Timeline clear
- History complete

## Phase 4: Polish & Launch Preparation

### Epic 5: Platform Administration
**Goal**: Build admin tools and quality assurance features

#### Ticket 5.1: Admin Dashboard
- **Priority**: Medium
- **Estimated**: 6 hours
- **Description**: Create platform administration interface

**Tasks**:
- Build admin authentication
- Create moderation queue
- Add user management
- Build analytics dashboard
- Create content moderation tools
- Add platform health metrics

**Acceptance Criteria**:
- Admin auth secure
- Moderation efficient
- User management works
- Analytics accurate
- Health metrics visible

#### Ticket 5.2: Performance Optimization
- **Priority**: High
- **Estimated**: 4 hours
- **Description**: Optimize for MiniKit performance

**Tasks**:
- Implement code splitting
- Add Redis caching strategies
- Optimize images
- Reduce bundle size
- Add loading states
- Test in Farcaster app

**Acceptance Criteria**:
- Load time under 2 seconds
- Smooth scrolling
- Images optimized
- Bundle size minimal
- Works in MiniKit

#### Ticket 5.3: Testing & QA
- **Priority**: High
- **Estimated**: 8 hours
- **Description**: Comprehensive testing and bug fixes

**Tasks**:
- Write critical path tests
- Test Farcaster integration
- Test token creation flow
- Mobile responsiveness testing
- Cross-browser testing
- Fix identified bugs

**Acceptance Criteria**:
- All critical paths tested
- No blocking bugs
- Mobile experience smooth
- Works across browsers
- Edge cases handled

## Non-Functional Requirements

### Infrastructure Tickets

#### Ticket I.1: Monitoring & Analytics
- **Priority**: Medium
- **Estimated**: 4 hours
- **Description**: Set up monitoring and analytics

**Tasks**:
- Configure Vercel Analytics
- Set up error tracking (Sentry)
- Add performance monitoring
- Create custom event tracking
- Build analytics dashboard

#### Ticket I.2: Security Hardening
- **Priority**: High
- **Estimated**: 4 hours
- **Description**: Implement security best practices

**Tasks**:
- Audit API endpoints
- Implement rate limiting
- Add CORS configuration
- Secure environment variables
- Add input sanitization

## Database Schema

```sql
-- Users table (extends Farcaster profile)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  farcaster_id TEXT UNIQUE NOT NULL,
  wallet_address TEXT,
  email TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT,
  problem_statement TEXT,
  solution_overview TEXT,
  target_market TEXT,
  category TEXT,
  visibility TEXT DEFAULT 'public',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Milestones table
CREATE TABLE milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id),
  week_number INTEGER,
  title TEXT NOT NULL,
  description TEXT,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Weekly goals table
CREATE TABLE weekly_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id),
  week_start_date DATE,
  goals JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Weekly updates table
CREATE TABLE weekly_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id),
  week_number INTEGER,
  wins TEXT,
  challenges TEXT,
  metrics JSONB,
  next_week_preview TEXT,
  farcaster_cast_id TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Engagement tracking table
CREATE TABLE engagement (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  project_id UUID REFERENCES projects(id),
  action_type TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Token launches table
CREATE TABLE token_launches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id),
  token_address TEXT,
  token_symbol TEXT,
  launch_date TIMESTAMP,
  clanker_tx_hash TEXT,
  allocation_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Votes table
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id),
  user_id UUID REFERENCES users(id),
  vote BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(project_id, user_id)
);
```

## Environment Variables Required

```env
# Database
DATABASE_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=

# Redis
REDIS_URL=
REDIS_TOKEN=

# Authentication
PRIVY_APP_ID=
PRIVY_APP_SECRET=

# Farcaster
NEYNAR_API_KEY=
FARCASTER_HUB_URL=

# Blockchain
NEXT_PUBLIC_ONCHAINKIT_API_KEY=
BASE_RPC_URL=

# Clanker
CLANKER_API_KEY=
CLANKER_API_URL=

# App Configuration
NEXT_PUBLIC_URL=
NEXT_PUBLIC_APP_NAME=kiwik
```

## Risk Mitigation

1. **Farcaster API Rate Limiting**
   - Implement caching layer
   - Queue non-critical operations
   - Graceful degradation

2. **Clanker Integration Complexity**
   - Build mock service for testing
   - Implement comprehensive error handling
   - Manual fallback options

3. **User Adoption**
   - Focus on existing Farcaster users
   - Leverage social graph for discovery
   - Clear value proposition

4. **Technical Complexity**
   - Phased rollout approach
   - Comprehensive testing
   - Performance monitoring

## Success Metrics

- 25+ active builders in first month
- 70%+ weekly update consistency
- 3+ successful token launches
- <2 second load times
- 99%+ uptime

## Next Steps

1. Review and approve implementation plan
2. Set up development environment
3. Create project management board
4. Assign tickets to team members
5. Begin Phase 1 implementation

---

**Document Version**: 1.0  
**Last Updated**: 2025-07-24  
**Author**: Implementation Team