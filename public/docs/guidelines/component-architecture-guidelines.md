# React/Next.js Component Architecture Guidelines

## Overview

This document provides comprehensive guidelines for creating modular, scalable React/Next.js components following the established architecture patterns in this codebase. These guidelines ensure consistency, maintainability, and SDK-agnostic design.

## Core Architecture Principles

### 1. Provider Pattern Implementation

**Provider Structure:**
```typescript
// Provider component pattern
'use client'

import { ReactNode, Suspense } from 'react'
import { SomeProvider, AnotherProvider } from 'external-sdk'

function ProviderComponent({ children }: { children: ReactNode }) {
  // Configuration and setup logic
  const config = createConfig({
    // Provider-specific configuration
  })

  // Event handlers and callbacks
  const events = {
    onEvent: (args) => {
      // Handle events
    },
  }

  return (
    <SomeProvider settings={{ config, events }}>
      <AnotherProvider config={config}>
        {children}
      </AnotherProvider>
    </SomeProvider>
  )
}

// Main export with Suspense wrapper
export default function MainProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProviderComponent>{children}</ProviderComponent>
    </Suspense>
  )
}
```

**Key Provider Guidelines:**
- Always wrap the main provider logic in a separate component
- Use Suspense wrapper for the main export
- Include proper fallback UI during loading states
- Separate configuration from provider logic
- Handle SDK-specific events and callbacks within the provider

### 2. Layout Component Architecture

**Navbar Component Pattern:**
```typescript
'use client'

import { usePathname } from 'next/navigation'
import AuthButton from '../buttons/auth-button-[sdk-name]'
import MobileMenu from './mobile-menu'

export type MenuItemType = {
  displayText: string
  href: string
  isMobileOnly: boolean
  isExternal?: boolean
}

const MENU_ITEMS: MenuItemType[] = [
  // Define menu items here
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="top-0 h-20 w-full bg-background">
      <div className="mx-auto flex h-full w-full max-w-3xl items-center justify-between p-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-5 lg:px-8">
        {/* Logo section */}
        <div className="flex w-24 items-center">
          {/* Logo implementation */}
        </div>
        
        {/* Desktop navigation */}
        <div className="z-10 col-span-3 flex items-center justify-center">
          <nav className="hidden gap-6 lg:flex">
            {MENU_ITEMS.filter((item) => !item.isMobileOnly).map((item, index) => (
              // Navigation links with active state styling
            ))}
          </nav>
        </div>
        
        {/* Desktop auth button */}
        <div className="hidden lg:flex lg:justify-end">
          <AuthButton />
        </div>
        
        {/* Mobile menu trigger */}
        <MobileMenu menuItems={MENU_ITEMS} pathname={pathname} />
      </div>
    </header>
  )
}
```

**Mobile Menu Pattern:**
```typescript
'use client'

import { useState } from 'react'
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import AuthButton from '../buttons/auth-button-[sdk-name]'

type MobileMenuProps = {
  menuItems?: MenuItemType[]
  pathname: string
}

export default function MobileMenu({ menuItems, pathname }: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild>
        {/* Menu trigger button */}
      </SheetTrigger>
      <SheetContent side="right" className="bg-background">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Navigation items</SheetDescription>
        <div className="grid gap-2 py-6">
          {/* Mobile navigation links */}
          <div className="flex justify-center py-2">
            <AuthButton setIsMenuOpen={setIsMenuOpen} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
```

### 3. SDK-Agnostic Auth Button Pattern

**Auth Button Interface:**
```typescript
type AuthButtonProps = {
  children?: React.ReactNode
  className?: string
  size?: 'default' | 'sm' | 'lg' | 'xl' | 'icon' | null | undefined
  setIsMenuOpen?: Dispatch<SetStateAction<boolean>>
}
```

