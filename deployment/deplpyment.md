# Botanic — Deployment & Security Guide

This guide walks you through the environment variables you need to configure yourself, how the Vercel (Frontend) and Render (Backend) deployment architecture works, and an in-depth review of the security mechanisms protecting your platform.

## 1. Environment Variables Configuration

Since you are managing your own keys securely, here is exactly what you need to configure in your `.env` files (and on your hosting dashboards).

### Backend (Render & Local `.env`)
The backend uses `pydantic-settings` (in `backend/app/core/config.py`) to safely load and type-check environment variables. If a required variable is missing, the backend will fail to start, preventing insecure states.

| Variable Name | Description | Where to get it |
|---|---|---|
| `ENVIRONMENT` | Set to `development` locally and `production` on Render. | Self-defined |
| `PROJECT_NAME` | e.g. `Botanic Premium Marketplace API` | Self-defined |
| `FRONTEND_URL` | The URL of your Vercel frontend (e.g. `https://botanic.vercel.app`). Used for strict CORS validation. | Vercel |
| `DATABASE_URL` | Transaction pooling connection string to Supabase PostgreSQL. Must start with `postgresql+asyncpg://`. | Supabase Dashboard (Database Settings) |
| `REDIS_URL` | URL to your Redis instance (used for Rate Limiting, Caching, and ARQ background workers). | Render Redis / Upstash |
| `SUPABASE_URL` | The API URL of your Supabase project. | Supabase (Settings > API) |
| `SUPABASE_ANON_KEY` | Public key for Supabase. | Supabase (Settings > API) |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin key for Supabase (Allows bypassing RLS). **Keep this secret.** | Supabase (Settings > API) |
| `SUPABASE_JWT_SECRET` | Used to cryptographically verify JWTs issued by Supabase Auth. **Crucial for security.** | Supabase (Settings > API) |

### Frontend (Vercel & Local `.env.local`)
Your frontend components and server actions need to know how to talk to Supabase and your Render backend.

| Variable Name | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Same as `SUPABASE_URL`. (Safe to expose to browser). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same as `SUPABASE_ANON_KEY`. (Safe to expose to browser). |
| `NEXT_PUBLIC_API_BASE_URL` | The URL of your Render backend (e.g., `https://botanic-api.onrender.com/api/v1`). |

---

## 2. Deployment Architecture: Vercel ↔ Render ↔ Supabase

When deploying to different platforms, communication flows like this:

1. **The User (Browser)**: Visits your Vercel-hosted frontend.
2. **Authentication**: The frontend uses `@supabase/supabase-js` to log the user in directly via Supabase Auth. Supabase issues a JWT back to the user's browser.
3. **API Requests (Frontend to Backend)**: 
   - When the frontend needs to fetch products, checkout, or upload a payment proof, it sends an HTTP request to your Render Backend URL (`NEXT_PUBLIC_API_BASE_URL`).
   - It attaches the Supabase JWT to the `Authorization: Bearer <token>` header.
4. **Backend Validation (Render)**:
   - Your Render backend intercepts the request.
   - It uses the `SUPABASE_JWT_SECRET` to instantly verify the JWT's cryptographic signature locally (without needing a network round-trip to Supabase).
   - Once verified, the backend executes the logic and connects to the Supabase Database (`DATABASE_URL`) via connection pooling (PgBouncer/Supavisor).
5. **Background Workers (Render)**:
   - If a heavy task is triggered (e.g., sending an email after a payment approval), the Render Backend sends the task to Redis.
   - The `botanic-worker` (also on Render) picks up the task from Redis and processes it asynchronously.

---

## 3. How Environment Variables Are Implemented in the Code

In `backend/app/core/config.py`, we implemented environment variables using `BaseSettings` from the `pydantic-settings` library. 

**Why this is the best way:**
1. **Type Safety:** If `DATABASE_URL` is supposed to be a string but gets loaded as an empty value, Pydantic immediately throws a validation error during startup.
2. **Centralization:** Every part of the app imports `settings` from `config.py` rather than using `os.getenv()` randomly scattered across files. This prevents untraceable `NoneType` errors in production.
3. **No Hardcoded Secrets:** We read the `SUPABASE_JWT_SECRET` strictly from memory, ensuring that it is never checked into Git.

---

## 4. Security & Edge Case Analysis

Is this API safe for real-world scenarios? **Yes, the foundation is built to enterprise standards**, but understanding *how* it handles edge cases is crucial.

### ✅ What We Have Secured:
* **Atomic Transactions & Overselling**: In `app/repositories/order.py`, checking out and decrementing product stock happens within a strict database transaction. If two people try to buy the last plant at the exact same millisecond, the database row-lock prevents overselling.
* **Cryptographic RBAC (Role-Based Access Control)**: Endpoints in `api/v1/admin.py` or `api/v1/dashboard.py` rely on `require_admin` or `require_seller`. The backend decrypts the JWT to mathematically prove the user's role. They cannot spoof this without your `SUPABASE_JWT_SECRET`.
* **Cross-Site Scripting (XSS) Prevention**: The custom `SanitizationMiddleware` checks all incoming JSON payloads for malicious `<script>` tags and immediately drops the connection if detected.
* **File Upload Hardening**: Users can only upload files during payment proof uploads. The `PaymentService` restricts payloads strictly to `< 5MB` and checks that the MIME type is an image. (This prevents attackers from uploading malicious `.exe` or `.sh` files to your storage).
* **Strict CORS**: The `BACKEND_CORS_ORIGINS` is configured to ONLY accept requests from your exact Vercel frontend URL. If someone tries to ping your API from a random domain, their browser will block it.
* **Strict Rate Limiting**: The API uses Redis to rate-limit users. Standard endpoints get 100 requests/minute, but sensitive endpoints (Auth, Checkout, Proof Uploads) are restricted to 20 requests/minute to prevent brute-force and DDoS spam.
* **IDOR Protection**: Every query in the repositories (like fetching orders or updating addresses) explicitly filters by `user_id`. Even if a user alters the `order_id` in the API URL, the database will return `404 Not Found` because the `user_id` doesn't match theirs.

