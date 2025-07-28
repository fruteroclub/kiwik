# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**kiwik** is a Next.js-based Web3 landing page and MiniKit app for the Base blockchain ecosystem. It's built as a community-driven hub for turning ideas into products with microfunding capabilities.

## Current Development Status

**Current Branch**: dev (main development branch)
- **Last Update**: Landing page adapted to focus on Proof of Verano registration
- **Recent Changes**: 
  - Migrated verano content to main landing page (app/page.tsx)
  - Original landing page backed up to app/kiwik-landing/page.tsx
  - Applied blue+dark theme across all components
  - Fixed font implementation with Funnel Display for headings
  - Improved mobile navigation with proper touch targets

**Previous PR**: #31 - Landing Page Migration (merged to dev)
- **Status**: COMPLETED - Font fixes and landing page adaptation

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base L2, OnchainKit, Wagmi v2, Viem v2
- **MiniKit**: Farcaster Frame SDK integration
- **UI**: Tailwind CSS, custom components (no shadcn/ui installed yet despite README)
- **Database**: Upstash Redis for notifications/webhooks
- **Language**: TypeScript with strict mode
- **Package Manager**: Bun (but npm/yarn commands work too)

## Development Commands

```bash
# Development
bun run dev          # Start dev server on http://localhost:3000
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run ESLint

# TypeScript
# Note: No explicit type-check script in package.json
# TypeScript checking happens during build
```

## Architecture & Code Structure

### Directory Layout
```
/app                 # Next.js App Router
  /api              # API routes (notifications, webhooks)
  /components       # React components (DemoComponents.tsx)
  /kiwik-landing    # Original landing page backup
  /verano           # Proof of Verano bootcamp app
  layout.tsx        # Root layout with metadata generation
  page.tsx          # Main landing page (now Proof of Verano focused)
  providers.tsx     # MiniKitProvider wrapper
  theme.css         # CSS theming variables
/lib                # Utilities (Redis, notifications)
  /contracts        # Smart contract ABIs and deployment info
  /hooks            # Custom React hooks (wagmi integrations)
  fonts.ts          # Font configuration with Funnel Display
/public/docs        # Project documentation and operations center (see below)
/docs               # Development documentation (deployment guides, plans)
```

### Documentation Structure (/public/docs)

The `/public/docs` directory serves as the project's documentation and operations center:

```
/public/docs/
  PROJECT-CONFIG.md              # Main project configuration
  kiwik-mvp-prd-v1.md           # Product Requirements Document
  farcaster-mini-apps.md        # Farcaster integration docs
  frutero-club-context.md       # Project context and background
  
  /guidelines/                   # Development guidelines and standards
    component-architecture-guidelines.md
    fruterokit-layout-structure.md
    fruterokit-ui-design-guidelines.md
    kiwik-component-development-rules.md
    
  /implementation-plans/         # Technical implementation plans
    2025-07-24-implementation-plan-mvp-prd-v1.md
    proof-of-verano-mvp-plan.md
    
  /references/                   # Technical references
    proof-of-verano-deployment.md
    
  /todos/                        # Task tracking and project management
    feat-*.md                    # Active feature tasks
    /done/                       # Completed tasks archive
```

**Important**: Always check `/public/docs/PROJECT-CONFIG.md` for the latest project configuration and guidelines. This is the source of truth for project standards and conventions.

### Key Architectural Patterns

1. **MiniKit Provider Pattern**: The app is wrapped with `MiniKitProvider` in `providers.tsx` which handles:
   - OnchainKit integration for blockchain functionality
   - Frame SDK context for Base App compatibility
   - Wallet connection via Base network

2. **Component Organization**: Currently all UI components are in a single `DemoComponents.tsx` file with exports for Button, Icon, Home, Features, etc.

3. **Styling Approach**: 
   - Tailwind CSS with custom theme.css and blue+dark theme
   - CSS variables for theming (--app-accent: blue, --app-background, etc.)
   - OnchainKit styles imported globally
   - Consistent blue theme across all components (no orange/yellow)

4. **Environment Configuration**: Heavy reliance on environment variables for:
   - OnchainKit API keys
   - App metadata (URLs, images, descriptions)
   - Farcaster Frame configuration
   - Redis connection (Upstash)

### Important Implementation Details

1. **No shadcn/ui**: Despite README mentioning it, shadcn/ui is not installed. Custom components are implemented.

2. **Wallet Integration**: Uses OnchainKit's wallet components with Wagmi hooks for Web3 functionality.

3. **Frame Integration**: The app can be launched as a Farcaster Frame with specific metadata in layout.tsx.

4. **State Management**: Currently using React hooks (useState, useCallback) - no external state management.

5. **API Routes**: 
   - `/api/notify` - Notification handling
   - `/api/webhook` - Webhook processing
   Both require Redis configuration.

## Environment Variables Required

Critical environment variables that must be set:
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY` - Coinbase Developer Platform API key
- `NEXT_PUBLIC_URL` - Production URL for the app
- `REDIS_URL` & `REDIS_TOKEN` - Upstash Redis credentials
- Various `NEXT_PUBLIC_APP_*` variables for branding/metadata

## Common Development Tasks

### Adding New Components
Components should be added to the existing `DemoComponents.tsx` or create new files in `/app/components/`.

### Working with Blockchain Features
- Use OnchainKit components for wallet connections
- Wagmi hooks for contract interactions
- All blockchain interactions are on Base network

### Proof of Verano Integration
The project includes a Web3 bootcamp certification system (now the main focus):
- Smart contract deployed on Base Sepolia: `0xc50dc3d7a967393a4ebf7944b0c6c819d10aa250`
- **Main landing page** (app/page.tsx) features registration and bootcamp info
- Full UI at `/verano` route with dashboard and admin panel
- Original landing page preserved at `/kiwik-landing` route
- Custom hook `useProofOfVerano` for contract interactions
- NFT certificate minting for graduates
- Mobile-friendly navigation with 44x44px touch targets

### Testing Considerations
No test framework is currently set up. Consider adding Vitest or Jest for unit tests.

### Deployment
The app is configured for Vercel deployment but can work with any Next.js-compatible host. Ensure all environment variables are set in the deployment environment.

## Font Implementation

The project uses Funnel Display font for headings and Raleway for body text:
- **Headings (H1-H3)**: Funnel Display font via `/lib/fonts.ts`
- **Body Text**: Raleway font family
- **Font Files**: Located in `/public/fonts/` directory
- **Configuration**: Proper Next.js font optimization with `localFont`

## Theme & Design System

### CSS Variables (app/theme.css)
```css
--app-accent: blue-themed primary color
--app-background: dark theme background
--app-foreground: text colors
--app-card-bg: card background colors
--app-success, --app-error: status colors
```

### Navigation Design
- Mobile-first approach with 44x44px minimum touch targets
- Simplified tab-based navigation for better UX
- Responsive design that works across all screen sizes

## Next Steps & Available Tickets

High-priority tickets ready for implementation:
1. **Privy Authentication** (Ticket 1.2) - Farcaster Sign In integration
2. **Builder Challenge System** - Community challenges and NFT progression
3. **Project Creation Flow** - Core MVP functionality

See `/public/docs/todos/` for detailed implementation plans.