# Kiwik Project Configuration

## Project Overview

**kiwik** is a Farcaster-native MiniKit application implementing the **FruteroKit Design System** for the Frutero Club ecosystem. This document outlines the complete project configuration and development standards.

## 🎨 Design System Configuration

### FruteroKit Integration Status
- ✅ **OKLCH Color System**: Fully implemented with primary/secondary/accent colors
- ✅ **Typography System**: Funnel Display, Space Grotesk, Raleway, Ledger fonts configured
- ✅ **Layout Architecture**: Page/Container/Section structure implemented
- ✅ **Component Patterns**: Rounded buttons, card styles, spacing system
- ✅ **CSS Variables**: All design tokens available in CSS custom properties

### Required Design Assets
- **Fonts**: Funnel Display, Space Grotesk (Google Fonts), Raleway (Google Fonts), Ledger
- **Colors**: OKLCH-based palette with verde vibrante, naranja energético, verde menta
- **Icons**: Lucide React (exclusive icon library)
- **Images**: Frutero Club logos, brand assets

## 🛠️ Technical Stack Configuration

### Core Framework
```json
{
  "framework": "Next.js 15+",
  "language": "TypeScript",
  "styling": "TailwindCSS + FruteroKit",
  "ui_library": "shadcn/ui + FruteroKit",
  "package_manager": "bun"
}
```

### Key Dependencies
```json
{
  "design_system": [
    "tailwindcss",
    "tailwindcss-animate", 
    "clsx",
    "tailwind-merge"
  ],
  "ui_components": [
    "lucide-react",
    "class-variance-authority"
  ],
  "farcaster": [
    "@farcaster/frame-sdk",
    "@coinbase/onchainkit"
  ],
  "database": [
    "@prisma/client",
    "@supabase/supabase-js"
  ],
  "state_management": [
    "@tanstack/react-query",
    "zustand"
  ]
}
```

### Environment Configuration
```bash
# Core App
NEXT_PUBLIC_URL=
NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME=kiwik

# Database
DATABASE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Cache
REDIS_URL=
REDIS_TOKEN=

# Blockchain
NEXT_PUBLIC_ONCHAINKIT_API_KEY=
BASE_RPC_URL=

# Authentication (Future)
PRIVY_APP_ID=
PRIVY_APP_SECRET=

# Farcaster Integration (Future)
NEYNAR_API_KEY=
FARCASTER_HUB_URL=

# Token Creation (Future)
CLANKER_API_KEY=
CLANKER_API_URL=
```

## 📁 File Structure Standards

```
kiwik/
├── app/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── layout/         # Layout components
│   │   ├── auth/           # Authentication components
│   │   └── features/       # Feature-specific components
│   ├── globals.css         # FruteroKit CSS implementation
│   ├── layout.tsx          # Root layout with fonts
│   └── page.tsx            # Landing page
├── lib/
│   ├── fonts.ts            # Font configuration
│   ├── utils.ts            # Utility functions
│   └── prisma.ts           # Database client
├── public/
│   ├── docs/               # Project documentation
│   │   ├── guidelines/     # Design and development guidelines
│   │   ├── todos/          # Implementation tickets
│   │   └── implementation-plans/
│   └── fonts/              # Custom font files (when available)
├── prisma/
│   └── schema.prisma       # Database schema
└── tailwind.config.ts      # FruteroKit + shadcn/ui config
```

## 🎯 Development Standards

### Component Development Rules
1. **MANDATORY**: Follow FruteroKit design guidelines
2. **MANDATORY**: Use TypeScript for all components
3. **MANDATORY**: Implement responsive design (mobile-first)
4. **MANDATORY**: Use Lucide React icons exclusively
5. **MANDATORY**: Follow PageWrapper → Container → Section layout

### Code Quality Standards
```json
{
  "linting": "ESLint + Prettier",
  "type_checking": "TypeScript strict mode",
  "testing": "Jest + React Testing Library (planned)",
  "formatting": "Prettier with project config"
}
```

### Git Workflow
```bash
# Branch naming
feat/feature-name          # New features
fix/bug-description        # Bug fixes  
docs/documentation-update  # Documentation
style/design-system-update # Design system changes

# Commit format
type(scope): description

# Examples:
feat(auth): implement Farcaster authentication
fix(ui): correct button hover states
docs(design): update FruteroKit guidelines
style(colors): implement OKLCH color system
```

## 🔧 Build & Deployment Configuration

