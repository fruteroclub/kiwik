# Ticket 1.3: UI Component Library Setup

**Branch**: feat/shadcn-ui-setup  
**GitHub Issue**: #8  
**Priority**: High  
**Estimated Time**: 3 hours  
**Epic**: #1 Infrastructure Setup  
**Dependencies**: Ticket 1.1 (Database Setup) ✅

## Description
Install and configure shadcn/ui component library with the existing Next.js 15 and Tailwind CSS setup. This will provide a consistent, accessible, and customizable component library for the kiwik MVP platform.

## Implementation Workflow

### Phase 1: Installation & Initial Setup (0.5 hours)

#### 1.1 Install shadcn/ui CLI
```bash
# Install shadcn/ui CLI tool
bunx shadcn-ui@latest init
```

When prompted, select:
- **Would you like to use TypeScript?** → Yes
- **Which style would you like to use?** → Default
- **Which color would you like to use as base color?** → Violet (closest to Farcaster purple)
- **Where is your global CSS file?** → app/globals.css
- **Do you want to use CSS variables for colors?** → Yes
- **Where is your tailwind.config.js located?** → tailwind.config.ts
- **Configure the import alias for components?** → @/components
- **Configure the import alias for utils?** → @/lib/utils

#### 1.2 Update Configuration Files
- [ ] Verify `tailwind.config.ts` has been updated with shadcn/ui config
- [ ] Check that `globals.css` includes shadcn/ui CSS variables
- [ ] Ensure `components.json` is created in project root
- [ ] Update `.gitignore` if needed

#### 1.3 Create Utils File
- [ ] Verify `lib/utils.ts` is created with `cn` utility function
- [ ] Add any additional utility functions needed

### Phase 2: Install Essential Components (1.5 hours)

#### 2.1 Core UI Components
Install the following essential components:

```bash
# Form components
bunx shadcn-ui@latest add button
bunx shadcn-ui@latest add input
bunx shadcn-ui@latest add label
bunx shadcn-ui@latest add textarea
bunx shadcn-ui@latest add select
bunx shadcn-ui@latest add checkbox
bunx shadcn-ui@latest add radio-group
bunx shadcn-ui@latest add switch

# Layout components
bunx shadcn-ui@latest add card
bunx shadcn-ui@latest add separator
bunx shadcn-ui@latest add tabs
bunx shadcn-ui@latest add accordion

# Navigation components
bunx shadcn-ui@latest add navigation-menu
bunx shadcn-ui@latest add dropdown-menu
bunx shadcn-ui@latest add dialog
bunx shadcn-ui@latest add sheet

# Display components
bunx shadcn-ui@latest add avatar
bunx shadcn-ui@latest add badge
bunx shadcn-ui@latest add alert
bunx shadcn-ui@latest add toast
bunx shadcn-ui@latest add progress
bunx shadcn-ui@latest add skeleton

# Form validation
bunx shadcn-ui@latest add form
```

#### 2.2 Install Additional Dependencies
```bash
# Required peer dependencies
bun add @radix-ui/react-slot
bun add @radix-ui/react-icons
bun add react-hook-form
bun add @hookform/resolvers
bun add zod
bun add sonner # for toast notifications
```

### Phase 3: Theme Customization (0.5 hours)

#### 3.1 Update Theme to Match Farcaster Design
**File**: `app/globals.css`

Update CSS variables to match Farcaster purple theme:
```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 271 81% 56%; /* Farcaster purple: #8B5CF6 */
    --primary-foreground: 0 0% 100%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 271 81% 56%; /* Same as primary */
    --accent-foreground: 0 0% 100%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 271 81% 56%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 271 81% 56%;
    --primary-foreground: 0 0% 100%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 271 81% 56%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 271 81% 56%;
  }
}
```

