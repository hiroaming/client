# HIROAM - eSIM Marketplace

## Project Overview

HIROAM is an Indonesian eSIM (electronic SIM card) marketplace that enables users to purchase and manage eSIM packages for international travel connectivity. The platform supports multiple payment methods including cryptocurrency (Solana) and traditional payment options.

**Primary Language**: Indonesian (Bahasa Indonesia)
**Target Market**: Indonesian travelers needing international data connectivity

## Tech Stack

### Core Framework
- **Next.js 16.0.8** - App Router architecture
- **React 19.2.1** - Latest React with Server Components
- **TypeScript 5** - Full type safety

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Sass 1.97.2** - CSS preprocessor (fixes Vercel deployment CSS issues)
- **class-variance-authority** - Component variant styling
- **tailwind-merge** - Merge Tailwind classes
- **next-themes** - Dark/light theme support

### UI Components
- **Radix UI** - Headless UI components (dialogs, dropdowns, accordions, etc.)
- **Lucide React** - Icon library
- **Heroicons** - Additional icons
- **FontAwesome** - Brand icons
- **country-flag-icons** - Country flag components
- **Sonner** - Toast notifications

### Authentication & Database
- **Supabase** - Backend as a Service
  - `@supabase/supabase-js` - Client library
  - `@supabase/ssr` - Server-side rendering support
  - PostgreSQL database with auto-generated types

### State Management
- **Zustand** - Lightweight state management
  - `cart-store.ts` - Shopping cart state (9.3KB)
  - `currency-store.ts` - Currency selection state
- **TanStack Query** - Server state management and caching

### Web3 Integration
- **Solana** - Cryptocurrency payment support
  - `@solana/web3.js` - Solana blockchain interaction
  - `@solana/wallet-adapter-*` - Wallet connection UI
  - `@solana/spl-token` - Token operations
- **Wagmi + Viem** - Ethereum/EVM wallet support

### Forms & Validation
- **React Hook Form** - Form state management
- **Zod 4** - Schema validation
- **@hookform/resolvers** - Form validation integration

