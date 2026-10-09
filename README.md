## ProductHub — Micro-Feedback & Changelog

ProductHub is a full-stack app for indie software teams to share product updates and gather user feedback. Visitors can explore projects, submit feature requests, and vote on ideas. Project admins can update roadmap statuses and manage release changelogs.

## Product Demo

Start in the public project directory, open a project board, and review its requests and releases. Submit a feature request from the homepage or that project's board, then upvote a request. Sign in at `/login` to open `/admin`, change request statuses, and create, edit, or delete changelogs. Public votes update the shared count; voter identity is not stored.

## Team

- **Sebastián Iturralde** — [GitHub](https://github.com/itusebastian) · [Portfolio](https://byulabs.github.io/)
- **Maria Teresa Arroyo** — [GitHub](https://github.com/maritherecua) · [Portfolio](https://wdd430-portfolio-jade.vercel.app/)
- **Martin Cespedes** — [GitHub](https://github.com/martingerardoc) · [Portfolio](https://wdd430-portfolio-iota.vercel.app/)
- **Mike Brignol** — [GitHub](https://github.com/mikebrignol) · [Portfolio](https://github.com/mikebrignol/wdd430-portfolio)

## Stack and Views

- Next.js 16 App Router, React 19, and TypeScript
- Neon PostgreSQL via `@neondatabase/serverless`
- Auth.js v5 credentials authentication with bcrypt password hashes
- Tailwind CSS 4 and Lucide React

The main views are `/` (public feedback and changelog feed), `/projects` (project directory), `/projects/[id]` (project board), `/requests` (request list), `/login` (admin sign-in), and `/admin` (request and changelog management).

## Local Setup

### Requirements

- Node.js 20.9 or newer
- npm
- A Neon PostgreSQL database

### Install and run

1. Clone the repository and install the locked dependencies:

   ```bash
   git clone https://github.com/itusebastian/wdd430-micro-feedback.git
   cd wdd430-micro-feedback
   npm ci
   ```

2. Create `.env.local` in the project root:

   ```env
   DATABASE_URL="your-neon-connection-string"
   AUTH_SECRET="your-long-random-secret"
   ```

   Generate a secret with `openssl rand -base64 32`. Do not commit `.env.local`.

3. Run [`lib/schema.sql`](lib/schema.sql) in the Neon SQL Editor. It creates the tables and inserts the demo projects, requests, and changelogs. Its inserts use `ON CONFLICT DO NOTHING`, so they can be rerun without duplicating the seeded IDs.

4. Create an admin account interactively. The password is entered without being echoed and must be at least 12 characters:

   ```bash
   npm run create-admin
   ```

   This command uses the `DATABASE_URL` from `.env.local`; it will add a user to that database. Existing email addresses are not overwritten.

5. Start the development server and run checks:

   ```bash
   npm run dev
   npm run lint
   npm run build
   ```

Open [http://localhost:3000](http://localhost:3000).

## Render Deployment

1. Push the project to GitHub and create a Render **Web Service** connected to the repository. Select the feature branch or the branch you intend to deploy.
2. Choose the Node runtime (20.9 or newer), then configure:

   - **Build command:** `npm ci && npm run build`
   - **Start command:** `npm run start`

3. Add these environment variables in the Render service settings:

   - `DATABASE_URL` — Neon connection string
   - `AUTH_SECRET` — long random secret; generate with `openssl rand -base64 32`
   - `AUTH_TRUST_HOST` — `true` for the Render-hosted service

4. Ensure `lib/schema.sql` has been applied to the Neon database. Create the initial admin with `npm run create-admin` from a trusted local environment whose `.env.local` points to the deployment database. Do not place admin credentials in this README or in source control.
5. Deploy the service and open its `onrender.com` URL. Add the final production URL here once it is assigned: **Production URL: pending deployment**.

## API Routes

All data is stored in Neon PostgreSQL. The admin-only handlers check the Auth.js session directly; page protection alone is not relied on.

| Route                       | Method   | Access    | Behavior and payload                                                                                                                     |
| --------------------------- | -------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/projects`             | `GET`    | Public    | Returns the project directory.                                                                                                           |
| `/api/requests`             | `GET`    | Public    | Returns requests; supports `projectId`, `status`, and `search` query filters.                                                            |
| `/api/requests`             | `POST`   | Public    | Creates a request. JSON: `projectId`, `title`, `description`, `category`.                                                                |
| `/api/requests/[id]/upvote` | `PATCH`  | Public    | Applies a vote delta. JSON: `{"delta":1}` or `{"delta":-1}`. Returns the updated request and database vote count.                        |
| `/api/requests/[id]/status` | `PATCH`  | Signed in | Updates a request status. JSON: `{"status":"Planned"}`; accepted statuses are `Under Review`, `Planned`, `In Progress`, and `Completed`. |
| `/api/requests/[id]`        | `DELETE` | Signed in | Deletes a feature request.                                                                                                               |
| `/api/changelogs`           | `GET`    | Public    | Returns published changelogs.                                                                                                            |
| `/api/changelogs`           | `POST`   | Signed in | Creates a changelog. JSON: `projectId`, `version`, `title`, and `notes` (string array).                                                  |
| `/api/changelogs/[id]`      | `PUT`    | Signed in | Replaces changelog project, version, title, and notes using the same payload as `POST`.                                                  |
| `/api/changelogs/[id]`      | `DELETE` | Signed in | Deletes a changelog.                                                                                                                     |

Invalid input returns a 400 response, missing records return 404, and unauthenticated admin mutations return 401.

## Known Issues and Opportunities

- Votes are public and voter identity is not stored. A visitor can vote repeatedly, and the selected-vote state does not persist across page reloads.
- This repository does not yet record the production URL or a fresh mobile Lighthouse report. Run Lighthouse against the deployed service and include Performance, Accessibility, Best Practices, and SEO scores in the submission.
- Contrast updates have been made for the reported muted-text failures; rerun the full WCAG/Lighthouse audit on the final deployed UI.
- Future work could add a third-party embeddable widget, completion notifications, and persistent vote tracking.
