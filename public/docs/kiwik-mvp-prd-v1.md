# PRD: kiwik MVP - Farcaster Native Builder Platform

## 1. Product overview

### 1.1 Document title and version

- PRD: kiwik MVP - Farcaster Native Builder Platform
- Version: 1.0 MVP (Farcaster Mini App)

### 1.2 Product summary

kiwik MVP is a Farcaster Mini App that transforms builders into impact players through community-driven accountability and tokenized rewards. Built natively on Farcaster's decentralized social network, the platform leverages existing social graphs while adding structured progress tracking and Clanker-powered token launches on Base L2.

The Mini App creates a "degen games for regen outcomes" experience where builders document weekly progress through Farcaster casts, community members engage through native social features, and successful projects launch tokens via Clanker's API. This approach combines viral memetic energy with regenerative impact, proving that speculation can serve sustainability when properly aligned with community accountability systems.

## 2. Goals

### 2.1 Business goals

- Validate Farcaster Mini App product-market fit for builder accountability and token launches
- Demonstrate Clanker integration for seamless token creation and Base ecosystem growth
- Build initial community of 25+ active builders leveraging existing Farcaster social graphs
- Achieve 70%+ weekly cast consistency rate among active builders
- Complete 3+ Clanker token launches during Onchain Summer MVP period
- Generate initial platform revenue through Clanker partnership and transaction fees

### 2.2 User goals

- **Builders**: Leverage existing Farcaster audience for accountability, community support, and Clanker token funding
- **Farcaster Users**: Discover promising projects through native social feeds, earn token rewards for early support
- **Degen Community**: Access high-quality builder content with potential token upside through regenerative impact alignment
- **Base Ecosystem**: Participate in vetted token launches that combine memetic viral potential with sustainable building

### 2.3 Non-goals

- Complex DeFi integrations beyond Clanker token creation
- Replacing Farcaster's native social features (following, casting, reactions)
- Enterprise features or corporate partnership tools during MVP
- Multi-chain support beyond Base L2 ecosystem
- Advanced analytics beyond basic Farcaster and token metrics

## 3. User personas

### 3.1 Key user types

- Builders (Farcaster users creating projects and seeking accountability)
- Farcaster Community (existing social graph providing support and engagement)
- Degen Traders (seeking early access to quality token launches)
- Regenerative Impact Supporters (aligned with sustainable building practices)

### 3.2 Basic persona details

- **María the Farcaster Builder**: 25-32 year old developer with existing Farcaster presence, wants to leverage social graph for project accountability and Clanker funding
- **Carlos the Farcaster Degen**: 28-40 year old active Farcaster user interested in early token opportunities with actual building substance behind speculation
- **Ana the Regen Supporter**: 30-45 year old sustainability-focused community member who wants memetic energy channeled toward regenerative outcomes
- **Base Ecosystem Participant**: Crypto-native users interested in quality Base L2 projects and Onchain Summer opportunities

### 3.3 Role-based access

- **Builders**: Can create projects within Mini App, cast weekly updates to Farcaster, trigger Clanker token launches
- **Farcaster Users**: Native follow/unfollow, like/recast through Farcaster protocol, participate in token allocation eligibility
- **Community Supporters**: Access Mini App analytics, vote on milestones, receive Clanker token allocations based on engagement
- **Mini App Admins**: Project approval, milestone verification, Clanker integration management, community health monitoring

## 4. Functional requirements

- **Farcaster Authentication & Integration** (Priority: High)
  - Farcaster account connection via SIWF (Sign In With Farcaster)
  - Access to user's Farcaster profile, followers, and social graph
  - Permission to cast on behalf of user for progress updates
  - Integration with Farcaster's native follow/like/recast functionality

- **Mini App Manifest & Deployment** (Priority: High)
  - Proper Farcaster Mini App manifest configuration
  - Frame embed metadata for shareable project pages
  - Deep linking between Farcaster casts and Mini App interface
  - Responsive design optimized for Farcaster's embedded experience

- **Builder Journey & Progress Tracking** (Priority: High)
  - Project creation interface within Mini App
  - Automated weekly cast generation with progress updates
  - Integration with Farcaster's threading for progress discussions
  - Streak tracking visible both in Mini App and cast metadata

- **Clanker Token Integration** (Priority: High)
  - API integration with Clanker's token creation service
  - Automated token deployment when milestones achieved
  - Base L2 transaction handling for token distribution
  - Integration with Clanker's discovery and trading features

