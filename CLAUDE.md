# CLAUDE.md — UIUC Bus Tracker

## Project Overview
A real-time bus tracker for UIUC using the CUMTD API (v2.2).
- **Goal:** High-performance Mapbox-based tracker.
- **Priority:** Mobile-first (PWA) but desktop compatible.
- **Hosting:** Vercel (Frontend + Serverless Functions).

## Tech Stack
- **Framework:** React + Vite + Tailwind CSS.
- **Mapping:** Mapbox GL JS.
- **Data Fetching:** TanStack Query (React Query) for 30s polling/caching.
- **Testing:** Vitest for unit/integration tests.
- **Language:** Strict TypeScript (no `any`, explicit interfaces).

## Development Commands
- **Dev:** `npm run dev`
- **Build:** `npm run build`
- **Test:** `npm run test`
- **Lint:** `npm run lint`

## Coding Standards & Patterns
- **Architecture:** - Frontend components in `src/components`.
  - API logic in `api/` (Vercel Serverless Functions) to proxy requests and hide keys.
  - Custom hooks in `src/hooks` for CUMTD data fetching.
- **Styles:** Utility-first CSS using Tailwind.
- **TypeScript:** Use strict mode. Define interfaces for all API responses (referenced from `docs/`).
- **Error Handling:** Gracefully handle missing API keys (throw clear errors if `CUMTD_API_KEY` or `MAPBOX_TOKEN` are missing).
- **Map Logic:** Use a singleton pattern or a dedicated context for the Mapbox instance to prevent memory leaks during re-renders.

## Git Workflow
- Use **Conventional Commits**:
  - `feat: ...` for new features.
  - `fix: ...` for bugs.
  - `test: ...` for adding tests.
  - `refactor: ...` for code changes that neither fix a bug nor add a feature.
- **Micro-commits:** Commit after completing a single logical unit (e.g., "feat: setup vercel proxy function").

## Contextual Priorities
1. **MVP First:** Get the map running and display real-time bus locations (via `GetVehicles`).
2. **Docs:** Always refer to `docs/` folder for CUMTD API specifications before guessing endpoints.
3. **Efficiency:** Use `staleTime` and `refetchInterval` in React Query to manage the 1,000 req/hour API limit.
