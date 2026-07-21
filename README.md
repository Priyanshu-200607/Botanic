# 🌿 Botanic2 - Multi-Vendor Botanical Marketplace

> A high-performance, multi-vendor e-commerce platform tailored for botanical products. Built with a scalable microservices-inspired architecture utilizing Next.js 16, FastAPI, and Supabase.

Botanic2 is a specialized marketplace designed to connect local nurseries and micro-sellers with plant enthusiasts. It features a unique **zero-fee manual QR payment verification system**, comprehensive Role-Based Access Control (RBAC), and a robust backend designed for high concurrency and zero race-conditions during inventory checkouts.

---

## ✨ Key Features

- **Multi-Vendor Ecosystem**: Granular Role-Based Access Control (RBAC) supporting 3 distinct user roles: `Admin`, `Seller`, and `Buyer`. Sellers can manage their own stores, inventory, and orders.
- **Zero-Fee Manual Payment Flow**: Instead of traditional payment gateways (Stripe/Razorpay), the platform utilizes a secure QR payment proof upload system. Admins verify uploads to approve orders, saving sellers 2-3% in transaction fees.
- **Race-Condition-Proof Checkout**: Uses atomic PostgreSQL Remote Procedure Calls (RPCs) to decrement stock, ensuring inventory is never oversold during high-traffic events.
- **Advanced State Management**: Seamless cart, checkout, and UI interactions powered by Zustand and TanStack Query, eliminating unnecessary API polling.
- **Comprehensive Admin & Seller Dashboards**: Full control over store approvals, product moderation (hide/delete), audit logging, and platform analytics.
- **Secure Cloud Storage**: Private and public bucket routing via Supabase for user avatars, product images, and highly secure payment proofs.

---

## 🛠 Tech Stack

### **Frontend**
- **Framework**: Next.js 16 (App Router) & React 19
- **Styling**: Tailwind CSS (Premium Glassmorphic UI)
- **State Management**: Zustand (Global) + TanStack Query (Server State)
- **Data Fetching**: Axios / Fetch API

### **Backend**
- **Framework**: FastAPI (Python 3.10+)
- **Database ORM**: async SQLAlchemy
- **Data Validation**: Pydantic
- **Background Tasks**: Redis + ARQ
- **Architecture Standard**: Clean Architecture (Routers → Services → Repositories)

### **Infrastructure & Database**
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth (JWT verified backend)
- **Storage**: Supabase Storage
- **Deployment target**: Render (Backend Docker containers) + Vercel (Frontend)

---

## 🏗 Architecture & System Design

Botanic2 enforces **Clean Architecture** principles on the backend to ensure scalability and maintainability:

1. **Routers Layer**: Handles HTTP requests/responses and JWT authorization.
2. **Services Layer**: Encapsulates core business logic.
3. **Repositories Layer**: Abstracts all direct database operations.
4. **Models Layer**: SQLAlchemy database definitions perfectly mirrored with Supabase's SQL schema.

### Database Highlights
- 15+ heavily normalized tables with composite indexing.
- Postgres Triggers for syncing Supabase Auth users to public `users` tables automatically.
- Idempotent wishlist toggling and atomic inventory management.

---

## 📂 Project Structure

```text
Botanic2/
├── frontend/             # Next.js 16 UI application
│   ├── src/
│   │   ├── app/          # App router pages (Public, Auth, Dashboard)
│   │   ├── components/   # Reusable UI components
│   │   ├── services/     # API integration layer (TanStack Query)
│   │   └── store/        # Zustand state stores
│   └── tailwind.config.ts
│
├── backend/              # FastAPI Application
│   ├── app/
│   │   ├── core/         # Config, Security, Database, Exceptions
│   │   ├── models/       # SQLAlchemy DB Models
│   │   ├── schemas/      # Pydantic validation schemas
│   │   ├── repositories/ # Database query abstraction
│   │   ├── services/     # Business logic
│   │   └── api/          # FastAPI routers
│   └── main.py           # Application entry point
│
└── ...docs               # MASTER_PLAN.md, status reports, and DB schemas
```

---

## 🚀 Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/botanic2.git
cd botanic2
```

### 2. Frontend Setup
```bash
cd frontend
npm install
# Copy env file and fill in Supabase credentials
cp .env.example .env.local 
npm run dev
```

### 3. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
# Copy env file and configure PostgreSQL URI & Supabase secrets
cp .env.example .env
uvicorn app.main:app --reload
```

---

## 📊 Current Project Status

The project is actively in the **mid-development phase**. 
- **Frontend**: ~90% complete. Premium UI/UX, dashboards, and complex checkout flows are fully designed and implemented with mock data, ready for backend integration.
- **Backend**: Core architecture is set. Database schema is fully designed and optimized. Currently implementing the Clean Architecture layers (Services/Repositories) and specific business endpoints.

*See `MASTER_PLAN.md` and `botanic2_status_report.md` for a detailed breakdown of the development roadmap.*