- **Social Graph Leverage** (Priority: Medium)
  - Import existing Farcaster followers as potential supporters
  - Notification system using Farcaster's native messaging
  - Channel-based project discovery through Farcaster channels
  - Cross-pollination with other Farcaster Mini Apps and communities

- **Regenerative Gamification** (Priority: Medium)
  - "Degen games for regen outcomes" achievement system
  - Impact scoring based on project sustainability metrics
  - Community voting through Farcaster's native polling
  - Integration with broader regenerative ecosystem projects

## 5. User experience

### 5.1 Entry points & first-time user flow

- Discovery through Farcaster cast embeds or channel mentions
- Mini App launch through Farcaster's embedded interface
- SIWF authentication leveraging existing Farcaster identity
- Immediate access to builder feed and project creation within familiar Farcaster context

### 5.2 Core experience

- **Discover Projects**: Users browse builder progress through native Farcaster feeds and dedicated Mini App interface
  - Projects surface naturally through existing social graph and channel participation
- **Follow Builder Journeys**: Leverage Farcaster's native follow system with enhanced Mini App analytics
  - Real-time notifications through Farcaster's messaging system for milestone achievements
- **Weekly Accountability**: Builders cast progress updates that appear in followers' feeds with Mini App metadata
  - Automated reminders and streak tracking visible both in Farcaster and Mini App interfaces
- **Community Validation**: Token launch readiness determined through Farcaster community engagement and Mini App voting
  - Transparent decision making leveraging existing social trust networks and new governance mechanisms

### 5.3 Advanced features & edge cases

- Offline project planning with sync to Farcaster when connection restored
- Cross-channel project promotion through Farcaster's channel system
- Integration with other Farcaster Mini Apps for expanded functionality
- Backup systems for Farcaster API downtime or rate limiting
- Migration tools for existing builders from other platforms to maintain momentum

### 5.4 UI/UX highlights

- Native Farcaster Mini App interface with seamless social integration
- Consistent with Farcaster's purple-themed design system and interaction patterns
- Mobile-first responsive design optimized for Farcaster's embedded webview
- Fast loading through Farcaster's CDN and caching infrastructure
- Accessibility through Farcaster's existing accessibility standards and features

## 6. Narrative

María is a talented developer from Mexico City with 500 Farcaster followers who struggles with accountability while building her fintech app solo. She discovers kiwik through a cast in the /builders channel and connects through SIWF authentication. María creates her project profile within the Mini App and commits to 12 weeks of progress casts. Every Monday, she sets weekly goals visible to her Farcaster network. Every Friday, she casts progress updates with embedded Mini App data showing metrics, screenshots, and honest reflections about challenges faced. Carlos, an active Farcaster degen with interests in regenerative outcomes, discovers María's journey in his feed and starts following her progress. He regularly likes and recasts her updates, providing feedback through Farcaster's native reply system. After 8 consistent weeks and hitting major milestones (50+ beta users, $500 MRR), María qualifies for Clanker token launch. The kiwik Mini App triggers Clanker's API to create $MARIA tokens on Base L2, with automatic allocation to Carlos and other supporters based on their documented engagement history. The token launch provides María with funding to focus full-time while Carlos benefits from early access to a project he supported from day one, proving that degen speculation can fuel regenerative building when aligned through community accountability.

## 7. Success metrics

### 7.1 User-centric metrics

- 70%+ weekly cast consistency rate among active builders
- 50+ Farcaster followers engagement per successful builder project
- 4.5/5 average user satisfaction rating through Mini App feedback system
- 60+ minutes average session time within Mini App during peak building periods
- 25%+ month-over-month growth in builder adoption leveraging Farcaster social graph

### 7.2 Business metrics

- 3+ successful Clanker token launches during Onchain Summer MVP phase
- $50K+ total transaction volume through Clanker integration in first 6 months
- $2.5K+ platform revenue from Clanker partnership and transaction fees
- 25+ active builders maintaining consistent weekly progress casts
- 15%+ average token allocation return for early Farcaster supporters

### 7.3 Technical metrics

- 99%+ Mini App uptime with sub-2 second load times within Farcaster interface
- Zero critical security incidents affecting Farcaster integration or user data
- 95%+ successful SIWF authentication rate for new users
- Successful Clanker API integration with automated token deployment
- Scalable infrastructure supporting 500+ concurrent users within Farcaster ecosystem

## 8. Technical considerations

### 8.1 Integration points

- Farcaster protocol via Neynar SDK for authentication, social graph, and casting functionality
- Clanker API for automated token creation and Base L2 deployment
- Coinbase Development Platform + OnchainKit for Base network transaction processing
- Privy for wallet and email authentication with Farcaster integration
- MiniKit (Base) for Farcaster Mini App framework and native functionality
- Upstash Redis for performance optimization and caching layer

