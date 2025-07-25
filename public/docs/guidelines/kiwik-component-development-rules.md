# Kiwik Component Development Rules

## Overview

This document establishes the development rules and standards for the **kiwik MVP** project, combining **FruteroKit Design Guidelines** with **Next.js/React architecture patterns** and **Farcaster MiniKit requirements**.

## 🎨 Design System Compliance

### 1. **FruteroKit Color System (MANDATORY)**

All components MUST use the established OKLCH color palette:

```tsx
// ✅ Correct - Use design tokens
<Button className="bg-primary text-primary-foreground">
  Acción Principal
</Button>

// ❌ Incorrect - Hard-coded colors
<Button className="bg-green-500 text-white">
  Button
</Button>
```

**Required Color Usage**:
- **Primary**: CTA buttons, links, success states
- **Secondary**: Secondary buttons, highlights, energy
- **Accent**: Decorative elements, badges, highlights
- **Muted**: Secondary text, placeholders, support content
- **Foreground**: Primary text, titles, critical content

### 2. **Typography Hierarchy (MANDATORY)**

Follow the established font hierarchy:

```tsx
// ✅ Correct typography usage
<h1 className="font-funnel text-5xl font-medium leading-tight">
  Main Title
</h1>
<h4 className="font-grotesk text-xl">
  UI Elements
</h4>
<p className="font-sans text-base">
  Body content using Raleway
</p>
```

**Font Assignment Rules**:
- **H1-H3**: `font-funnel` (Funnel Display)
- **H4, UI elements**: `font-grotesk` (Space Grotesk)
- **Body text**: `font-sans` (Raleway)
- **Special quotes**: `font-ledger` (Ledger)

### 3. **Layout Architecture (MANDATORY)**

All pages MUST follow the FruteroKit layout structure:

```tsx
// ✅ Correct layout structure
<PageWrapper>
  <div className="page py-12">
    <div className="container gap-y-8">
      <section className="section">
        {/* Content */}
      </section>
    </div>
  </div>
</PageWrapper>

// ❌ Incorrect - Custom layout
<div className="my-custom-page">
  {/* Content */}
</div>
```

**Required CSS Classes**:
- `.page`: Full-height flex layout with proper spacing
- `.container`: Responsive container (max-w-3xl → max-w-7xl)
- `.section`: Content sections with proper width constraints

## 🏗️ Component Architecture

### 1. **Button Components (MANDATORY)**

All buttons MUST use `rounded-full` and follow FruteroKit patterns:

```tsx
// ✅ Correct button usage
<Button 
  variant="default" 
  size="lg"
  className="hover:scale-105 transition-transform"
>
  Primary Action
</Button>

<Button 
  variant="secondary"
  className="border-2 border-foreground"
>
  Secondary Action
</Button>

<Button 
  variant="outline"
  className="border-2.5 border-primary hover:bg-primary/50"
>
  Tertiary Action
</Button>
```

**Button Requirements**:
- Always `rounded-full`
- Use proper size variants (sm, default, lg, xl)
- Include hover states (`hover:scale-105` for important buttons)
- Follow semantic naming for variants

### 2. **Card Components (MANDATORY)**

Cards MUST follow FruteroKit specifications:

```tsx
// ✅ Standard card pattern
<Card className="bg-card border-2 rounded-xl shadow-sm">
  <CardHeader>
    <CardTitle className="font-funnel">Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    {/* Content */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>

// ✅ Stats card pattern
<Card className="rounded-2xl border-2 px-2 py-6 text-center">
  <div className="font-funnel text-primary font-bold text-3xl">
    {statNumber}
  </div>
  <p className="text-muted-foreground">{statDescription}</p>
</Card>
```

**Card Requirements**:
- Use `border-2` for borders
- `rounded-xl` (12px) for standard cards
- `rounded-2xl` (16px) for stats/highlight cards
- Proper content structure with Header/Content/Footer

### 3. **Icon Integration (MANDATORY)**

Use Lucide React icons with consistent sizing:

