# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**kiwik** is a Next.js-based Web3 landing page and MiniKit app for the Base blockchain ecosystem. It's built as a community-driven hub for turning ideas into products with microfunding capabilities.

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
  layout.tsx        # Root layout with metadata generation
  page.tsx          # Main landing page
  providers.tsx     # MiniKitProvider wrapper
/lib                # Utilities (Redis, notifications)
/public/docs        # Documentation files (PRDs, context)
```

### Key Architectural Patterns

1. **MiniKit Provider Pattern**: The app is wrapped with `MiniKitProvider` in `providers.tsx` which handles:
   - OnchainKit integration for blockchain functionality
   - Frame SDK context for Base App compatibility
   - Wallet connection via Base network

2. **Component Organization**: Currently all UI components are in a single `DemoComponents.tsx` file with exports for Button, Icon, Home, Features, etc.

3. **Styling Approach**: 
   - Tailwind CSS with custom theme.css
   - CSS variables for theming (--app-accent, --app-background, etc.)
   - OnchainKit styles imported globally

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

### Testing Considerations
No test framework is currently set up. Consider adding Vitest or Jest for unit tests.

### Deployment
The app is configured for Vercel deployment but can work with any Next.js-compatible host. Ensure all environment variables are set in the deployment environment.