### 8.2 Data storage & privacy

- Supabase PostgreSQL for user profiles, project data, and engagement tracking
- Supabase Storage for media uploads and project assets
- Redis caching layer via Upstash for optimized performance
- Privy authentication handling user identity and wallet connections
- GDPR compliance through Supabase and Privy's existing privacy infrastructure
- Minimal data footprint leveraging Farcaster's social graph through Neynar integration

### 8.3 Scalability & performance

- Next.js 15+ App Router with static generation and server-side rendering
- TailwindCSS with shadcn/ui for consistent, performant component library
- Zustand + React Query for optimized state management and data fetching
- Redis caching layer for database query optimization and real-time features
- Vercel deployment with edge computing and global CDN integration
- Base L2 network for scalable and cost-effective blockchain operations

### 8.4 Potential challenges

- Neynar API rate limiting and Farcaster protocol dependencies
- Clanker integration reliability and token creation success rates
- Privy authentication flow complexity with multi-wallet support
- Base L2 network congestion during high-volume token launch periods
- MiniKit framework limitations and Farcaster Mini App discovery optimization

### 8.5 Technical stack specification

**Frontend Stack**

- **Framework**: Next.js 15+ (App Router)
- **UI Components**: shadcn/ui (reusable component library)
- **Styling**: TailwindCSS
- **Language**: TypeScript
- **State Management**: Zustand + React Query

**Backend & Database**

- **Database**: Supabase (PostgreSQL + real-time)
- **Cache Layer**: Redis (Upstash integration with Supabase)
- **API**: Next.js API Routes
- **File Storage**: Supabase Storage

**Authentication & Identity**

- **Primary Auth**: Privy (wallet + email authentication)
- **Farcaster Integration**: Neynar SDK (social graph + casting)
- **Farcaster Mini App Framework**: MiniKit (Base)

**Blockchain & Tokens**

- **Network**: Base L2
- **Blockchain Integration**: Coinbase Development Platform + OnchainKit (Base)
- **Token Creation**: Clanker API
- **Wallet Integration**: Via Privy + OnchainKit (Base) + Farcaster Mini App

**Deployment & Hosting**

- **Platform**: Vercel
- **Environment**: Farcaster Mini App compatible

**Key Integrations**

- **Farcaster Protocol**: Via Neynar for social features
- **Token Launch**: Via Clanker for automated ERC-20 creation
- **Social Authentication**: SIWF (Sign In With Farcaster)
- **Base L2 Operations**: Coinbase CDP + OnchainKit for transactions

**Development Tools**

- **Version Control**: Git
- **Package Manager**: bun
- **Environment Management**: Vercel environment variables

### 8.6 Engineering team action items

1. Set up Supabase project and database schema for user profiles and project tracking
2. Configure Upstash Redis integration with Supabase for performance optimization
3. Configure Privy authentication integration with Farcaster SIWF support
4. Initialize shadcn/ui component library with TailwindCSS configuration
5. Set up Coinbase Development Platform + OnchainKit for Base L2 integration
6. Implement Neynar SDK for Farcaster social features and casting functionality
7. Build Farcaster Mini App manifest and MiniKit deployment configuration
8. Integrate Clanker API for automated token launch functionality
9. Deploy to Vercel with proper environment configuration and Mini App compatibility

### 8.3 Scalability & performance

- Farcaster Mini App framework with optimized embedded webview performance
- CDN integration through Farcaster's infrastructure for global content delivery
- Base L2 network for scalable and cost-effective token operations
- Real-time features leveraging Farcaster's WebSocket connections and Mini App SDK
- Horizontal scaling capability through Farcaster's existing infrastructure

### 8.4 Potential challenges

- Farcaster API rate limiting and availability dependencies
- Clanker integration reliability and token creation success rates
- Mini App discovery and adoption within Farcaster ecosystem
- Base L2 network congestion during high-volume token launch periods
- Balancing viral memetic energy with regenerative impact measurement

## 9. Milestones & sequencing

### 9.1 Project estimate

- Medium: 2-3 weeks for core MVP functionality
- Additional 1 week for token integration and launch features

### 9.2 Team size & composition

- Small Team: 2-3 total people
  - 1 full-stack developer, 1 product manager/designer, 1 community manager

### 9.3 Suggested phases

- **Phase 1**: Technical foundation and Farcaster Mini App setup (1 week)
  - Key deliverables: Supabase project setup, Privy authentication, MiniKit integration, basic project creation interface, Neynar SDK implementation
