# Ticket 1.2: Authentication Integration

**Branch**: feat/authentication-integration  
**GitHub Issue**: #7  
**Priority**: High  
**Estimated Time**: 6 hours  
**Epic**: #1 Infrastructure Setup  
**Dependencies**: Ticket 1.1 (Database & Backend Setup) ✅

## Description
Implement Privy authentication with Farcaster Sign In With Farcaster (SIWF) support for the kiwik MVP platform. This will enable users to authenticate using their Farcaster accounts and optionally connect their crypto wallets.

## Implementation Workflow

### Phase 1: Setup & Configuration (1.5 hours)

#### 1.1 Privy Account & Project Setup
- [ ] Create Privy account at https://privy.io
- [ ] Create new project: "kiwik-mvp"
- [ ] Configure authentication methods:
  - Enable Farcaster (SIWF)
  - Enable wallet connections (MetaMask, Coinbase Wallet, WalletConnect)
  - Enable email as backup auth method
- [ ] Note down App ID and App Secret
- [ ] Configure allowed domains (localhost:3000, production URL)

#### 1.2 Install Dependencies
```bash
# Install Privy SDK and related packages
bun add @privy-io/react-auth @privy-io/server-auth
```

#### 1.3 Environment Configuration
- [ ] Add to `.env.local`:
  ```env
  # Privy Configuration
  NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
  PRIVY_APP_SECRET=your_privy_app_secret
  
  # Optional: Custom branding
  NEXT_PUBLIC_PRIVY_APP_NAME=kiwik
  NEXT_PUBLIC_PRIVY_LOGO_URL=/logo.png
  ```
- [ ] Update `.env.example` with new variables
- [ ] Add Privy configuration to environment validation

### Phase 2: Core Authentication Implementation (2.5 hours)

#### 2.1 Create Privy Provider Configuration
**File**: `app/providers/auth-provider.tsx`
```typescript
'use client'

import { PrivyProvider } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import { base } from 'viem/chains'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        // Authentication methods
        loginMethods: ['farcaster', 'wallet', 'email'],
        
        // Farcaster configuration
        farcaster: {
          // Request specific permissions if needed
        },
        
        // Wallet configuration
        defaultChain: base,
        supportedChains: [base],
        
        // UI customization
        appearance: {
          theme: 'light',
          accentColor: '#8B5CF6', // Farcaster purple
          logo: process.env.NEXT_PUBLIC_PRIVY_LOGO_URL,
        },
        
        // Callbacks
        onSuccess: (user) => {
          // Handle successful authentication
          router.push('/dashboard')
        },
      }}
    >
      {children}
    </PrivyProvider>
  )
}
```

#### 2.2 Update Root Layout
**File**: `app/layout.tsx`
- [ ] Import AuthProvider
- [ ] Wrap app with AuthProvider inside MiniKitProvider
- [ ] Ensure proper provider nesting order

#### 2.3 Create Authentication Hooks
**File**: `hooks/use-auth.ts`
```typescript
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { useEffect } from 'react'
import { useAuthStore } from '@/stores/auth-store'

export function useAuth() {
  const { 
    ready, 
    authenticated, 
    user, 
    login, 
    logout,
    linkFarcaster,
    linkWallet,
  } = usePrivy()
  
  const { wallets } = useWallets()
  const { setUser, clearUser } = useAuthStore()
  
  // Sync Privy user with Zustand store
  useEffect(() => {
    if (authenticated && user) {
      setUser({
        id: user.id,
        farcaster: user.farcaster,
        wallet: user.wallet,
        email: user.email,
      })
    } else {
      clearUser()
    }
  }, [authenticated, user])
  
  return {
    ready,
    authenticated,
    user,
    wallets,
    login,
    logout,
    linkFarcaster,
    linkWallet,
  }
}
```

#### 2.4 Create Auth Store (Zustand)
**File**: `stores/auth-store.ts`
```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
  isAuthenticated: () => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      isAuthenticated: () => !!get().user,
    }),
    {
      name: 'auth-storage',
    }
  )
)
```

### Phase 3: UI Components & User Flow (1.5 hours)

#### 3.1 Create Login Button Component
**File**: `app/components/auth/login-button.tsx`
```typescript
'use client'

import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { FarcasterIcon, WalletIcon } from '@/components/icons'

export function LoginButton() {
  const { ready, authenticated, login, user } = useAuth()
  
  if (!ready) {
    return <Button disabled>Loading...</Button>
  }
  
  if (authenticated) {
    return <UserMenu user={user} />
  }
  
  return (
    <Button onClick={login} className="gap-2">
      <FarcasterIcon className="w-4 h-4" />
      Sign in with Farcaster
    </Button>
  )
}
```

#### 3.2 Create User Menu Component
**File**: `app/components/auth/user-menu.tsx`
```typescript
'use client'

import { useAuth } from '@/hooks/use-auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function UserMenu({ user }: { user: User }) {
  const { logout, linkWallet } = useAuth()
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.farcaster?.pfp} />
            <AvatarFallback>{user.farcaster?.username?.[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user.farcaster?.displayName}</p>
            <p className="text-xs text-muted-foreground">@{user.farcaster?.username}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/profile')}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/projects')}>
          My Projects
        </DropdownMenuItem>
        {!user.wallet && (
          <DropdownMenuItem onClick={linkWallet}>
            Connect Wallet
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

#### 3.3 Create Protected Route Component
**File**: `app/components/auth/protected-route.tsx`
```typescript
'use client'

