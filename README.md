# ChainSentinel AI — Supply Chain Risk Intelligence

> **Tagline**: *“Predict supply-chain disruptions before they stop production.”*

An enterprise B2B SaaS platform engineered for discrete and process manufacturers, procurement directors, global logistics operators, and supply-chain leaders.

---

## 🏗️ Architecture: Frontend & Backend Separation

The repository is organized into distinct `frontend` and `backend` modules:

```text
BharatChain AI/
├── frontend/                   # React 19 + TypeScript + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── copilot/        # AI Supply Chain Copilot Drawer
│   │   │   ├── landing/        # Commercial Marketing Landing Page
│   │   │   ├── layout/         # Sidebar, TopNav, Notifications
│   │   │   ├── views/          # 12 Core Enterprise Modules
│   │   │   └── common/         # Toast & Modal Components
│   │   ├── context/            # AppContext (Currency, State, Navigation)
│   │   ├── data/               # Rich domain mock dataset
│   │   ├── types/              # Domain TypeScript interfaces
│   │   └── utils/              # Currency & risk formatters
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── backend/                    # Node.js + Express + TypeScript API Server
│   ├── src/
│   │   ├── routes/             # RESTful API Route Handlers
│   │   │   └── api.ts          # /api/health, /api/overview, /api/suppliers...
│   │   ├── data/               # 52 Suppliers, 102 Parts, 20 Plants, 30 Products
│   │   ├── types/              # TypeScript Domain Contracts
│   │   └── server.ts           # Express Application Entrypoint
│   ├── package.json
│   └── tsconfig.json
│
└── package.json                # Workspace script orchestrator
```

---

## 🚀 Running the Project

### 1. Run Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev      # Local Dev server at http://localhost:5173/
npm run build    # Production bundle compile
npm run preview  # Production preview
```

### 2. Run Backend (Express API Server)
```bash
cd backend
npm install
npm run dev      # Dev server with hot-reload at http://localhost:5000/
npm run build    # Compile to JavaScript in dist/
npm run start    # Start production API server
```

### 3. Root Workspace Shortcuts
From the project root:
- `npm run dev:frontend` — Start frontend dev server
- `npm run dev:backend` — Start backend API server
- `npm run build` — Build both backend and frontend

---

## 🔌 Backend REST Endpoints

- `GET /api/health` — Service health & monitored nodes count
- `GET /api/overview` — Executive overview metrics, 30-day risk trends, user profile
- `GET /api/early-warnings` — Disruption warnings with root-cause analysis
- `GET /api/suppliers` — 52 suppliers with search, country, risk, and status filters
- `GET /api/suppliers/:id` — Single supplier profile & 7-dimension risk radar
- `GET /api/components` — 100+ components with stockout prediction telemetry
- `GET /api/factories` — 20 manufacturing plants & capacity utilization
- `GET /api/shipments` — Active logistics transit tracking & port congestion
- `POST /api/simulate` — Supply chain stress testing scenario engine
- `GET /api/alternatives` — Dual-sourcing trade-off comparison matrix
- `POST /api/copilot` — Structured AI reasoning (*Finding, Evidence, Impact, Recommendation*)
- `GET /api/alerts` — Incident alerts with 4-question framework

---

## 👤 User Profile

- **Name**: **Rohit Kumar**
- **Initials**: **RK**
- **Role**: **VP Global Supply Chain**
- **Organization**: **Bharat Mobility & Industrial Group**
