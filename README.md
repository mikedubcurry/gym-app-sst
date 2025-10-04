# Gym App

## Local Dev
- start docker desktop
- start docker mysql container 
```
docker run -d \
  --rm \
  -p 3306:3306 \
  -v $(pwd)/.sst/storage/mysql:/var/lib/mysql \
  -e MYSQL_DATABASE=gym \
  -e MYSQL_ROOT_PASSWORD=password \
  mysql:8.0
```
- start dev server `npx sst dev`

## PLANNING
Members can register for gym membership, view a fixed class schedule, and admins can CRUD classes and schedule occurrences through an admin interface. Stack: SST (IaC) + AWS, frontend React Router v7 (framework mode), backend (Node.js Lambdas) and MySQL (RDS).
### Epics & Tasks
#### Epic A — Project skeleton & infra boilerplate
Goal: Repo, SST infra, and CI/CD ready.
~~##### A1 — Init repo & monorepo skeleton (SMALL)~~
~~Create repo and folders: /web, /services/api, /infra.~~
~~Add README with run/deploy notes.
Acceptance: Developer clones repo, cd web && npm install works.~~
~~##### A2 — Setup SST & basic deploy (MEDIUM)~~
~~Install SST and scaffold a stack that deploys a simple Lambda + Api and a static site (SST ReactStaticSite or S3+CloudFront).~~
~~Configure AWS account/stage for dev.~~
~~Acceptance: sst deploy returns an API endpoint + site URL.~~
##### A3 — CI/CD (SMALL → MEDIUM)
GitHub Actions: lint, test, build, sst deploy --stage dev on merges to main.
Secure AWS keys in GH Secrets.
Acceptance: Merge triggers build + deployment.
#### Epic B — Database & schema (MySQL)
Goal: Provision RDS MySQL and implement migrations & seed data.
TODO: running db locally to save money
##### B1 — Provision RDS MySQL via SST (MEDIUM)
Create an RDS MySQL instance (or Aurora MySQL for better scaling if preferred).
Configure subnet group, security groups (allow from Lambda VPC or RDS Proxy), backups, and maintenance window.
Consider enabling RDS Proxy for Lambda connection pooling to avoid connection exhaustion.
Acceptance: RDS instance endpoint returned in SST outputs.
##### B2 — Schema design & migrations (MEDIUM)
Minimal tables for POC: users, roles, classes, class_occurrences, tenants (optional now or later).
Example MySQL DDL (see below).
Choose a migration tool: knex migrations, node-migrate, or db-migrate. (Knex is a common choice for Node + MySQL.)
Create initial migration files and seed sample classes & occurrences.
Acceptance: Migrations run; tables and seed data present.
##### B3 — DB credentials & secrets (SMALL)
Store DB credentials in AWS Secrets Manager via SST.
Grant Lambda/ecs task IAM permission to read secret (or configure RDS IAM auth).
Acceptance: Backend accesses DB using secrets manager without secrets in repo.
#### Epic C — Authentication & Authorization
Goal: Member signup/login and admin RBAC.
##### C1 — Auth provider setup (SMALL)
Use AWS Cognito (recommended) to handle signup, password reset, email verification (can be relaxed for POC).
Acceptance: Cognito user pool and app client present; can create a user.
##### C2 — Backend auth middleware (MEDIUM)
Middleware to verify Cognito JWTs (or custom JWT if you choose self-hosted).
On login, create or ensure a users row in MySQL with cognito_sub (or store cognito_user_id).
Store role in DB or in Cognito groups; enforce admin-only routes.
Acceptance: Protected endpoints reject unauthorized users.
##### C3 — Registration flow (SMALL)
Option A: Use Cognito hosted UI (fast). Option B: Implement POST /api/auth/register that creates Cognito user via AdminCreateUser or standard sign-up flow.
Acceptance: Member can register; users row is created in MySQL.
#### Epic D — Backend API
Goal: CRUD API for classes & occurrences and member-facing schedule endpoints.
##### D1 — API routes spec (SMALL)
Public/member:
POST /api/auth/register
POST /api/auth/login (if handling login server-side)
GET /api/classes — list classes + occurrences
GET /api/classes/:id — class details
Admin (protected):
GET /api/admin/classes
POST /api/admin/classes
PUT /api/admin/classes/:id
DELETE /api/admin/classes/:id
POST /api/admin/classes/:id/occurrences
PUT /api/admin/occurrences/:id
DELETE /api/admin/occurrences/:id
Acceptance: Routes exist and documented.
##### D2 — Implement API (MEDIUM)
Use Express or Fastify running in Lambda via SST Api.
Use connection pooling or RDS Proxy to manage MySQL connections.
Use parameterized queries or an ORM (Prisma supports MySQL; TypeORM is another option). Prisma is good if you want typed DB access.
Add validation (zod/Joi).
Acceptance: API passes unit/integration tests that hit DB.
##### D3 — Security basics (SMALL)
Input validation, CORS policy limiting to your frontend origin(s), API throttling (API Gateway/Lambda throttles).
Acceptance: Basic OWASP hygiene in place.
#### Epic E — Frontend (React Router v7 framework mode)
Goal: Member and admin UI to register, login, and manage/view schedule.
##### E1 — Project & routing skeleton (SMALL)
Vite React app; React Router v7 framework mode.
Routes:
/ — landing
/register, /login
/classes — schedule list
/classes/:id — class detail
/admin — admin dashboard
/admin/classes, /admin/classes/:id/occurrences
Acceptance: Navigation renders placeholders.
##### E2 — Auth pages (SMALL)
Register and login forms calling API or using Cognito flows.
Store session: For POC, localStorage or cookie; recommend httpOnly cookie if you implement server-side sessions.
Acceptance: Users can register and log in.
##### E3 — Member schedule page (MEDIUM)
GET /api/classes to display schedule grouped by date.
Nice-to-have: filters by date, class type.
Acceptance: Logged-in users can view updated schedule.
##### E4 — Admin class/schedule management (MEDIUM)
CRUD forms to create/edit classes and occurrences.
Confirmation dialogs for deletes.
Acceptance: Admin changes reflect in GET /api/classes for members.
##### E5 — UX polish (SMALL)
Loading states, error toasts, responsive layout.
Acceptance: UI usable on desktop and mobile.
#### Epic G — Testing & Local Dev
Goal: Fast dev loop and a few reliable tests.
##### G1 — Unit & integration tests (MEDIUM)
Tests for API controllers and DB layer (use a test MySQL instance or ephemeral containers).
Acceptance: Tests run in CI.
##### G2 — Local environment (SMALL)
docker-compose.yml for local MySQL (same version as RDS), sst start for local lambdas.
Document env vars in README.
Acceptance: Developer can run docker-compose up and sst start.
##### G3 — E2E smoke test (SMALL)
Cypress test: register → login → view schedule → admin create class → member sees it.
Acceptance: Smoke test passes in CI.
###### Epic I — Security & deployment hygiene
Goal: Basic security best practices for POC.
##### I1 — Secrets & IAM (SMALL)
No secrets in repo. Secrets in Secrets Manager.
Lambda roles least-privilege.
Acceptance: No credentials in git history.
##### I2 — Password hashing (if not Cognito) (SMALL)
Use bcrypt/argon2 for hashing if you store passwords.
Acceptance: No plaintext passwords stored.
##### I3 — HTTPS & CORS (SMALL)
Host web UI via S3 + CloudFront with TLS; enable correct CORS for API.
Acceptance: App served over HTTPS.
#### Epic J — Documentation & handoff
Goal: Make onboarding/troubleshooting easy.
##### J1 — Developer guide (SMALL)
How to run locally, deploy, run migrations.
Acceptance: New dev can follow README to run locally.
##### J2 — API spec (SMALL)
OpenAPI or simple markdown endpoints + payloads.
Acceptance: API spec matches implemented endpoints.
Minimal Acceptance Criteria (POC)
Member can register and log in.
Member can view class schedule (classes + occurrences).
Admin can create/edit/delete classes and occurrences.
Admin changes show immediately to members.
Application deploys to AWS via SST and uses MySQL on RDS successfully.
Suggested MySQL schema (initial migration)
You can use this with Knex or Prisma. Replace utf8mb4 if needed.
-- 001_create_core_tables.sql