- **Phase 2**: Progress tracking and social engagement features (1 week)
  - Key deliverables: Weekly goal/update system with Farcaster casting, social graph leverage via Neynar, streak tracking with Redis caching, shadcn/ui component implementation
- **Phase 3**: Clanker integration and token launch automation (1 week)
  - Key deliverables: Milestone tracking dashboard, community validation system, Clanker API integration, OnchainKit Base L2 token distribution, Vercel deployment optimization

## 10. User stories

### 10.1 User registration and onboarding

- **ID**: US-001
- **Description**: As a new user, I want to sign up with my wallet so that I can access the kiwik platform securely
- **Acceptance criteria**:
  - User can connect MetaMask or Coinbase Wallet during signup
  - Role selection screen allows choosing Builder, Community Member, or Mentor
  - Email backup option available for users without crypto wallets
  - Onboarding tutorial explains platform mechanics and reward system

### 10.2 Create builder project profile

- **ID**: US-002
- **Description**: As a builder, I want to create a comprehensive project profile so that the community can understand and follow my journey
- **Acceptance criteria**:
  - Project creation form includes problem statement, solution overview, and target market
  - 8-12 week milestone roadmap with specific, measurable goals
  - Project visibility controls (public/private/community-only)
  - Profile appears immediately in community discovery feed

### 10.3 Set weekly goals

- **ID**: US-003
- **Description**: As a builder, I want to set specific weekly goals every Monday so that I maintain accountability and structure
- **Acceptance criteria**:
  - Goal setting interface available every Monday with SMART goal templates
  - Goals are public and visible to followers
  - Maximum 3-5 goals per week to maintain focus
  - Goals automatically carry over if not completed (with penalty scoring)

### 10.4 Publish weekly progress updates

- **ID**: US-004
- **Description**: As a builder, I want to share my weekly progress every Friday so that my community can track my journey and provide support
- **Acceptance criteria**:
  - Progress update form with structured template (wins, challenges, metrics, next week)
  - Image and video upload capability for visual proof
  - Automatic publishing to follower feeds and discovery page
  - Streak counter and consistency badges for regular updates

### 10.5 Follow and engage with builders

- **ID**: US-005
- **Description**: As a community member, I want to follow builders and engage with their content so that I can support projects I believe in
- **Acceptance criteria**:
  - Follow/unfollow functionality with notification preferences
  - React to updates with emoji reactions (like, fire, idea, question)
  - Comment system with reply threading and mention capability
  - Engagement activity tracked for future token allocation calculation

### 10.6 Community voting on token readiness

- **ID**: US-006
- **Description**: As a community member, I want to vote on whether builders are ready for token launch so that only quality projects receive funding
- **Acceptance criteria**:
  - Voting interface appears when builders meet basic qualification criteria
  - Clear voting criteria displayed (consistency, milestones, community engagement)
  - 7-day voting period with 70% approval threshold required
  - Transparent results and reasoning for approval/rejection

### 10.7 Token creation and launch

- **ID**: US-007
- **Description**: As a qualified builder, I want to create and launch project tokens so that I can raise funding and reward my community
- **Acceptance criteria**:
  - ERC-20 token creation wizard on Base L2 network
  - Automatic allocation calculation based on community engagement
  - Vesting schedule implementation to prevent immediate dumping
  - Distribution dashboard showing allocation and unlock schedules

### 10.8 Receive token allocations

- **ID**: US-008
- **Description**: As a community supporter, I want to receive token allocations based on my engagement so that I'm rewarded for early belief and support
- **Acceptance criteria**:
  - Allocation automatically calculated based on engagement history
  - Transparent allocation breakdown showing earning factors
  - Token claiming interface with clear instructions
  - Vesting schedule display with unlock timeline

### 10.9 Platform administration and moderation

- **ID**: US-009
- **Description**: As a platform admin, I want to moderate content and manage users so that the community maintains high quality standards
- **Acceptance criteria**:
  - Content reporting and moderation dashboard
  - User management with role assignment and suspension capabilities
  - Token launch approval override for quality control
  - Basic analytics dashboard showing platform health metrics

### 10.10 Search and discover projects

- **ID**: US-010
- **Description**: As any user, I want to search and discover interesting projects so that I can find builders and content relevant to my interests
- **Acceptance criteria**:
  - Search functionality across project titles, descriptions, and tags
  - Filter options by category, stage, update frequency, and engagement level
  - Trending projects section based on recent activity and community interest
  - Personalized recommendations based on user engagement patterns
