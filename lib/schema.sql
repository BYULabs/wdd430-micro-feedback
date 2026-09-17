CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  website TEXT NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS feature_requests (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  votes INT NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'Under Review',
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS changelogs (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  version TEXT NOT NULL,
  title TEXT NOT NULL,
  notes TEXT[] NOT NULL,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed Projects
INSERT INTO projects (id, name, icon, author, category, website, description) VALUES
  ('proj-1', 'ProductHub', 'PH', 'alex_dev', 'Developer Tools', 'https://producthub.dev', 'A lightweight micro-feedback board and changelog widget for indie SaaS apps.'),
  ('proj-2', 'FormCraft', 'FC', 'sarah_codes', 'SaaS', 'https://formcraft.io', 'Headless drag-and-drop form builder with automatic Next.js & React hook generation.'),
  ('proj-3', 'DeployBot', 'DB', 'ship_fast', 'Developer Tools', 'https://deploybot.sh', 'Automated container deployments with health checks and Discord notifications.'),
  ('proj-4', 'Logify', 'LG', 'sam_tech', 'AI & Automation', 'https://logify.ai', 'Real-time application logging paired with automated error clustering and AI diagnostics.')
ON CONFLICT (id) DO NOTHING;

-- Seed Feature Requests
INSERT INTO feature_requests (id, project_id, title, description, votes, status, category, created_at) VALUES
  ('req-1', 'proj-1', 'Embeddable JS Widget for External Sites', 'Allow devs to embed the feedback board directly inside their web apps using an iFrame or a lightweight 3kB JS script tag.', 142, 'In Progress', 'Integrations', NOW() - INTERVAL '2 days'),
  ('req-2', 'proj-2', 'Stripe Payment Element Support in Forms', 'Enable payment fields directly inside form steps without leaving the custom checkout flow.', 115, 'Planned', 'Integrations', NOW() - INTERVAL '3 days'),
  ('req-3', 'proj-1', 'Discord & Slack Webhook Notifications', 'Automatically send a webhook message to a Discord or Slack channel whenever a user submits a new request or status changes.', 98, 'Planned', 'API & Webhooks', NOW() - INTERVAL '4 days'),
  ('req-4', 'proj-3', 'Automatic Rollback on Build Failures', 'Instantly restore the previous production container image if a newly deployed container fails health checks.', 72, 'In Progress', 'Security', NOW() - INTERVAL '7 days'),
  ('req-5', 'proj-1', 'Custom CSS & Dark Mode Customizer', 'Give admins the ability to customize brand colors and match their main product aesthetic inside the widget.', 64, 'Under Review', 'UI & Dashboard', NOW() - INTERVAL '8 days'),
  ('req-6', 'proj-4', 'Export Logs to Parquet', 'Export large log files directly in a columnar format for downstream S3 and warehouse analysis.', 45, 'Under Review', 'Integrations', NOW() - INTERVAL '10 days')
ON CONFLICT (id) DO NOTHING;

-- Seed Changelogs
INSERT INTO changelogs (id, project_id, version, title, notes, published_at) VALUES
  ('cl-1', 'proj-1', '1.2.0', 'Custom Domain Support & Performance Enhancements', ARRAY['Added custom domain CNAME routing support for enterprise tiers.', 'Optimized initial page loads with automatic image compression.', 'Fixed an issue where voting counts occasionally lagged on high-concurrency feeds.'], '2026-09-08T00:00:00.000Z'),
  ('cl-2', 'proj-2', '2.4.1', 'Multi-Step Form Logic Builder', ARRAY['Introduced conditional branching logic for multi-page surveys.', 'Added export capabilities for CSV and JSON form response payloads.'], '2026-09-02T00:00:00.000Z')
ON CONFLICT (id) DO NOTHING;