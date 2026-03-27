# Bussinillini

Real-time bus tracker for Champaign-Urbana (CUMTD) built with React, Mapbox GL, and Vercel.

![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)

## Features

- Live bus positions polled every 30 seconds via the CUMTD API
- Route polylines drawn on the map in each route's official color
- Sidebar lists only routes with buses currently running — no clutter
- Per-route toggle switches show/hide both buses and route lines together
- Mobile-friendly drawer layout, desktop sidebar

## Tech stack

| Layer | Choice |
|---|---|
| UI | React 19 + Tailwind CSS 4 |
| Map | Mapbox GL JS 3 |
| Data fetching | TanStack Query (30s polling, stale-time caching) |
| API proxy | Vercel Serverless Functions (`api/`) |
| Build | Vite 8 |
| Tests | Vitest + Testing Library |

API requests are proxied through Vercel Functions to keep the CUMTD key server-side and respect the 1,000 req/hour rate limit.

## Prerequisites

- Node.js 20+
- A [CUMTD developer API key](https://developer.mtd.org/)
- A [Mapbox access token](https://account.mapbox.com/)

## Getting started

```bash
npm install
```

Create `.env.local`:

```
CUMTD_API_KEY=your_cumtd_key
VITE_MAPBOX_TOKEN=your_mapbox_token
```

Start the dev server (Vite + Vercel Functions):

```bash
npm run dev
```

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server with live reload |
| `npm run build` | Type-check + production build |
| `npm run test` | Run Vitest unit tests |
| `npm run lint` | ESLint |
| `npm run preview` | Preview the production build locally |

## Project structure

```
api/
  vehicles.ts     # Proxy: GET /api/vehicles → CUMTD GetVehicles
  routes.ts       # Proxy: GET /api/routes   → CUMTD GetRoutes (5m cache)
  shape.ts        # Proxy: GET /api/shape    → CUMTD GetShape  (1h cache)
src/
  components/
    MapView.tsx       # Mapbox GL map, bus markers, route polylines
    RouteSidebar.tsx  # Route list with toggle switches
  hooks/
    useMtdVehicles.ts # Polls /api/vehicles every 30s
    useMtdRoutes.ts   # Fetches /api/routes once
    useMtdShapes.ts   # Batch-fetches route shapes for active vehicles
  types/
    mtd.ts        # TypeScript interfaces for CUMTD API responses
```

## Deployment

Push to a Vercel project with the environment variables set:

```
CUMTD_API_KEY=...
VITE_MAPBOX_TOKEN=...
```

Vercel auto-detects Vite and deploys the `api/` directory as Serverless Functions.