#### 3.2 Create Custom Theme Extensions
**File**: `lib/theme.ts`
```typescript
export const theme = {
  colors: {
    farcaster: {
      purple: '#8B5CF6',
      'purple-dark': '#7C3AED',
      'purple-light': '#A78BFA',
    },
    base: {
      blue: '#0052FF',
      'blue-dark': '#0041CC',
      'blue-light': '#3377FF',
    },
  },
  animations: {
    'fade-in': 'fadeIn 0.3s ease-in-out',
    'slide-up': 'slideUp 0.3s ease-out',
    'slide-down': 'slideDown 0.3s ease-out',
  },
}
```

### Phase 4: Component Integration & Testing (0.5 hours)

#### 4.1 Update Existing Components
- [ ] Replace custom Button in `DemoComponents.tsx` with shadcn/ui Button
- [ ] Update any existing form inputs to use shadcn/ui components
- [ ] Ensure all imports are correctly updated

#### 4.2 Create Component Showcase Page
**File**: `app/components/page.tsx`
```typescript
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ComponentShowcase() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">Component Library</h1>
      
      {/* Buttons Section */}
      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
          <CardDescription>Button component variations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </div>
        </CardContent>
      </Card>

      {/* Forms Section */}
      <Card>
        <CardHeader>
          <CardTitle>Form Elements</CardTitle>
          <CardDescription>Input and form components</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="disabled">Disabled Input</Label>
            <Input id="disabled" disabled placeholder="This is disabled" />
          </div>
        </CardContent>
      </Card>

      {/* Add more component sections... */}
    </div>
  )
}
```

#### 4.3 Create Toast Provider Setup
**File**: `app/providers/toast-provider.tsx`
```typescript
'use client'

import { Toaster } from 'sonner'

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: 'hsl(var(--background))',
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--border))',
        },
      }}
    />
  )
}
```

Add to `app/layout.tsx`:
```typescript
import { ToastProvider } from './providers/toast-provider'

// Inside body
<ToastProvider />
```

### Phase 5: Documentation & Best Practices (0.5 hours)

#### 5.1 Create Component Usage Guide
**File**: `docs/components-guide.md`
```markdown
# shadcn/ui Component Usage Guide

## Import Pattern
Always import components from the ui directory:
\`\`\`typescript
import { Button } from "@/components/ui/button"
\`\`\`

## Form Validation Pattern
Use react-hook-form with zod:
\`\`\`typescript
const formSchema = z.object({
  email: z.string().email(),
})

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
})
\`\`\`

## Toast Notifications
Use sonner for toast notifications:
\`\`\`typescript
import { toast } from "sonner"

toast.success("Success!")
toast.error("Error occurred")
\`\`\`
```

#### 5.2 Update TypeScript Configuration
Ensure `tsconfig.json` includes proper paths:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"]
    }
  }
}
```

## Acceptance Criteria
- [ ] shadcn/ui successfully installed and configured
- [ ] All essential components installed and working
- [ ] Theme customized to match Farcaster purple branding
- [ ] Component showcase page displays all components
- [ ] Existing components updated to use shadcn/ui
- [ ] Toast notifications configured and working
- [ ] TypeScript types properly configured
- [ ] Dark mode support working (if applicable)
- [ ] All components responsive and accessible

## Testing Checklist
- [ ] All components render without errors
- [ ] Forms validate correctly with react-hook-form
- [ ] Toast notifications appear correctly
- [ ] Theme colors match Farcaster branding
- [ ] Components work in MiniKit environment
- [ ] Keyboard navigation works properly
- [ ] Screen reader accessibility verified
- [ ] Mobile responsive behavior confirmed

## Performance Considerations
- [ ] Tree-shaking working (only imported components bundled)
- [ ] CSS purging configured correctly
- [ ] No duplicate styles or conflicting classes
- [ ] Component bundle size reasonable

## Resources
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Primitives](https://www.radix-ui.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod Schema Validation](https://zod.dev)

## Notes
- shadcn/ui components are copied into the project, not installed as a dependency
- This allows full customization of components
- Components use Radix UI primitives for accessibility
- All components follow WAI-ARIA guidelines

## Next Steps
After completing this ticket:
1. Begin authentication integration using the new UI components
2. Create consistent form patterns across the application
3. Establish component composition patterns
4. Document component usage patterns for team