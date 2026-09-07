# SaaS Micro-Feedback & Changelog Widget

A lightweight, full-stack feedback and release management widget designed for indie developers to communicate product updates, collect user suggestions, and prioritize feature requests.

---

## 👥 Team Members

* **Sebastián Iturralde** — Team Lead / Full-Stack Integration  
  GitHub: [@itusebastian](https://github.com/itusebastian) | [Portfolio](https://byulabs.github.io/)
* **Maria Teresa Arroyo** — Frontend & UI/UX  
  GitHub: [@maritherecua](https://github.com/maritherecua) | [Portfolio](https://wdd430-portfolio-jade.vercel.app/)
* **Martin Cespedes** — Backend & Database  
  GitHub: [@martingerardoc](https://github.com/martingerardoc) | [Portfolio](https://wdd430-portfolio-iota.vercel.app/)
* **Mike Brignol** — Authentication & API Route Handlers  
  GitHub: [@mikebrignol](https://github.com/mikebrignol) | [Portfolio](https://github.com/mikebrignol/wdd430-portfolio)

---

## 📋 Project Overview

### Problem Statement
Indie developers and small product teams often lack a simple, centralized way to communicate product updates and gather structured feature feedback from users without introducing bloated third-party tools or complex infrastructure.

### Value Proposition & Solution
Our application provides an all-in-one, lightweight solution featuring a public-facing page where users can view release notes and submit/upvote feature requests, alongside an authenticated admin portal where developers can manage release logs and control feature statuses.

---

## 🛠️ Tech Stack & Requirements

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Database:** MongoDB
* **Authentication:** Auth.js v5 / Clerk
* **Hosting:** Vercel
* **Styling & Components:** Tailwind CSS / Design System Palette

---

## ✨ Core Features & UI Views

1. **Public Changelog Feed (View 1):** Timeline view of recent release notes and product announcements.
2. **Feature Request & Upvoting Board (View 2):** Community submission board where users can post ideas and upvote existing requests.
3. **Admin Portal & Dashboard (View 3):** Authenticated view for developers to create, edit, or soft-delete changelogs and update feature statuses (*Planned, In Progress, Completed*).

---

## 🚀 Setup & Local Development Instructions

### Prerequisites
* Node.js (v18+ recommended)
* npm, pnpm, or yarn
* Git

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BYULabs/wdd430-micro-feedback.git
   cd wdd430-micro-feedback