import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

export function ProtectedRoute({ 
  children,
  fallback = '/login',
  requireWallet = false,
}: {
  children: React.ReactNode
  fallback?: string
  requireWallet?: boolean
}) {
  const { ready, authenticated, user } = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    if (ready && !authenticated) {
      router.push(fallback)
    }
    
    if (ready && authenticated && requireWallet && !user?.wallet) {
      // Prompt to connect wallet
    }
  }, [ready, authenticated, requireWallet])
  
  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }
  
  if (!authenticated) {
    return null
  }
  
  return <>{children}</>
}
```

### Phase 4: Database Integration (0.5 hours)

#### 4.1 Create User Sync Function
**File**: `lib/auth/sync-user.ts`
```typescript
import { prisma } from '@/lib/prisma'
import type { User as PrivyUser } from '@privy-io/server-auth'

export async function syncUserToDatabase(privyUser: PrivyUser) {
  const farcasterAccount = privyUser.linkedAccounts.find(
    account => account.type === 'farcaster'
  )
  
  const walletAccount = privyUser.linkedAccounts.find(
    account => account.type === 'wallet'
  )
  
  if (!farcasterAccount) {
    throw new Error('Farcaster account required')
  }
  
  const user = await prisma.user.upsert({
    where: {
      farcasterId: farcasterAccount.fid.toString(),
    },
    update: {
      username: farcasterAccount.username,
      displayName: farcasterAccount.displayName,
      bio: farcasterAccount.bio,
      avatarUrl: farcasterAccount.pfpUrl,
      walletAddress: walletAccount?.address,
      email: privyUser.email?.address,
      updatedAt: new Date(),
    },
    create: {
      farcasterId: farcasterAccount.fid.toString(),
      username: farcasterAccount.username,
      displayName: farcasterAccount.displayName,
      bio: farcasterAccount.bio,
      avatarUrl: farcasterAccount.pfpUrl,
      walletAddress: walletAccount?.address,
      email: privyUser.email?.address,
    },
  })
  
  return user
}
```

#### 4.2 Create Auth API Route
**File**: `app/api/auth/sync/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { verifyPrivyToken } from '@privy-io/server-auth'
import { syncUserToDatabase } from '@/lib/auth/sync-user'

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const token = authHeader.substring(7)
    const { user } = await verifyPrivyToken(token, {
      appId: process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
      appSecret: process.env.PRIVY_APP_SECRET!,
    })
    
    const syncedUser = await syncUserToDatabase(user)
    
    return NextResponse.json({ user: syncedUser })
  } catch (error) {
    console.error('User sync error:', error)
    return NextResponse.json(
      { error: 'Failed to sync user' },
      { status: 500 }
    )
  }
}
```

### Phase 5: Testing & Error Handling (0.5 hours)

#### 5.1 Test Authentication Flow
- [ ] Test Farcaster login
- [ ] Test wallet connection
- [ ] Test email fallback
- [ ] Test logout functionality
- [ ] Test protected routes
- [ ] Test user menu functionality

#### 5.2 Error Handling
- [ ] Handle network errors
- [ ] Handle authentication failures
- [ ] Handle user sync failures
- [ ] Add user-friendly error messages
- [ ] Implement retry logic for failed operations

#### 5.3 Performance Optimization
- [ ] Implement auth state caching
- [ ] Optimize user sync calls
- [ ] Add loading states
- [ ] Minimize authentication redirects

## Acceptance Criteria
- [ ] Users can sign in with Farcaster account
- [ ] Users can optionally connect crypto wallet
- [ ] Email fallback authentication works
- [ ] User data synced to database on login
- [ ] Auth state persists across sessions
- [ ] Protected routes redirect unauthenticated users
- [ ] User menu shows correct profile information
- [ ] Logout functionality clears all auth state
- [ ] Error handling provides clear feedback
- [ ] All components follow existing UI patterns

## Testing Checklist
- [ ] Farcaster authentication flow works end-to-end
- [ ] Wallet connection process is smooth
- [ ] User data correctly synced to database
- [ ] Protected routes properly enforce authentication
- [ ] Auth state persists after page refresh
- [ ] Logout clears all user data
- [ ] Error states handled gracefully
- [ ] Mobile responsive authentication UI
- [ ] Cross-browser compatibility verified

## Security Considerations
- [ ] Privy tokens validated on server-side
- [ ] User data properly sanitized before storage
- [ ] API routes protected with authentication
- [ ] Sensitive data not exposed to client
- [ ] CORS configured correctly
- [ ] Rate limiting on auth endpoints

## Resources
- [Privy Documentation](https://docs.privy.io)
- [Privy React SDK](https://docs.privy.io/guide/react)
- [Farcaster Authentication](https://docs.privy.io/guide/farcaster)
- [Wallet Connection Guide](https://docs.privy.io/guide/wallets)

## Notes
- Privy handles most of the authentication complexity
- Farcaster integration requires proper app configuration
- Consider implementing progressive authentication (start with Farcaster, add wallet later)
- Test thoroughly in MiniKit environment to ensure compatibility

## Next Steps
After completing this ticket:
1. Update navigation to include login button
2. Add authentication to existing API routes
3. Begin implementing project creation flow (Ticket 2.1)
4. Consider adding analytics for authentication events