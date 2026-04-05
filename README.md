# Roni

A desktop-first productivity app that brings tasks, calendar, and deep focus into one fluid workspace. Dark theme, glass-morphism UI, spring-physics animations — built for people who care about how their tools feel, not just what they do.

## What it does

Roni helps you get through your day without the usual friction:

- **Smart task stream** — tasks automatically sort into Today, Upcoming, Anytime, and Someday. No manual triaging, no inbox anxiety.
- **Unified calendar** — drag a task onto a time slot and it becomes a scheduled block. Events and tasks live in one view.
- **Focus mode** — full-screen Pomodoro timer that tracks sessions and builds a flow score over time. Minimal distractions by design.
- **Insights** — see your focused hours, completion trends, and flow score. Simple charts, no dashboard bloat.
- **Keyboard-first** — ⌘K quick-add, shortcuts for navigation, everything reachable without touching the mouse.

## Screenshots

*Coming soon — the app is in active beta.*

## Tech stack

| Layer | What we use |
|-------|------------|
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + custom CSS variables |
| Components | shadcn/ui (Radix primitives) |
| Animation | Motion (spring physics only, no ease curves) |
| Drag & Drop | @dnd-kit/react |
| Client state | Zustand |
| Server state | TanStack Query (optimistic updates) |
| Backend | Supabase (Postgres, Auth, Realtime, RLS) |
| Fonts | Manrope (display) + Inter (body) via next/font |
| Icons | lucide-react |

## Design

The UI follows what I'm calling **Liquid Glass** — a dark-theme design system built around these ideas:

- **No hard borders.** Sections are separated by tonal surface shifts, not `1px solid` lines.
- **Glass surfaces** with `backdrop-filter: blur(20px)` and layered opacity.
- **Light-leak accents** — subtle 1px top-strokes with primary color at low opacity give surfaces a lit-from-above feel.
- **Spring animations everywhere** — hover, expand, collapse, drag. No `ease-in-out`, only physics-based springs with configurable stiffness/damping.
- **Indigo-violet palette** — electric indigo (#6366F1) to vibrant violet (#8B5CF6) gradient for CTAs and accents against deep charcoal surfaces.

## Getting started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project (free tier works fine)

### Setup

```bash
git clone https://github.com/yngbabysq/Roni.git
cd Roni
npm install
```

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Supabase setup

The app expects these tables in your Supabase database: `tasks`, `events`, `projects`, `focus_sessions`. All tables should have RLS enabled with policies scoped to `auth.uid() = user_id`.

For the smoothest registration experience, disable **email confirmation** in Supabase:
Authentication → Providers → Email → turn off "Confirm email".

## Project structure

```
src/
  app/
    (marketing)/     — landing page
    (auth)/          — login & register
    (app)/           — main app (protected by middleware)
  components/
    ui/              — glass cards, shadcn components
    layout/          — sidebar, top bar
    tasks/           — task cards, lists, quick-add button
  hooks/             — data fetching hooks (useTasks, useEvents, etc.)
  lib/               — Supabase clients, server actions, utilities
  stores/            — Zustand stores (UI state, focus timer)
  types/             — TypeScript interfaces
```

## Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npx vitest` | Run tests (watch mode) |
| `npx vitest run` | Run tests once |

## Roadmap

- [x] Landing page with animations
- [x] Auth (email + Google + Apple OAuth)
- [x] Task CRUD with smart scheduling
- [x] App shell (sidebar, navigation, views)
- [ ] Calendar view with drag-to-schedule
- [ ] Focus timer with session tracking
- [ ] Insights dashboard
- [ ] Drag-and-drop task reordering
- [ ] Onboarding flow
- [ ] i18n (Russian first, then others)

## License

This project is not open-source for commercial use. Personal use and contributions welcome — just reach out first.