```tsx
// ✅ Correct icon usage
import { SparklesIcon, RocketIcon } from 'lucide-react'

<Button>
  Action Text <RocketIcon className="ml-2 h-5 w-5 fill-background" />
</Button>

<div className="bg-background p-2 w-10 h-10 rounded-full ring-2 ring-muted">
  <SparklesIcon className="w-6 h-6 text-primary" />
</div>
```

**Icon Requirements**:
- Use Lucide React exclusively
- Standard sizes: `h-4 w-4` (inline), `h-5 w-5` (UI), `h-6 w-6` (featured)
- Use `fill-background` for icons in colored buttons
- Proper spacing with `ml-2` or `mr-2`

## 🚀 Farcaster MiniKit Compliance

### 1. **MiniKit Provider Structure (MANDATORY)**

Maintain the required provider hierarchy:

```tsx
// ✅ Correct provider nesting
<html lang="en">
  <body className={fontVariableClasses}>
    <MiniKitProvider>
      <AuthProvider>
        <Providers>
          {children}
        </Providers>
      </AuthProvider>
    </MiniKitProvider>
  </body>
</html>
```

### 2. **Responsive Design for MiniKit (MANDATORY)**

Ensure components work in Farcaster's embedded environment:

```tsx
// ✅ MiniKit-optimized responsive design
<div className="w-full min-h-screen flex flex-col">
  <div className="flex-1 px-4 py-6 max-w-sm mx-auto sm:max-w-md">
    {/* Content optimized for mobile-first MiniKit */}
  </div>
</div>
```

**MiniKit Requirements**:
- Mobile-first design (320px minimum width)
- Touch-friendly button sizes (min 44px)
- Fast loading (<2 seconds)
- Minimal external dependencies

## 📱 Component File Organization

### 1. **File Structure (MANDATORY)**

```
app/components/
├── ui/                 # shadcn/ui components
├── layout/
│   ├── page-wrapper.tsx
│   ├── navbar.tsx
│   └── footer.tsx
├── auth/
│   ├── login-button.tsx
│   └── user-menu.tsx
├── features/
│   ├── projects/
│   ├── updates/
│   └── tokens/
└── common/
    ├── loading-states.tsx
    └── error-boundaries.tsx
```

### 2. **Import Conventions (MANDATORY)**

```tsx
// ✅ Correct import order
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { UserProfile } from './user-profile'
import type { ProjectType } from '@/types'
```

**Import Order**:
1. React imports
2. Next.js imports
3. External library imports
4. UI component imports
5. Internal component imports
6. Type imports (last)

## 🔧 TypeScript Rules

### 1. **Component Props (MANDATORY)**

```tsx
// ✅ Proper TypeScript component definition
interface ProjectCardProps {
  project: {
    id: string
    title: string
    description?: string
    status: 'active' | 'paused' | 'completed'
  }
  onAction?: (projectId: string) => void
  className?: string
  children?: React.ReactNode
}

export default function ProjectCard({ 
  project, 
  onAction, 
  className,
  children 
}: ProjectCardProps) {
  // Component implementation
}
```

**TypeScript Requirements**:
- Use `interface` for component props
- Mark optional props with `?`
- Include `children?: React.ReactNode` when needed
- Export types for reusable interfaces

### 2. **Event Handlers (MANDATORY)**

```tsx
// ✅ Proper event handler typing
interface AuthButtonProps {
  onSuccess?: (user: User) => void
  onError?: (error: string) => void
  disabled?: boolean
}

async function handleLogin() {
  try {
    const user = await authenticate()
    onSuccess?.(user)
  } catch (error) {
    onError?.(error.message)
  }
}
```

## 🎭 State Management

### 1. **Zustand Store Pattern (MANDATORY)**

```tsx
// ✅ Proper Zustand store structure
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (credentials: Credentials) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (credentials) => {
        // Implementation
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
```

### 2. **React Query Integration (MANDATORY)**

```tsx
// ✅ React Query with Zustand
export function useProjectData(projectId: string) {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => fetchProject(projectId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

// Usage in component
const { data: project, isLoading, error } = useProjectData(projectId)
```

## 🔒 Authentication Integration

