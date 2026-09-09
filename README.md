# SaaS Micro-Feedback & Changelog Widget

A lightweight, full-stack feedback and release management widget designed for indie developers to communicate product updates, collect user suggestions, and prioritize feature requests.

---

## 👥 Team Members

- **Sebastián Iturralde** — 
  GitHub: [@itusebastian](https://github.com/itusebastian) | [Portfolio](https://byulabs.github.io/)
- **Maria Teresa Arroyo** — 
  GitHub: [@maritherecua](https://github.com/maritherecua) | [Portfolio](https://wdd430-portfolio-jade.vercel.app/)
- **Martin Cespedes** — 
  GitHub: [@martingerardoc](https://github.com/martingerardoc) | [Portfolio](https://wdd430-portfolio-iota.vercel.app/)
- **Mike Brignol** — 
  GitHub: [@mikebrignol](https://github.com/mikebrignol) | [Portfolio](https://github.com/mikebrignol/wdd430-portfolio)

---

## 📋 Project Overview

### Problem Statement

Indie developers and small product teams often lack a simple, centralized way to communicate product updates and gather structured feature feedback from users without introducing bloated third-party tools or complex infrastructure.

### Value Proposition & Solution

Our application provides an all-in-one, lightweight solution featuring a public-facing page where users can view release notes and submit/upvote feature requests, alongside an authenticated admin portal where developers can manage release logs and control feature statuses.

---

## 🛠️ Tech Stack & Requirements

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Database:** MongoDB
- **Authentication:** Auth.js v5 / Clerk
- **Hosting:** Vercel
- **Styling & Components:** Tailwind CSS / Design System Palette

---

## ✨ Core Features & UI Views

1. **Public Changelog Feed (View 1):** Timeline view of recent release notes and product announcements.
2. **Feature Request & Upvoting Board (View 2):** Community submission board where users can post ideas and upvote existing requests.
3. **Admin Portal & Dashboard (View 3):** Authenticated view for developers to create, edit, or soft-delete changelogs and update feature statuses (_Planned, In Progress, Completed_).

---

## 🚀 Setup & Local Development Instructions

### Prerequisites

- Node.js (v18+ recommended)
- npm, pnpm, or yarn
- Git

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/BYULabs/wdd430-micro-feedback.git
   cd wdd430-micro-feedback
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add the following keys:

   ```env
   DATABASE_URL="your-database-connection-string"
   NEXTAUTH_SECRET="your-auth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📡 API Documentation & Route Handlers

The application exposes standard API Route Handlers demonstrating the full Client → Server → Database lifecycle:

| Endpoint                    | Method          | Purpose                                            | Auth Required   |
| --------------------------- | --------------- | -------------------------------------------------- | --------------- |
| `/api/changelogs`           | `GET`, `POST`   | Retrieve all release logs or create a new entry.   | `POST` (Admin)  |
| `/api/changelogs/[id]`      | `PUT`, `DELETE` | Update or soft-delete a specific release log.      | Yes (Admin)     |
| `/api/requests`             | `GET`, `POST`   | Fetch community requests or submit a new proposal. | `POST` (Public) |
| `/api/requests/[id]/upvote` | `PATCH`         | Increment upvote count for a feature request.      | Public          |

---

## 🛠️ Known Issues & Future Enhancements (Phase 2)

- **Current Known Issues:** None at present.
- **Phase 2 Enhancements:**
  - Embeddable JavaScript widget snippet for third-party websites.
  - Email notifications when a tracked feature request moves to "Completed".