**Production Auth Button Pattern:**
```typescript
'use client'

import { type Dispatch, type SetStateAction } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
// Import SDK-specific hooks

export default function AuthButton({
  children,
  className,
  size = 'default',
  setIsMenuOpen,
}: AuthButtonProps) {
  // SDK-specific hooks and state
  const { handleLogOut, setShowAuthFlow, sdkHasLoaded } = useSDKContext()
  const isLoggedIn = useIsLoggedIn()

  function login() {
    if (!isLoggedIn) {
      setShowAuthFlow(true)
    } else {
      toast.warning('Session already active')
    }
  }

  async function logout() {
    await handleLogOut()
    setIsMenuOpen?.(false)
  }

  if (!sdkHasLoaded) {
    return null
  }

  return (
    <Button
      onClick={isLoggedIn ? logout : login}
      size={size}
      className={cn('font-medium', className)}
    >
      {isLoggedIn ? 'Logout' : children || 'Login'}
    </Button>
  )
}
```

**Dummy Auth Button for Development:**
```typescript
'use client'

import { type Dispatch, type SetStateAction, useState } from 'react'
import { Button } from '../ui/button'

export default function AuthButton({
  size = 'default',
  setIsMenuOpen,
}: AuthButtonProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  function login() {
    setIsLoggedIn(true)
    toast.info('Mock login - configure authentication flow')
  }

  async function logout() {
    setIsLoggedIn(false)
    toast.info('Mock logout - configure authentication flow')
    setIsMenuOpen?.(false)
  }

  return (
    <Button
      onClick={isLoggedIn ? logout : login}
      size={size}
      className="font-medium"
    >
      {isLoggedIn ? 'Logout' : 'Login'}
    </Button>
  )
}
```

### 4. Page Wrapper Pattern

**Page Wrapper Structure:**
```typescript
import React from 'react'
import Navbar from './navbar'
import Footer from './footer'

const NAVBAR_HEIGHT = '64px' // Must match navbar height

export interface PageWrapperProps {
  title?: string
  navTitle?: string
}

const PageWrapper: React.FC<PageWrapperProps & { children: React.ReactNode }> = ({
  children,
  title,
  navTitle,
}) => {
  return (
    <>
      <Navbar />
      <main className={`h-[calc(100vh-${NAVBAR_HEIGHT})] top-[${NAVBAR_HEIGHT}] flex w-full flex-col items-center overflow-x-hidden`}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default PageWrapper
```

## Component Organization Rules

### 1. File Structure

```
src/components/
├── buttons/
│   ├── auth-button-[sdk-name].tsx    # Production auth button
│   └── auth-button-dummy.tsx         # Development/testing button
├── layout/
│   ├── navbar.tsx                    # Main navigation
│   ├── mobile-menu.tsx              # Mobile navigation
│   ├── footer.tsx                   # Footer component
│   └── page-wrapper.tsx             # Page layout wrapper
├── ui/                              # shadcn/ui components
└── [feature]/                      # Feature-specific components
```

### 2. Import Conventions

**Consistent Import Order:**
```typescript
// 1. React imports
import React, { useState, useEffect } from 'react'

// 2. Next.js imports
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

// 3. External library imports
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

// 4. UI component imports
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'

// 5. Internal component imports
import AuthButton from '../buttons/auth-button-[sdk-name]'

// 6. Type imports (at the end)
import { type MenuItemType } from './navbar'
```

### 3. TypeScript Guidelines

**Component Props Pattern:**
```typescript
// Use consistent prop naming
type ComponentProps = {
  children?: React.ReactNode
  className?: string
  size?: 'default' | 'sm' | 'lg' | 'icon'
  isOpen?: boolean
  onToggle?: (isOpen: boolean) => void
  // SDK-specific props
  setIsMenuOpen?: Dispatch<SetStateAction<boolean>>
}

// Export types when they might be reused
export type MenuItemType = {
  displayText: string
  href: string
  isMobileOnly: boolean
  isExternal?: boolean
}
```

### 4. State Management Patterns

**Local State:**
```typescript
const [isMenuOpen, setIsMenuOpen] = useState(false)
const [isLoading, setIsLoading] = useState(true)
```

**SDK State Integration:**
```typescript
// Use SDK-provided hooks consistently
const { handleLogOut, setShowAuthFlow, sdkHasLoaded } = useSDKContext()
const isLoggedIn = useIsLoggedIn()
const { user, isAuthenticated } = useAuth()
```

### 5. Event Handler Patterns

