# Kiwik Project Documentation Index

**Project**: kiwik - Farcaster MiniKit Web3 Community Hub  
**Organization**: fruteroclub  
**Last Updated**: 2025-07-26  

## 📋 Quick Navigation

### 🚀 Getting Started
- [**PROJECT-CONFIG.md**](./PROJECT-CONFIG.md) - **Main project configuration and standards**
- [Development Status](./development-status/CURRENT_DEVELOPMENT_STATUS.md) - Current project health and progress
- [Vercel Integration](./development-setup/VERCEL_INTEGRATION.md) - Environment setup and deployment

### 📖 Project Overview
- [Product Requirements](./kiwik-mvp-prd-v1.md) - MVP product requirements document
- [Frutero Club Context](./frutero-club-context.md) - Project background and community context
- [Farcaster Mini Apps](./farcaster-mini-apps.md) - MiniKit integration documentation

### 🛠️ Development Guidelines
- [Component Architecture](./guidelines/component-architecture-guidelines.md) - React component patterns
- [FruteroKit Layout](./guidelines/fruterokit-layout-structure.md) - Design system structure
- [UI Design Guidelines](./guidelines/fruterokit-ui-design-guidelines.md) - Visual design standards
- [Component Development Rules](./guidelines/kiwik-component-development-rules.md) - Coding standards

### 🎯 Implementation Plans
- [MVP Implementation Plan](./implementation-plans/2025-07-24-implementation-plan-mvp-prd-v1.md) - Overall MVP roadmap
- [Proof of Verano Plan](./implementation-plans/proof-of-verano-mvp-plan.md) - Bootcamp system implementation
- [Build Fix Plan](./implementation-plans/fix-vercel-build-missing-components.md) - ✅ Completed PR #29 fixes

### 📚 Technical References
- [Proof of Verano Deployment](./references/proof-of-verano-deployment.md) - Smart contract deployment details
- [Environment Variables](./vercel/VERCEL_ENV_REFERENCE.md) - Complete environment configuration
- [Challenge Smart Contract](./implementation-plans/challenge-smart-contract-spec-draft.md) - Future challenge system specs

### 📝 Task Management
- [Active Features](./todos/) - Current development tasks
  - [Authentication Integration](./todos/feat-authentication-integration.md) - Privy + Farcaster SIWF
  - [shadcn/ui Setup](./todos/feat-shadcn-ui-setup.md) - Component library integration
- [Completed Tasks](./todos/done/) - Archived completed features

## 🏗️ Project Architecture

### Core Technology Stack
```
Frontend:    Next.js 15 + TypeScript + Tailwind CSS
Blockchain:  Base L2 + OnchainKit + Wagmi v2 + Viem v2
MiniKit:     Farcaster Frame SDK v0.0.60
Database:    Railway PostgreSQL + Supabase
Auth:        Privy + Dynamic wallet support
Deployment:  Vercel (fruteroclub organization)
```

### Key Features Status
- ✅ **Landing Page**: MiniKit-compatible with wallet connection
- ✅ **Proof of Verano**: Web3 bootcamp with NFT certificates
- ✅ **Builder Challenges**: Framework for developer competitions
- ✅ **Frame Integration**: Farcaster-native experience
- 🔄 **Authentication**: Privy + Farcaster SIWF (in progress)
- 📋 **Token Creation**: Clanker integration (planned)

## 🎨 Design System Status

### FruteroKit Integration
- ✅ **Color System**: OKLCH-based palette implemented
- ✅ **Typography**: Funnel Display, Space Grotesk, Raleway fonts
- ✅ **Layout Structure**: PageWrapper → Container → Section pattern
- ✅ **Component Patterns**: Rounded buttons, card styles, spacing
- ✅ **Responsive Design**: Mobile-first Tailwind implementation

### Design Standards
- **Icons**: Lucide React exclusively
- **Buttons**: Always `rounded-full`
- **Colors**: Only FruteroKit OKLCH tokens
- **Fonts**: FruteroKit hierarchy only
- **Layout**: Responsive PageWrapper structure

## 🔧 Development Workflow

### Branch Strategy
```
main     - Production releases
dev      - Active development (current)
feature/* - Feature branches
fix/*    - Bug fixes
docs/*   - Documentation updates
```

### Environment Setup
1. **Install Vercel CLI**: `bun install -g vercel`
2. **Authenticate**: `vercel login` (GitHub)
3. **Link Project**: `vercel link --scope fruteroclub --yes`
4. **Pull Environment**: `vercel env pull .env`
5. **Start Development**: `bun run dev`

### Quality Gates
- TypeScript strict mode compilation
- ESLint + Prettier formatting
- FruteroKit design compliance
- Component responsive behavior
- Build success on Vercel

## 📊 Current Status Summary

### ✅ Completed (Recent)
- PR #29: Builder Challenge System merged successfully
- Vercel CLI integration with fruteroclub organization
- Environment variable synchronization and validation
- Build pipeline stabilization and error resolution
- TypeScript type system completion for challenge domain

### 🔄 In Progress
- Testing infrastructure setup (Jest + React Testing Library)
- Enhanced error handling and user experience
- Documentation completion and maintenance
- Performance optimization and monitoring

### 📋 Planned
- Comprehensive authentication flow (Privy + Farcaster)
- Token creation integration with Clanker
- Advanced challenge system features
- Community governance and voting
- Mobile app optimization

## 🎯 Key Success Metrics

### Technical Health
- **Build Success Rate**: 100% (post-fixes)
- **TypeScript Coverage**: 95%+ strict checking
- **Performance**: <2s load time (MiniKit requirement)
- **Bundle Size**: <500KB initial load

### Development Velocity
- **Documentation Coverage**: 80%+ maintained
- **PR Success Rate**: 100% recent merges
- **Environment Stability**: Automated sync established
- **Deployment Pipeline**: Fully automated via Vercel

## 🚨 Critical Information

### Must-Read Documents
1. **[PROJECT-CONFIG.md](./PROJECT-CONFIG.md)** - Source of truth for all configuration
2. **[Development Status](./development-status/CURRENT_DEVELOPMENT_STATUS.md)** - Current project health
3. **[Vercel Integration](./development-setup/VERCEL_INTEGRATION.md)** - Environment and deployment setup

### Development Rules
- **Organization**: Always use fruteroclub scope for Vercel
- **Environment**: Pull latest variables before development
- **Components**: Follow FruteroKit design system strictly
- **Testing**: Write TypeScript-first, test-supported code
- **Documentation**: Update docs with every significant change

## 📞 Support & Contact

### Documentation Maintenance
- **Primary**: Claude Code integration for automated updates
- **Manual Updates**: Required for major architectural changes
- **Review Cycle**: Weekly documentation health checks
- **Accuracy**: Real-time sync with codebase changes

### Development Support
- **Environment Issues**: Check Vercel CLI integration
- **Build Problems**: Reference implementation plans
- **Design Questions**: Consult FruteroKit guidelines
- **Integration Help**: Review MiniKit and OnchainKit docs

---

**Navigation Tip**: This index is automatically maintained. For specific implementation details, follow the links to individual documentation files. The PROJECT-CONFIG.md file serves as the authoritative source for all project standards and configurations.