### Utilities
- **date-fns** - Date formatting and manipulation
- **clsx** - Conditional className utility

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── (auth)/              # Authentication routes (grouped layout)
│   │   ├── callback/        # OAuth callback handler
│   │   ├── login/           # Login page
│   │   ├── register/        # Registration page
│   │   ├── forgot-password/ # Password reset
│   │   └── signout/         # Logout route
│   ├── (dashboard)/         # User dashboard (grouped layout)
│   │   ├── esims/           # User's eSIMs
│   │   ├── orders/          # Order history
│   │   ├── profile/         # User profile
│   │   └── settings/        # Account settings
│   ├── (public)/            # Public pages (grouped layout)
│   │   ├── about/           # About page
│   │   ├── check-order/     # Order tracking
│   │   ├── device-compatibility/ # Device checker
│   │   └── esim-info/       # eSIM information
│   ├── (store)/             # Store pages (grouped layout)
│   │   ├── cart/            # Shopping cart
│   │   ├── checkout/        # Checkout flow
│   │   ├── package/[id]/    # Package details
│   │   └── store/           # Store listings
│   │       ├── [code]/      # Country-specific packages
│   │       └── region/[code]/ # Regional packages
│   ├── globals.scss         # Global styles (Sass for Vercel compatibility)
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Landing page
│   ├── error.tsx            # Error boundary
│   ├── loading.tsx          # Loading UI
│   └── not-found.tsx        # 404 page
├── components/
│   ├── ui/                  # Shadcn UI components (Radix-based)
│   ├── layout/              # Layout components (Header, Footer)
│   ├── landing/             # Landing page components
│   ├── store/               # Store-specific components
│   ├── checkout/            # Checkout flow components
│   ├── esim/                # eSIM management components
│   ├── topup/               # Top-up components
│   └── *.tsx                # Shared components
├── lib/
│   ├── supabase/            # Supabase client configuration
│   ├── utils.ts             # Utility functions (cn helper, etc.)
│   ├── price-utils.ts       # Price calculation and formatting
│   ├── locations.ts         # Country/region data
│   ├── device-compatibility.ts # Device compatibility checker
│   ├── solana-config.ts     # Solana blockchain configuration
│   └── wagmi-config.ts      # Wagmi (Ethereum) configuration
├── providers/
│   ├── auth-provider.tsx    # Authentication context (4KB)
│   ├── theme-provider.tsx   # Dark/light theme provider
│   └── web3-provider.tsx    # Web3 wallet providers
├── stores/
│   ├── cart-store.ts        # Shopping cart Zustand store
│   └── currency-store.ts    # Currency selection store
├── types/
│   ├── database.ts          # Supabase database types (24KB)
│   ├── location.ts          # Location/country types
│   └── x402.ts              # X402 protocol types (6.3KB)
├── hooks/                   # Custom React hooks
├── services/                # API service layer
└── proxy.ts                 # API proxy configuration
```

## Architecture Patterns

### Route Organization
The app uses **Next.js Route Groups** (parentheses folders) to organize pages with shared layouts:
- `(auth)` - Authentication pages with minimal layout
- `(dashboard)` - User account pages with dashboard navigation
- `(public)` - Public marketing/info pages with full header/footer
- `(store)` - E-commerce pages with store-specific features

### Data Fetching
- **Server Components** - Default for all pages, fetch data server-side
- **TanStack Query** - Client-side data fetching with caching
- **Supabase SSR** - Server-side rendering with Supabase auth

### State Management Strategy
- **Zustand** for client-side global state (cart, currency)
- **TanStack Query** for server state (API data, caching)
- **React Context** for auth and theme
- **URL state** for filters, pagination

### Component Composition
- **Shadcn UI pattern** - Copy/paste components in `components/ui/`
- **Radix UI primitives** - Headless components for accessibility
- **Server/Client separation** - Use `"use client"` directive sparingly

## Key Conventions

### File Naming
- Components: `kebab-case.tsx` (e.g., `bordered-container.tsx`)
- Pages: `page.tsx` (Next.js convention)
- Layouts: `layout.tsx` (Next.js convention)
- Routes: `route.ts` (API routes)

### Import Aliases
```typescript
@/* → src/*
```

### Styling
- Use Tailwind utility classes first
- SCSS files for complex animations and global styles
- `cn()` helper for conditional classes (from `lib/utils.ts`)
- Custom Tailwind theme in `globals.scss` with CSS variables

### TypeScript
- Strict mode enabled
- Database types auto-generated from Supabase
- Zod schemas for runtime validation
- Prefer interfaces over types for objects

### Component Patterns
```typescript
// Server Component (default)
export default function ServerPage() {
  const data = await fetchData()
  return <div>{data}</div>
}

// Client Component
"use client"
export function ClientComponent() {
  const [state, setState] = useState()
  return <div>{state}</div>
}

// Component with variants (CVA)
const buttonVariants = cva("base-classes", {
  variants: {
    variant: {
      default: "default-classes",
      outline: "outline-classes"
    }
  }
})
```

## Environment Variables

Required environment variables (create `.env.local`):
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Solana (if using crypto payments)
NEXT_PUBLIC_SOLANA_RPC_URL=your_rpc_url
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta|devnet

# Other API keys as needed
```

## Development Workflow

### Getting Started
```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

### Development Server
- Runs on `http://localhost:3000`
- Hot module replacement enabled
- TypeScript errors shown in terminal

## Database Schema

The project uses Supabase PostgreSQL with auto-generated TypeScript types in `src/types/database.ts` (24KB). Key tables likely include:
- Users/profiles
- eSIM packages
- Orders
- Transactions
- Locations/countries

## Known Issues & Fixes

### CSS Not Applied in Vercel Production
**Issue**: Some CSS styles (especially flexbox properties) were being dropped during minification in Vercel deployments.

**Root Cause**: Next.js CSS minification bug with nested CSS selectors ([GitHub Discussion](https://github.com/vercel/next.js/discussions/52018))

**Solution**: Migrated from CSS to Sass (`.scss`)
- Installed `sass` package
- Renamed `globals.css` → `globals.scss`
- Updated import in `layout.tsx`
- Sass preprocessor handles nesting more reliably before Next.js minification

### Wallet Modal Z-Index
Fixed in `globals.scss:162-177` - Solana wallet adapter modals appear above Radix UI dialogs using `z-index: 100 !important`

## Special Features

### Multi-Currency Support
- Currency switcher in header
- Zustand store manages selected currency
- Price utilities handle conversion and formatting

### Device Compatibility Checker
- `/device-compatibility` route
- Checks if user's device supports eSIM
- Brand-specific pages for detailed compatibility

### Dual Payment Methods
- Traditional checkout flow
- Cryptocurrency (Solana) wallet integration
- Ethereum/EVM support via Wagmi

### Animations
Custom animations in `globals.scss`:
- `@keyframes breathe` - Floating flag animation
- `@keyframes emergeFromCenter` - Flag entrance effect
- `@keyframes scroll` - Payment processor carousel

## SEO & Metadata

Comprehensive metadata in `app/layout.tsx`:
- Open Graph tags
- Twitter Card support
- Indonesian locale (`id_ID`)
- Keywords optimized for Indonesian eSIM market

## Performance Considerations

### Image Optimization
- Next.js Image component
- Remote patterns allowed for all HTTPS hosts
- Lazy loading by default

### Code Splitting
- Route-based automatic splitting
- Dynamic imports for heavy components
- Wallet adapters loaded conditionally

### Caching Strategy
- TanStack Query for API response caching
- Supabase real-time subscriptions for live data
- Static generation for marketing pages

## Testing & Debugging

### Development Tools
- React DevTools compatible
- Next.js Fast Refresh
- TypeScript strict checking
- ESLint configuration

### Common Debug Points
- Check browser console for Supabase auth errors
- Verify wallet connection in Web3 provider
- Monitor TanStack Query cache in DevTools
- Check Zustand store state in Redux DevTools

## Deployment

### Vercel Deployment (Recommended)
- Push to main branch triggers deployment
- Environment variables set in Vercel dashboard
- Preview deployments for all PRs
- **Use Sass for CSS to avoid minification bugs**

### Build Output
- Static optimization for public pages
- Dynamic rendering for authenticated routes
- API routes deployed as serverless functions

## Contributing Guidelines

### Code Style
- Use Prettier for formatting (if configured)
- Follow existing component patterns
- Use TypeScript strict mode
- Keep components focused and small

### Git Workflow
- Main branch: `master`
- Feature branches: `feat/feature-name`
- Bug fixes: `fix/bug-description`
- Recent commits show active development on store UI and device compatibility

### Component Development
- Put shared components in `components/`
- Put page-specific components next to `page.tsx`
- Use Radix UI for new interactive components
- Export reusable utilities to `lib/`

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)
- [Supabase Docs](https://supabase.com/docs)
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)
- [Zustand](https://github.com/pmndrs/zustand)
- [TanStack Query](https://tanstack.com/query/latest)

## Project Status

Active development focused on:
- Brand compatibility features (recent commit)
- Store page UI improvements (recent commit)
- Landing page updates (recent commit)
- Transaction handling (recent commit: "feat: tx base stuck")
