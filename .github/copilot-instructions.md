# GitHub Copilot Custom Instructions: ProductHub (SaaS Micro-Feedback & Changelog Widget)

## Project Overview

ProductHub is a full-stack Next.js (App Router) application that enables indie software developers to publish release changelogs, collect feature suggestions, and allow public users to upvote requests on a roadmap.

## Core Architecture & Directory Layout

- **Framework:** Next.js (App Router) + TypeScript in strict mode.
- **Styling:** Tailwind CSS (utility-first, developer terminal aesthetic using dark slate and emerald accents).
- **Database & Auth:** Neon PostgreSQL + Auth.js v5 / Clerk.
- **Icons:** Lucide React (`lucide-react`).

```
app/
├── (auth)/             # Authentication routes (Login, Register)
├── (public)/           # Public views (Feed, Projects Directory, Single Project Board)
├── admin/              # Authenticated Admin Dashboard & Console
├── api/                # Route handlers for Changelogs & Feature Requests
components/
├── ui/                 # Reusable low-level UI elements (Badges, Modals, Buttons)
├── layout/             # Header, Navigation, Footer components
├── features/           # Feature-specific components (UpvoteButton, StatusSelector)
lib/                    # DB connection (Neon PostgreSQL), Auth setup, and utility functions
types/                  # Shared TypeScript models and API payload definitions
```

## Design System & Styling Conventions

- **Theme Palette:**
  - Dark Background: `#0a0f16` (Body) / `#0d131d` (Cards, Panels, Modals)
  - Primary Accents: Emerald (`bg-emerald-400`, `text-emerald-400`, `border-emerald-500/30`)
  - Borders: Slate sub-borders (`border-slate-800/80`)
- **Typography:**
  - Standard text: Inter / sans-serif
  - Code, metrics, tags, buttons, and navigation: JetBrains Mono / monospace (`font-mono`)
- **Status Badge Guidelines:**
  - _Under Review:_ `bg-slate-800 text-slate-400 border-slate-700`
  - _Planned:_ `bg-blue-500/10 text-blue-400 border-blue-500/20`
  - _In Progress:_ `bg-amber-500/10 text-amber-400 border-amber-500/20`
  - _Completed:_ `bg-emerald-500/10 text-emerald-400 border-emerald-500/20`
- **Utility Functions:** Use a `cn()` wrapper (`clsx` + `tailwind-merge`) when applying dynamic class names.

## Technical & React Implementation Rules

1. **Server vs. Client Components:**
   - Default to Server Components (`rsc`) for layout, page structures, and initial database data fetching.
   - Use `'use client'` strictly on interactive elements: upvote triggers, modal state toggles, and status dropdowns.
2. **Data & Mutation Requirements:**
   - Use Server Actions or API Route Handlers for mutations (`POST /api/requests`, `PATCH /api/requests/:id/upvote`, `POST /api/changelogs`).
   - **Optimistic UI:** When a public user clicks an upvote button, perform optimistic state updates so the UI count increments without waiting for a full page reload.
3. **Type Safety & Validation:**
   - Enforce strict typing. Do not use `any`.
   - Validate form submissions (e.g. required request titles, descriptions, and version strings) on both client and server side.

## Core API Contracts

- `GET /api/changelogs` & `POST /api/changelogs` (Admin Only)
- `PUT /api/changelogs/:id` & `DELETE /api/changelogs/:id` (Admin Only)
- `GET /api/requests` & `POST /api/requests`
- `PATCH /api/requests/:id/upvote` (Public upvote handler)
- `PATCH /api/requests/:id/status` (Admin status updater)

## Local Validation Commands

Ensure code compiles cleanly before committing:

- **Build App:** `npm run build`
- **Lint Code:** `npm run lint`