**Consistent Event Handling:**
```typescript
// Async handlers
async function handleLogout() {
  try {
    await handleLogOut()
    setIsMenuOpen?.(false)
    router.push('/')
  } catch (error) {
    console.error('Logout failed:', error)
    toast.error('Logout failed')
  }
}

// Sync handlers
function handleMenuToggle(isOpen: boolean) {
  setIsMenuOpen(isOpen)
}
```

## Styling Guidelines

### 1. Tailwind CSS Patterns

**Responsive Design:**
```typescript
className="hidden lg:flex lg:justify-end"  // Desktop only
className="lg:hidden"                       // Mobile only
className="flex lg:grid lg:grid-cols-5"     // Responsive layout
```

**Component Styling:**
```typescript
// Use cn() for conditional classes
className={cn(
  'base-classes font-medium transition-colors',
  isActive && 'active-state-classes',
  className
)}
```

### 2. CSS Custom Properties

**Use CSS variables for theming:**
```typescript
className="bg-background text-foreground"
className="text-primary hover:text-primary-foreground"
```

## SDK Integration Patterns

### 1. Authentication SDK Integration

**Provider Setup:**
```typescript
// In provider component
const events = {
  onLogin: (user) => {
    toast.success('Welcome!')
    router.push('/dashboard')
  },
  onLogout: () => {
    toast.info('Goodbye!')
    router.push('/')
  },
}

const handlers = {
  handleAuthenticatedUser: async ({ user }) => {
    // Sync with backend
    await syncUserWithBackend(user)
  },
}
```

### 2. Web3 SDK Integration

**Wallet Connection Pattern:**
```typescript
const config = createConfig({
  chains: [mainnet, polygon, arbitrum],
  transports: {
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${apiKey}`),
    [polygon.id]: http(`https://polygon-mainnet.g.alchemy.com/v2/${apiKey}`),
  },
})
```

## Error Handling

### 1. Loading States

```typescript
if (!sdkHasLoaded) {
  return <LoadingSpinner />
}

if (isLoading) {
  return <Skeleton className="h-10 w-24" />
}
```

### 2. Error Boundaries

```typescript
// Wrap providers with error boundaries
<ErrorBoundary fallback={<ErrorFallback />}>
  <AuthProvider>
    {children}
  </AuthProvider>
</ErrorBoundary>
```

## Testing Considerations

### 1. Mock Components

Always provide dummy/mock versions of SDK-dependent components:
- `auth-button-dummy.tsx` for auth buttons
- Mock providers for testing
- Storybook stories with mock data

### 2. Component Testing

```typescript
// Test both logged in and logged out states
test('renders login button when not authenticated', () => {
  render(<AuthButton />, { wrapper: MockAuthProvider })
  expect(screen.getByText('Login')).toBeInTheDocument()
})
```

## Performance Optimization

### 1. Code Splitting

```typescript
// Lazy load heavy components
const HeavyComponent = lazy(() => import('./heavy-component'))

// Use Suspense
<Suspense fallback={<LoadingSpinner />}>
  <HeavyComponent />
</Suspense>
```

### 2. Memoization

```typescript
// Memoize expensive computations
const memoizedValue = useMemo(() => {
  return expensiveCalculation(props)
}, [dependency])

// Memoize components
const MemoizedComponent = memo(Component)
```

## Best Practices Summary

1. **Modularity**: Keep components focused on single responsibilities
2. **SDK Agnostic**: Abstract SDK-specific logic into interchangeable components
3. **Consistent Patterns**: Follow established patterns for similar components
4. **Type Safety**: Use TypeScript consistently with proper type definitions
5. **Accessibility**: Include proper ARIA labels and semantic HTML
6. **Mobile First**: Design with mobile-first responsive principles
7. **Performance**: Optimize with lazy loading, memoization, and code splitting
8. **Testing**: Provide mock implementations for development and testing
9. **Error Handling**: Implement proper loading states and error boundaries
10. **Documentation**: Comment complex logic and maintain this style guide

## Migration Guide

When switching between SDKs:

1. Create new auth button: `auth-button-[new-sdk].tsx`
2. Update provider in `src/providers/`
3. Update auth button import in navbar and mobile menu
4. Test with dummy component first
5. Update environment variables
6. Update type definitions if needed

This architecture ensures smooth transitions between different authentication and Web3 SDKs while maintaining a consistent user experience.