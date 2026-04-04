# Roni — Fluid Productivity App

Desktop-first dark-theme productivity app with Liquid Glass 2026 design. English UI only.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Next.js) |
| `npm run build` | Production build |
| `npm run lint` | ESLint check |
| `npx vitest` | Run unit tests |
| `npx vitest run` | Run tests once (CI) |
| `npx vitest --run src/lib/__tests__/` | Run tests in specific directory |

## Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript 5
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss"`, NOT `@tailwind` directives) + CSS variables
- **Components:** shadcn/ui (Radix primitives) — always install via `npx shadcn@latest add <component>`
- **Animation:** Motion (`import { motion } from "motion/react"`) — spring physics only, never `ease-in-out`
- **DnD:** @dnd-kit/react + @dnd-kit/helpers (`useSortable` from `@dnd-kit/react/sortable`)
- **State:** Zustand (client stores) + TanStack Query (server state, optimistic updates)
- **Backend:** Supabase (auth, postgres, realtime, RLS)
- **Auth:** @supabase/ssr for session management
- **Deploy:** Vercel (free tier)
- **Fonts:** Manrope (display/headlines via `next/font`) + Inter (body via `next/font`)
- **Icons:** lucide-react
- **Dates:** date-fns

## Architecture

```
src/
  app/                  # Next.js App Router — pages and layouts
    (auth)/             # Login, register (public)
    (marketing)/        # Landing page (public)
    (app)/              # Main app (protected by middleware)
  components/
    ui/                 # shadcn/ui + custom Liquid Glass components
    layout/             # Sidebar, TopBar
    tasks/              # TaskCard, TaskList, TaskForm, MagicButton
    calendar/           # CalendarGrid, EventCard, DayColumn
    focus/              # PomodoroTimer, TimerControls
    insights/           # FlowScore, FocusDistribution
    onboarding/         # OnboardingStep1-3
  hooks/                # Custom React hooks (useTasks, useEvents, etc.)
  lib/                  # Supabase client, utils, constants
  stores/               # Zustand stores (useUIStore, useFocusStore, useAuthStore)
  types/                # TypeScript types and interfaces
  styles/               # Global styles, Liquid Glass CSS utilities
```

## Key Files

