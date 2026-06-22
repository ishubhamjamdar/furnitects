# Furnitects Partner Operations Platform

Production website for **Furnitects** — custom wardrobe catalog, instant quote calculator, and WhatsApp confirmation flow.

**Tagline:** *Dream it, we'll design it.*

## Links

| | URL |
|---|---|
| **GitHub** | [github.com/ishubhamjamdar/furnitects](https://github.com/ishubhamjamdar/furnitects) |
| **Live demo** | Deploy via Vercel (see below) or run locally |

[![View on GitHub](https://img.shields.io/badge/View%20on%20GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ishubhamjamdar/furnitects)

## Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | Next.js 16, TypeScript, Tailwind CSS |
| Backend  | Express, TypeScript, Zod            |

## Quick Start

```bash
# Install root + workspace dependencies
npm install
cd backend && npm install && cd ../frontend && npm install && cd ..

# Backend env (optional — defaults work for local dev)
cp backend/.env.example backend/.env

# Frontend env (optional)
cp frontend/.env.local.example frontend/.env.local

# Run both servers
npm run dev
```

- **Frontend:** http://localhost:3000  
- **Backend API:** http://localhost:4000  

## Project Structure

```
furnitects/
├── frontend/          # Next.js app (landing, catalog, quote calculator)
├── backend/           # Express API (quotes, pricing, WhatsApp)
├── agents.md          # Agent roles & deliverables spec
└── package.json       # Root scripts (concurrently)
```

## API Endpoints

| Method | Path                  | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/health`             | Health check             |
| GET    | `/api/config`         | Brand & WhatsApp config  |
| GET    | `/api/quotes/catalog` | Catalog styles + prices  |
| POST   | `/api/quotes`         | Generate instant quote   |
| GET    | `/api/quotes/:id`     | Retrieve quote by ID     |

### Example quote request

```bash
curl -X POST http://localhost:4000/api/quotes \
  -H "Content-Type: application/json" \
  -d '{
    "designType": "sliding-3-door",
    "dimensions": { "height": 210, "width": 120, "length": 60, "unit": "cm" },
    "customization": { "materials": "standard", "finish": "standard" }
  }'
```

## Mock Pricing (swap for real cost sheet)

Pricing lives in `backend/src/services/pricing.ts`. Base prices are configurable via env:

```env
PRICE_HINGED_2_DOOR=18000
PRICE_SLIDING_3_DOOR=32000
PRICE_WALK_IN=65000
PRICE_MODULAR=22000
PRICE_CUSTOM_BASE=35000
```

The mock engine scales price by volume vs a reference size (210×120×60 cm) and adds customization surcharges.

## WhatsApp Integration

Quotes include a pre-filled `wa.me` link to **+91 98819 84488**. Message template is built in `backend/src/services/whatsapp.ts`.

## Pages & Sections

1. **Hero** — "Dream it, we'll design it." + CTAs  
2. **Catalog** — 4 wardrobe styles + Custom Design  
3. **Quote Calculator** — 3-step flow (select → dimensions → quote + WhatsApp)  
4. **Process** — 6-step timeline  
5. **Why Furnitects** — value props + competitive positioning  
6. **Footer** — Yash Bagmar, Pune office, contact details  

## Production Build

```bash
npm run build
npm run start
```

Deploy frontend to Vercel and backend to Railway/Render/Fly.io. Set `NEXT_PUBLIC_API_URL` to your API origin and `CORS_ORIGIN` to your frontend URL.

### One-click deploy (recommended)

The Next.js app includes built-in API routes (`/api/quotes`), so you can deploy **only the `frontend/` folder** to [Vercel](https://vercel.com/new/clone?repository-url=https://github.com/ishubhamjamdar/furnitects&project-name=furnitects&root-directory=frontend) — no separate backend needed for the live demo.

## Contact

**Yash Bagmar**, Director  
Office No 910, Apex Business Court, Pune – 411037  
+91 98819 84488 · support@furnitects.com · furnitects.com