### 1. **Privy + Farcaster (MANDATORY)**

```tsx
// ✅ Proper auth integration
import { usePrivy } from '@privy-io/react-auth'

export function useAuth() {
  const { authenticated, user, login, logout } = usePrivy()
  
  return {
    isAuthenticated: authenticated,
    user: user?.farcaster || null,
    login,
    logout,
  }
}
```

### 2. **Protected Routes (MANDATORY)**

```tsx
// ✅ Protected route component
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, ready } = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    if (ready && !isAuthenticated) {
      router.push('/login')
    }
  }, [ready, isAuthenticated])
  
  if (!ready) return <LoadingSpinner />
  if (!isAuthenticated) return null
  
  return <>{children}</>
}
```

## 🧪 Testing Requirements

### 1. **Component Testing (MANDATORY)**

```tsx
// ✅ Basic component test
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

test('renders button with correct text', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByRole('button')).toHaveTextContent('Click me')
  expect(screen.getByRole('button')).toHaveClass('rounded-full')
})
```

### 2. **Mock Components (MANDATORY)**

Provide mock versions for development:

```tsx
// components/auth/auth-button-mock.tsx
export default function AuthButtonMock() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  return (
    <Button onClick={() => setIsLoggedIn(!isLoggedIn)}>
      {isLoggedIn ? 'Logout (Mock)' : 'Login (Mock)'}
    </Button>
  )
}
```

## ⚡ Performance Requirements

### 1. **Code Splitting (MANDATORY)**

```tsx
// ✅ Lazy load heavy components
const HeavyDashboard = lazy(() => import('./heavy-dashboard'))

export default function App() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <HeavyDashboard />
    </Suspense>
  )
}
```

### 2. **Image Optimization (MANDATORY)**

```tsx
// ✅ Optimized images
import Image from 'next/image'

<Image
  src="/images/hero.jpg"
  alt="Hero image"
  width={800}
  height={600}
  priority={isAboveFold}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

## 🚫 Prohibited Patterns

### ❌ **Do NOT Do These**:

1. **Hard-coded colors**: `bg-green-500` instead of `bg-primary`
2. **Custom layouts**: Bypassing PageWrapper structure
3. **Non-Lucide icons**: Using other icon libraries
4. **Fixed widths**: Using `w-[400px]` instead of responsive classes
5. **Square buttons**: Must use `rounded-full`
6. **Skipping TypeScript**: All components must be typed
7. **Inline styles**: Use Tailwind classes only
8. **Custom fonts**: Only use FruteroKit typography system

## ✅ Quality Checklist

Before submitting any component:

### Design Compliance
- [ ] Uses FruteroKit color tokens
- [ ] Follows typography hierarchy
- [ ] Implements proper layout structure
- [ ] Uses `rounded-full` for buttons
- [ ] Includes proper hover states

### Technical Standards
- [ ] Proper TypeScript typing
- [ ] Consistent import order
- [ ] Error handling implemented
- [ ] Loading states included
- [ ] Responsive design verified

### MiniKit Compatibility
- [ ] Works on mobile (320px+)
- [ ] Touch-friendly interactions
- [ ] Fast loading performance
- [ ] Provider integration correct

### Accessibility
- [ ] Proper ARIA labels
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast compliance

## 📚 Resources

- **FruteroKit Guidelines**: `/public/docs/guidelines/fruterokit-ui-design-guidelines.md`
- **Layout Structure**: `/public/docs/guidelines/fruterokit-layout-structure.md`
- **Component Architecture**: `/public/docs/guidelines/component-architecture-guidelines.md`
- **shadcn/ui Docs**: https://ui.shadcn.com
- **Tailwind CSS**: https://tailwindcss.com
- **Privy Auth**: https://docs.privy.io
- **Farcaster MiniKit**: https://docs.farcaster.xyz/learn/what-is-farcaster/mini-apps

---

**Version**: 1.0  
**Last Updated**: 2025-07-25  
**Maintained by**: kiwik Development Team

*These rules are enforced through code review and automated testing. All components must pass compliance checks before merging.*