- `PLAN.md` — full development plan with all phases
- `stitch_roni_fluid_productivity/liquid_glass_2026/DESIGN.md` — Liquid Glass design system spec
- `PRD.md` — product requirements document
- `src/lib/supabase/client.ts` — Supabase browser client
- `src/lib/supabase/server.ts` — Supabase server client
- `src/middleware.ts` — auth middleware (protects /app/* routes)
- `src/styles/globals.css` — CSS variables, Liquid Glass utilities, design tokens

## Code Style

- NO code comments, NO JSDoc — code must be self-documenting
- Descriptive variable/function names readable by beginners
- Break complex logic into small named functions
- No clever one-liners — clarity over brevity
- All components: named exports, one component per file
- Use `"use client"` directive only when component uses hooks/browser APIs
- Server Components by default (Next.js App Router convention)
- Prefer Server Actions over API routes for mutations

## Design System — Liquid Glass 2026

**Every component must follow these rules from day one. Never "make it work first, make it pretty later."**

### Colors (CSS variables)
- `--surface-dim: #131313` (app canvas)
- `--surface-container-low: #1C1B1B` (sidebar, content areas)
- `--surface-container: #201F1F` (cards)
- `--surface-container-highest: #353534` (modals, popovers, active cards)
- `--surface-container-lowest: #0E0E0E` (deep background, sunken elements)
- `--primary: #C0C1FF` / `--primary-container: #8083FF`
- `--electric-indigo: #6366F1` / `--vibrant-violet: #8B5CF6`
- `--secondary-container: #6F00BE` (active nav pill)
- Never use `#000000` — always `--surface-container-lowest` (#0E0E0E) minimum

### No-Line Rule (STRICT)
- **NEVER** use `border: 1px solid` for section boundaries
- Boundaries via tonal shifts between surface levels
- Light-leak borders: 1px inner-glow or top-stroke with `outline_variant` at 20% opacity
- Ghost borders for accessibility: `outline_variant` at 10% opacity only when visually necessary
- No dividers between list items — use 12px vertical spacing

### Glass Effects
- `backdrop-filter: blur(20px)` on all secondary surfaces
- Refractive edge: 1px top-stroke `primary_fixed_dim` at 15% opacity
- Ambient shadows: `box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4)` — diffused, not harsh
- CTA gradients: `--primary` → `--primary-container`

### Typography
- Display/headlines: Manrope, tight letter-spacing (-0.02em)
- Body/functional: Inter, 0.875rem
- Metadata labels: ALL-CAPS, 5% letter-spacing, `label-sm`
- Create contrast between large Manrope headlines and small tracked-out labels

### Motion (spring physics ONLY)
- Import: `import { motion } from "motion/react"`
- `fluidExpand: { stiffness: 400, damping: 30 }` — task expand/collapse
- `wobble: { damping: 15 }` — drag effects
- `bounce: { damping: 0.7, stiffness: 120 }` — general interactions
- Hover: scale 1.02x with back-out easing
- Task completion: scale → opacity → remove (juicy spring)

## Environment

Required in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key (server-side only)

## Supabase

- All tables have RLS enabled — every policy uses `auth.uid() = user_id`
- Use Supabase MCP tools for database operations when available
- Migrations via Supabase Dashboard or MCP
- Realtime subscriptions for live updates (tasks, events)

## i18n Readiness

MVP is English-only, but Russian and other languages are planned post-MVP. During MVP:
- Keep all UI strings as plain string literals in components (easy to extract later)
- No string concatenation for user-facing text — use template literals or separate strings
- No hardcoded text buried deep in logic — keep it at the JSX level
- Don't add i18n libraries yet — just write i18n-friendly code

## Gotchas

- Tailwind CSS v4 uses `@import "tailwindcss"` — NOT `@tailwind base/components/utilities`
- Motion library: import from `"motion/react"`, NOT `"framer-motion"`
- @dnd-kit: use `@dnd-kit/react` (not `@dnd-kit/core`) — `useSortable` from `@dnd-kit/react/sortable`
- shadcn/ui components go in `src/components/ui/` — install via CLI, then customize
- Supabase auth: use `@supabase/ssr` for Next.js, not `@supabase/auth-helpers-nextjs` (deprecated)
- Next.js App Router: layouts don't re-render on navigation — put dynamic data in page components
- `"use client"` boundary: everything imported by a client component becomes client-side
- Zustand stores: define outside components, use selectors to prevent re-renders
- TanStack Query: wrap mutations with optimistic updates for instant UI feedback
- Free tier limits: Supabase (500MB DB, 1GB storage), Vercel (100GB bandwidth)

## Skills Usage

Use these skills at the specified moments during development:

### Always Before Implementation
- **`superpowers:brainstorming`** — before creating any new feature, component, or page. Explore intent and design before code
- **`superpowers:writing-plans`** — before multi-step tasks. Write the plan, then execute

### During Implementation
- **`frontend-design`** — when building any UI component, page, or layout. Generates polished, production-grade interfaces
- **`ui-ux-pro-max`** — for complex UI/UX decisions: layout architecture, interaction patterns, responsive behavior, color/typography choices
- **`context7`** (MCP) — before using ANY library API. Always fetch current docs for Next.js, React, Tailwind, shadcn/ui, Motion, @dnd-kit, Supabase, TanStack Query, Zustand, date-fns, lucide-react. Training data may be outdated
- **`superpowers:executing-plans`** — when executing a written plan step by step
- **`superpowers:subagent-driven-development`** — when plan has independent tasks that can run in parallel
- **`superpowers:dispatching-parallel-agents`** — for 2+ independent tasks without shared state

### After Implementation
- **`simplify`** (code-simplifier) — after writing any chunk of code. Review for reuse, quality, efficiency
- **`superpowers:verification-before-completion`** — before claiming work is done. Run verification commands, confirm output
- **`superpowers:requesting-code-review`** — after completing a feature or major step
- **`superpowers:finishing-a-development-branch`** — when implementation is complete and tests pass

### Debugging
- **`superpowers:systematic-debugging`** — when encountering ANY bug, test failure, or unexpected behavior. Diagnose before fixing

### Testing
- **`superpowers:test-driven-development`** — when implementing critical logic (timer, calendar overlap, date utils, folder filtering)

### Code Review
- **`superpowers:receiving-code-review`** — when receiving review feedback. Verify technically before implementing suggestions

### Git & PRs
- **`superpowers:using-git-worktrees`** — when starting feature work needing isolation
- **`claude-md-management:revise-claude-md`** — after learning something non-obvious about the project

## Workflow

1. Read PLAN.md for current phase before starting work
2. Use `superpowers:brainstorming` before building any new feature
3. Use `context7` MCP to fetch docs for every library before writing code
4. Use `frontend-design` skill for all UI work
5. Apply Liquid Glass design system rules to every component from the start
6. Optimistic UI for all mutations — never wait for server response to update UI
7. Test critical logic (date utils, timer, overlap algorithm) with Vitest
8. Use `simplify` after each completed chunk of work
9. Verify before claiming completion