### Build Scripts
```json
{
  "dev": "next dev",
  "build": "next build", 
  "start": "next start",
  "lint": "next lint",
  "lint:fix": "next lint --fix",
  "type-check": "tsc --noEmit",
  "design-check": "FruteroKit compliance check + type-check"
}
```

### Deployment Requirements
- **Platform**: Vercel (optimized for Next.js)
- **Environment**: Farcaster MiniKit compatible
- **Performance**: <2 second load time target
- **Compatibility**: Mobile-first, touch-friendly

## 📊 Quality Gates

### Pre-commit Checks
- [ ] TypeScript compilation successful
- [ ] ESLint passes without errors
- [ ] FruteroKit design compliance
- [ ] Component responsive behavior verified
- [ ] No hard-coded colors or fonts used

### Pre-merge Requirements
- [ ] All acceptance criteria met
- [ ] Code review approved
- [ ] Design system compliance verified
- [ ] Documentation updated
- [ ] No breaking changes introduced

## 🎨 Design System Compliance

### Mandatory Requirements
1. **Color Usage**: Only FruteroKit OKLCH colors
2. **Typography**: Only FruteroKit font hierarchy
3. **Layout**: PageWrapper structure required
4. **Components**: shadcn/ui + FruteroKit patterns
5. **Icons**: Lucide React exclusively
6. **Spacing**: FruteroKit spacing system
7. **Buttons**: Always `rounded-full`
8. **Responsiveness**: Mobile-first approach

### Prohibited Patterns
- ❌ Hard-coded colors (use design tokens)
- ❌ Custom fonts (use FruteroKit hierarchy)
- ❌ Fixed layouts (use responsive patterns)
- ❌ Non-Lucide icons
- ❌ Square buttons (must be rounded-full)
- ❌ Inline styles (use Tailwind classes)

## 🚀 Performance Targets

### Core Web Vitals
- **LCP** (Largest Contentful Paint): <2.5s
- **FID** (First Input Delay): <100ms
- **CLS** (Cumulative Layout Shift): <0.1

### Bundle Size Targets
- **Initial Load**: <500KB gzipped
- **Total Bundle**: <2MB
- **Font Loading**: Optimized with `font-display: swap`

### MiniKit Requirements
- **Mobile Performance**: <2s load on 3G
- **Touch Targets**: Minimum 44px
- **Viewport**: Optimized for mobile viewports
- **Loading States**: Comprehensive loading UX

## 🔐 Security Configuration

### Authentication (Planned)
- **Primary**: Privy with Farcaster SIWF
- **Wallet**: MetaMask, Coinbase Wallet support
- **Session**: Secure token management
- **API**: Rate limiting and validation

### Data Protection
- **Database**: Row-level security (RLS)
- **API Routes**: Input validation and sanitization
- **Environment**: Secure variable management
- **Privacy**: GDPR compliance ready

## 📈 Monitoring & Analytics

### Performance Monitoring
- **Vercel Analytics**: Core Web Vitals tracking
- **Error Tracking**: Sentry integration (planned)
- **User Analytics**: Privacy-focused analytics
- **Performance**: Real User Monitoring (RUM)

### Health Checks
- **Build Status**: Automated build monitoring
- **Dependency Security**: Automated vulnerability scanning
- **Performance**: Lighthouse CI integration
- **Accessibility**: axe-core automated testing

## 🤖 Automation

### GitHub Actions (Planned)
```yaml
workflows:
  - name: "Quality Check"
    triggers: [push, pull_request]
    jobs:
      - lint_and_type_check
      - design_system_compliance
      - performance_audit
      - security_scan

  - name: "Deploy"
    triggers: [push to main]
    jobs:
      - build_and_deploy
      - post_deploy_tests
```

### Pre-commit Hooks (Planned)
- ESLint + Prettier formatting
- TypeScript type checking
- FruteroKit compliance check
- Commit message format validation

## 📚 Documentation Standards

### Required Documentation
- [ ] Component props and usage examples
- [ ] API route documentation
- [ ] Environment setup instructions
- [ ] Design system implementation notes
- [ ] Deployment and maintenance guides

### Documentation Tools
- **Markdown**: All documentation in Markdown
- **Code Examples**: TypeScript examples required
- **Screenshots**: Design implementation examples
- **Diagrams**: Architecture and flow diagrams

---

**Configuration Version**: 1.0  
**Last Updated**: 2025-07-25  
**Maintained by**: kiwik Development Team

*This configuration enforces FruteroKit design system compliance and Farcaster MiniKit best practices across the entire development lifecycle.*