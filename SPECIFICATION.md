# SaaS Micro-Feedback & Changelog Widget

## Project Title & Description
SaaS Micro-Feedback & Changelog Widget is a lightweight full-stack web application designed for indie developers to communicate product updates, gather actionable feedback, and allow public users to vote on feature requests. 

The application features a public-facing feed for changelogs and user suggestions, alongside an authenticated admin dashboard for developers to manage feature statuses and log new releases.

## Purpose & Target Audience
- **Target Audience:** Indie developers, small software teams, and their end-users.
- **Purpose:** Eliminate the complexity of building custom feedback infrastructure by providing a single, clean platform to share release notes and collect prioritized user requests.

## User Stories
1. **As an Admin/Developer**, I want to sign in securely so that I can manage changelogs and feature request statuses.
2. **As an Admin/Developer**, I want to publish, edit, and delete changelogs so that users stay updated on product releases.
3. **As a Public User**, I want to view product updates so that I know what features have been recently shipped.
4. **As a Public User**, I want to submit feature requests so that the developer knows what I want built.
5. **As a Public User**, I want to upvote existing feature requests so that popular ideas rise to the top.
6. **As an Admin/Developer**, I want to change request statuses (*Planned*, *In Progress*, *Completed*) so that users know the development roadmap.

## Acceptance Criteria

### Story 1 & 2: Admin Authentication & Changelog CRUD
- **Given** an authenticated admin, **when** they fill out and submit the changelog form, **then** a new release note is published to the public feed.
- **Given** an unauthenticated visitor, **when** they attempt to access `/admin`, **then** the system redirects them to the login page.
- **Given** an admin, **when** they click "Delete" on a changelog, **then** the item is removed or soft-deleted from the feed with UI confirmation.

### Story 4 & 5: Feature Request Submission & Upvoting
- **Given** a public user, **when** they submit a feature request title and description, **then** it appears on the public board under the "Unsorted" or "Under Review" tab.
- **Given** a public user, **when** they click the upvote button on a request, **then** the vote count increments immediately without a full page refresh.
- **Given** empty required fields in the request form, **when** submitted, **then** the form blocks submission and displays inline validation error messages.

### Story 6: Status Management
- **Given** an admin on the dashboard, **when** they change a request's status from "Planned" to "In Progress", **then** the change updates in the database and reflects on the public roadmap view.

## Technical Requirements
- **Framework:** Next.js (App Router)
- **Language:** TypeScript in strict mode (no `any`)
- **Styling:** Tailwind CSS (utility-first)
- **Database:** PostgreSQL with Prisma / Supabase (or MongoDB)
- **Authentication:** Auth.js v5 or Clerk
- **Architecture:** Server Components for data fetching by default; Client Components for interactive upvotes/forms.

## Core API Endpoints
- `GET /api/changelogs` — Fetch published release notes
- `POST /api/changelogs` — Create new changelog entry (Admin only)
- `PUT /api/changelogs/:id` — Update changelog entry (Admin only)
- `DELETE /api/changelogs/:id` — Delete/soft-delete changelog entry (Admin only)
- `GET /api/requests` — Fetch feature requests with vote counts
- `POST /api/requests` — Submit a new feature request
- `PATCH /api/requests/:id/upvote` — Increment vote count for a request
- `PATCH /api/requests/:id/status` — Update status tag (Admin only)

## Implementation Priority
- **P0 (MVP / Core Deliverables):** Admin Auth, Changelog CRUD, Public Feature Request board, Upvoting API handler.
- **P1:** Status tags filter (*Planned*, *In Progress*, *Completed*), Search & sort requests by votes.
- **P2:** Embeddable JS script widget for external sites, email notifications on status change.