# Vercel Integration Setup

## Overview

This document covers the complete Vercel CLI integration setup for the kiwik project, including organization management, environment variable synchronization, and development workflow integration.

## Prerequisites

- Node.js/Bun environment
- GitHub account with access to fruteroclub organization
- Vercel account linked to fruteroclub organization

## Installation & Setup

### 1. Install Vercel CLI

```bash
# Global installation with bun
bun install -g vercel

# Verify installation
vercel --version
# Expected: Vercel CLI 44.6.3 or later
```

### 2. Authentication

```bash
# Initiate login process
vercel login

# Select authentication method: GitHub (recommended)
# Follow browser authentication flow
# Confirm successful authentication
```

### 3. Project Linking

```bash
# Link to correct organization and project
vercel link --scope fruteroclub --yes

# Expected output:
# ✅ Linked to fruteroclub/kiwik (created .vercel directory)
```

**Critical Note**: Ensure linking to `fruteroclub` organization, not personal account (`angelmc32s-projects`).

### 4. Environment Variable Management

```bash
# List available environment variables
vercel env ls

# Pull all environment variables for development
vercel env pull .env

# Verify environment variables are properly formatted
# Remove any trailing newlines if present
```

## Environment Variable Categories

### Core Application
- `NEXT_PUBLIC_URL` - Deployment URL
- `NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME` - Project identifier
- `NEXT_PUBLIC_APP_OG_TITLE` - OpenGraph metadata

### Database Integration
- `DATABASE_URL` - Railway PostgreSQL connection
- `DIRECT_URL` - Supabase direct connection
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public API key
- `SUPABASE_SERVICE_ROLE_KEY` - Administrative access key

### Blockchain & Web3
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY` - Coinbase OnchainKit API
- `NEXT_PUBLIC_ALCHEMY_API_KEY` - Alchemy RPC provider
- `NEXT_PUBLIC_PROOF_OF_VERANO_ADDRESS` - Smart contract address

### Authentication & Identity
- `PRIVY_APP_ID` - Privy authentication app ID
- `PRIVY_APP_SECRET` - Privy authentication secret
- `NEXT_PUBLIC_DYNAMIC_ENV_ID` - Dynamic wallet integration

### Deployment & CI/CD
- `VERCEL_OIDC_TOKEN` - Auto-generated deployment token

## Organization Management

### fruteroclub Organization Details
- **Organization ID**: `team_hZCPkbzNZQud6ykKI2LQlIC8`
- **Project ID**: `prj_LLoa0MUCXTXnO4HLbR1IX437G1o5`
- **Environment**: Development, Preview, Production

### Switching Organizations

If accidentally linked to wrong organization:

```bash
# Remove incorrect link
rm -rf .vercel

# Re-link to correct organization
vercel link --scope fruteroclub --yes

# Verify correct organization in VERCEL_OIDC_TOKEN
# Should contain: "owner":"fruteroclub"
```

## Development Workflow

### Environment Synchronization

```bash
# Update local environment with latest variables
vercel env pull .env

# Check for environment changes
git status .env

# Note: .env is gitignored for security
```

### Deployment Integration

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod

# Check deployment status
vercel logs
```

## Troubleshooting

### Common Issues

#### 1. Wrong Organization Link
**Problem**: Linked to personal account instead of fruteroclub
**Solution**: Remove `.vercel` directory and re-link with `--scope fruteroclub`

#### 2. Environment Variable Formatting
**Problem**: Trailing newlines in environment values
**Solution**: Edit `.env` file to remove `\n` characters from string values

#### 3. Missing Critical Variables
**Problem**: Build fails due to missing environment variables
**Solution**: Verify all required variables are present in Vercel dashboard

#### 4. OIDC Token Validation
**Problem**: Deployment authentication fails
**Solution**: Check `VERCEL_OIDC_TOKEN` contains correct organization reference

### Validation Commands

```bash
# Verify environment variables
cat .env | grep -E "(DATABASE_URL|ONCHAINKIT_API_KEY|SUPABASE_URL)"

# Check organization link
cat .vercel/project.json

# Test environment loading
bun run dev
```

## Security Considerations

### Environment Variable Security
- Never commit `.env` files to repository
- Rotate API keys regularly through respective service dashboards
- Use different environment tiers (development/preview/production)
- Monitor environment variable access through Vercel audit logs

### Access Control
- Limit team member access to production environment variables
- Use environment-specific API keys where possible
- Implement least-privilege access for service accounts

## Integration with Build Process

### Next.js Integration
Environment variables are automatically loaded by Next.js in this order:
1. `.env.local` (ignored by git)
2. `.env.development` (for development)
3. `.env` (pulled from Vercel)
4. Built-in defaults

### Build Validation
The project includes environment validation in `app/lib/minikit-config.ts`:
- Runtime validation for critical variables
- Build-time compatibility checks
- Graceful degradation for optional variables

## Maintenance

### Regular Tasks
- **Weekly**: Check for new environment variables in Vercel dashboard
- **Monthly**: Rotate API keys and update environment variables
- **Quarterly**: Review access permissions and clean up unused variables

### Environment Updates
When adding new environment variables:
1. Add to Vercel dashboard for appropriate environments
2. Update this documentation
3. Update `app/lib/minikit-config.ts` validation
4. Pull updated variables: `vercel env pull .env`

---

**Last Updated**: 2025-07-26  
**Vercel CLI Version**: 44.6.3  
**Organization**: fruteroclub  
**Project**: kiwik