CREATE TABLE roles (
  id CHAR(36) NOT NULL PRIMARY KEY,
  name VARCHAR(64) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE users (
  id CHAR(36) NOT NULL PRIMARY KEY,
  cognito_sub VARCHAR(255) DEFAULT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) DEFAULT NULL,
  name VARCHAR(255),
  role_id CHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE classes (
  id CHAR(36) NOT NULL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE class_occurrences (
  id CHAR(36) NOT NULL PRIMARY KEY,
  class_id CHAR(36) NOT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
Notes:
Use UUIDs stored as CHAR(36) (or BINARY(16) for compactness if you want to handle conversion).
Use InnoDB for transactions and FK support.
Datetime/Timezone: store UTC or store timezone info in tenant settings if needed. MySQL DATETIME has no timezone; use TIMESTAMP for UTC automatic conversion or normalize to UTC in app.
Implementation notes specific to MySQL & AWS Lambda
Connection pooling: MySQL + Lambda = risk of connection exhaustion. Use RDS Proxy (recommended) or keep a global mysql2 pool and reuse connections across Lambda invocations via the global scope, plus maxConnections tuned. SST supports wiring RDS Proxy.
Migrations: Use Knex or Prisma migrate. Prisma has great DX and supports MySQL well; it will generate schema and migrations and gives type-safe queries.
Backups and snapshots: RDS automated backups are fine for POC. Configure retention per your needs.
Pay attention to SQL dialect differences if you convert any Postgres-based SQL from earlier drafts.

#### Minimal recommended path to POC (priority order)
A1 — Repo skeleton
A2 — SST minimal deploy
B1 — RDS MySQL provision (with RDS Proxy)
B2 — Create migrations & seed sample classes/occurrences
C1 — Cognito user pool setup
D1 & D2 — Implement core APIs (auth register & classes endpoints)
E1-E3 — Frontend registration/login and schedule pages
G2 & G3 — Local dev with MySQL docker + smoke E2E test