### ⚠️ Real-World Edge Cases to Keep in Mind:
While the backend code is robust, a real-world production app faces infrastructure-level threats. Here is what you must handle on the infrastructure side:
1. **DDoS Attacks:** Render and Vercel both provide basic DDoS protection. If you expect massive scale, you might eventually want to route your API through Cloudflare for a strict Web Application Firewall (WAF).
2. **Postgres Connection Exhaustion:** Because Vercel and Serverless environments can open hundreds of concurrent connections, always use the Supabase Connection Pooler (Supavisor) URL (typically port `6543`) instead of the direct database URL (port `5432`) in your `DATABASE_URL`.
3. **Email Deliverability:** The `email.py` worker currently relies on SMTP. To ensure emails actually hit the inbox (and not spam), you will need to hook it up to a verified domain provider like Resend, SendGrid, or AWS SES.

---

## 5. CI/CD Pipeline & Multi-Branch Management

When building a real-world application across three platforms (Vercel, Render, Supabase), you need a system where changes roll out safely without breaking production. Here is how you structure your continuous integration and continuous deployment (CI/CD) and Git branches.

### Git Branching Strategy
We recommend a dual-branch strategy for stability:
- **`main` (Production):** This branch reflects what is currently live for your users. Code is only merged here when it is 100% tested and stable.
- **`develop` (Staging/Testing):** This is where you merge all new features and bug fixes. It acts as a sandbox to test your app in a production-like environment before going live.

### The CI/CD Pipeline Rollout

When you commit and push code to GitHub, here is how the updates automatically roll out to all three platforms:

#### 1. Vercel (Frontend) CI/CD
Vercel has native GitHub integration that requires zero external configuration.
- **Preview Deployments:** Whenever you push code to `develop` (or open a Pull Request), Vercel automatically builds the frontend and provides a unique "Preview URL". You can use this URL to test the new UI before it goes live.
- **Production Deployments:** When you merge `develop` into `main`, Vercel intercepts the merge and triggers a Production Build, rolling the changes out to your live domain instantly.
- *Rollback:* If a bug makes it to production, Vercel allows you to instantly revert to the previous working build with a single click in their dashboard.

#### 2. Render (Backend) CI/CD
Render also provides native GitHub integration via your `render.yaml` Blueprint.
- **Auto-Deployments:** You connect your `botanic-api` and `botanic-worker` services in Render to your GitHub repository's `main` branch. Whenever you merge into `main`, Render pulls the code, builds the `Dockerfile`, and swaps out the old containers with the new ones.
- **Zero-Downtime Deploys:** Render waits for the new API container to pass the `/health` check before routing traffic to it. If the new code crashes on startup, the deployment fails, and users remain safely on the old version.
- **Staging Backend:** You can create a second environment in Render (e.g., `botanic-api-staging`) hooked up to your `develop` branch, which uses a different testing database.

#### 3. Supabase (Database) Migrations & GitHub Integration
Supabase requires a bit more care because databases hold state (user data) and cannot be magically rolled back like code. We have created a GitHub Action file (`.github/workflows/supabase.yml`) to automate this.

**How to link your Supabase project with GitHub:**
To ensure your database updates automatically every time you push code to `main`, follow these steps:

1. **Install Supabase CLI locally** (Optional, but recommended for local dev):
   Run `npx supabase init` at the root of your project. This creates a `supabase/` folder where your migrations will live.
2. **Add GitHub Secrets:**
   Go to your GitHub Repository -> Settings -> Secrets and variables -> Actions. Add these three secrets:
   - `SUPABASE_ACCESS_TOKEN`: Generate this from your Supabase Dashboard (Account -> Access Tokens).
   - `SUPABASE_PROJECT_ID`: Your project reference ID (the 20-letter string in your Supabase URL, e.g., `abcdefghijklmnopqrst`).
   - `SUPABASE_DB_PASSWORD`: The password you set when you created the database.
3. **How it works:**
   When you make a change to your database schema, you will run `supabase db diff -f my_new_changes` (using the CLI). This creates a `.sql` file in your `supabase/migrations/` folder. You commit this file to Git.
   When you push to `main`, the GitHub Action intercepts the push, logs into your Supabase project securely, and runs `supabase db push`, executing the SQL migration automatically.

### Step-by-Step Release Workflow:
1. You finish a feature locally and push it to the `develop` branch.
2. Vercel builds a Preview URL pointing to your Render Staging API and Supabase Staging Database.
3. You test the app thoroughly on the Preview URL.
4. You open a Pull Request from `develop` to `main`.
5. Upon merging, the GitHub Action automatically applies any pending Supabase SQL migrations to the Production DB.
6. Render builds the new API and Worker containers and hot-swaps them.
7. Vercel builds the final Production frontend and updates the live domain.
