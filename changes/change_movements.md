# Change Movements Log

## [1] Created: backend/app/main.py

**Date:** 2026-06-04
**Action:** Created
**File:** `backend/app/main.py`
**Changes:**
- FastAPI entry point with CORS middleware
- Included routers for matches, teams, timeline, dashboard, and map
- Added health check endpoint

## [2] Created: backend/app/db.py

**Date:** 2026-06-04
**Action:** Created
**File:** `backend/app/db.py`
**Changes:**
- DuckDB in-memory connection setup
- Created views for results, shootouts, goalscorers, and former_names CSV files
- Added indexes on date and team columns for performance

## [3] Created: backend/app/routers/matches.py

**Date:** 2026-06-04
**Action:** Created
**File:** `backend/app/routers/matches.py`
**Changes:**
- API endpoints for listing matches with pagination and filters
- Endpoint for match detail with goals and shootout data

## [4] Created: backend/app/routers/teams.py

**Date:** 2026-06-04
**Action:** Created
**File:** `backend/app/routers/teams.py`
**Changes:**
- API endpoints for team listing, profile, matches, rivals, and scorers

## [5] Created: backend/app/routers/timeline.py

**Date:** 2026-06-04
**Action:** Created
**File:** `backend/app/routers/timeline.py`
**Changes:**
- API endpoint for timeline events with decade and tournament filters

## [6] Created: backend/app/routers/dashboard.py

**Date:** 2026-06-04
**Action:** Created
**File:** `backend/app/routers/dashboard.py`
**Changes:**
- API endpoints for dashboard stats and trends

## [7] Created: backend/app/routers/map.py

**Date:** 2026-06-04
**Action:** Created
**File:** `backend/app/routers/map.py`
**Changes:**
- API endpoints for map countries and country-specific matches

## [8] Created: backend/app/schemas/match.py

**Date:** 2026-06-04
**Action:** Created
**File:** `backend/app/schemas/match.py`
**Changes:**
- Pydantic models for MatchBase, MatchDetail, Goal, Shootout, and MatchListResponse

## [9] Created: backend/app/schemas/team.py

**Date:** 2026-06-04
**Action:** Created
**File:** `backend/app/schemas/team.py`
**Changes:**
- Pydantic models for TeamProfile, RivalRecord, and Scorer

## [10] Created: backend/app/schemas/stats.py

**Date:** 2026-06-04
**Action:** Created
**File:** `backend/app/schemas/stats.py`
**Changes:**
- Pydantic models for TournamentCount, DashboardStats, and TrendPoint

## [11] Created: backend/app/services/match_service.py

**Date:** 2026-06-04
**Action:** Created
**File:** `backend/app/services/match_service.py`
**Changes:**
- Match query logic with filtering, pagination, and result calculation
- Dashboard statistics and trends aggregation
- Map data queries

## [12] Created: backend/app/services/team_service.py

**Date:** 2026-06-04
**Action:** Created
**File:** `backend/app/services/team_service.py`
**Changes:**
- Team profile computation with wins, losses, draws, and goal statistics
- Rival records and top scorers queries

## [13] Created: backend/app/services/data_loader.py

**Date:** 2026-06-04
**Action:** Created
**File:** `backend/app/services/data_loader.py`
**Changes:**
- Data loading utility for DuckDB views

## [14] Created: backend/requirements.txt

**Date:** 2026-06-04
**Action:** Created
**File:** `backend/requirements.txt`
**Changes:**
- Python dependencies: fastapi, uvicorn, duckdb, pandas, pydantic

## [15] Created: backend/pyproject.toml

**Date:** 2026-06-04
**Action:** Created
**File:** `backend/pyproject.toml`
**Changes:**
- Project metadata and dependencies configuration

## [16] Created: backend/Dockerfile

**Date:** 2026-06-04
**Action:** Created
**File:** `backend/Dockerfile`
**Changes:**
- Docker image for FastAPI backend with Python 3.11

## [17] Created: frontend/package.json

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/package.json`
**Changes:**
- React 19 + Vite + TypeScript setup with Tailwind CSS v4
- Dependencies: React Router, TanStack Query, Zustand, Framer Motion, Lenis, TanStack Table, Plotly.js

## [18] Created: frontend/index.html

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/index.html`
**Changes:**
- HTML entry point for Vite application

## [19] Created: frontend/vite.config.ts

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/vite.config.ts`
**Changes:**
- Vite configuration with React and Tailwind CSS plugins

## [20] Created: frontend/tsconfig.json

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/tsconfig.json`
**Changes:**
- TypeScript configuration for React project

## [21] Created: frontend/tsconfig.node.json

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/tsconfig.node.json`
**Changes:**
- TypeScript configuration for Vite config file

## [22] Created: frontend/src/main.tsx

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/main.tsx`
**Changes:**
- React application entry point with QueryClientProvider and RouterProvider

## [23] Created: frontend/src/router.tsx

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/router.tsx`
**Changes:**
- React Router v6 configuration with four routes: Dashboard, Timeline, Team Profile, World Map

## [24] Created: frontend/src/App.tsx

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/App.tsx`
**Changes:**
- Root application component with Navbar and PitchCanvas background

## [25] Created: frontend/src/index.css

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/index.css`
**Changes:**
- Tailwind CSS v4 imports with custom color tokens for football theme

## [26] Created: frontend/src/lib/queryClient.ts

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/lib/queryClient.ts`
**Changes:**
- TanStack Query client configuration with 5-minute stale time

## [27] Created: frontend/src/lib/api.ts

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/lib/api.ts`
**Changes:**
- API client functions for all backend endpoints with query parameter support

## [28] Created: frontend/src/lib/utils.ts

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/lib/utils.ts`
**Changes:**
- Utility functions: cn (class merging), formatDate, getResultColor

## [29] Created: frontend/src/types/index.ts

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/types/index.ts`
**Changes:**
- Shared TypeScript interfaces for Match, Goal, Shootout, TeamProfile, DashboardStats

## [30] Created: frontend/src/stores/useAppStore.ts

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/stores/useAppStore.ts`
**Changes:**
- Zustand store for app state: activeTab, isLoading, sidebarOpen

## [31] Created: frontend/src/stores/useFilterStore.ts

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/stores/useFilterStore.ts`
**Changes:**
- Zustand store for filter state: dateRange, selectedTeam, selectedTournament, neutralOnly

## [32] Created: frontend/src/hooks/useMatches.ts

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/hooks/useMatches.ts`
**Changes:**
- TanStack Query hooks for matches list, match detail, and dashboard stats

## [33] Created: frontend/src/hooks/useTeams.ts

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/hooks/useTeams.ts`
**Changes:**
- TanStack Query hooks for teams, team profile, matches, rivals, and scorers

## [34] Created: frontend/src/hooks/useTimeline.ts

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/hooks/useTimeline.ts`
**Changes:**
- TanStack Query hooks for timeline and trends data

## [35] Created: frontend/src/hooks/useMapData.ts

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/hooks/useMapData.ts`
**Changes:**
- TanStack Query hooks for map countries and country matches

## [36] Created: frontend/src/components/layout/Navbar.tsx

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/components/layout/Navbar.tsx`
**Changes:**
- Navigation bar with tab links and active state indicators

## [37] Created: frontend/src/components/layout/PitchCanvas.tsx

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/components/layout/PitchCanvas.tsx`
**Changes:**
- HTML5 Canvas football field background renderer with pitch lines

## [38] Created: frontend/src/components/layout/PageWrapper.tsx

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/components/layout/PageWrapper.tsx`
**Changes:**
- Framer Motion page transition wrapper with fade and translate animations

## [39] Created: frontend/src/components/ui/KpiCard.tsx

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/components/ui/KpiCard.tsx`
**Changes:**
- Animated KPI card with count-up effect on mount

## [40] Created: frontend/src/components/ui/MatchRow.tsx

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/components/ui/MatchRow.tsx`
**Changes:**
- Table row component with W/D/L color coding

## [41] Created: frontend/src/components/ui/FilterBar.tsx

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/components/ui/FilterBar.tsx`
**Changes:**
- Filter bar with active filter tags and clear button

## [42] Created: frontend/src/components/ui/SkeletonCard.tsx

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/components/ui/SkeletonCard.tsx`
**Changes:**
- Loading skeleton placeholder component

## [43] Created: frontend/src/pages/DashboardPage.tsx

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/pages/DashboardPage.tsx`
**Changes:**
- Dashboard page with KPI cards, charts, and recent matches table

## [44] Created: frontend/src/pages/TimelinePage.tsx

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/pages/TimelinePage.tsx`
**Changes:**
- Timeline page with scrollable match events

## [45] Created: frontend/src/pages/TeamProfilePage.tsx

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/pages/TeamProfilePage.tsx`
**Changes:**
- Team profile page with stats, rivals, scorers, and match history

## [46] Created: frontend/src/pages/WorldMapPage.tsx

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/pages/WorldMapPage.tsx`
**Changes:**
- World map page with country list and match panel

## [47] Created: frontend/src/components/charts/MatchesChart.tsx

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/components/charts/MatchesChart.tsx`
**Changes:**
- Placeholder chart component for matches visualization

## [48] Created: frontend/src/components/charts/GoalsChart.tsx

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/components/charts/GoalsChart.tsx`
**Changes:**
- Placeholder chart component for goals visualization

## [49] Created: frontend/src/components/charts/MapChart.tsx

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/components/charts/MapChart.tsx`
**Changes:**
- Placeholder chart component for map visualization

## [50] Created: frontend/src/components/timeline/TimelineStrip.tsx

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/components/timeline/TimelineStrip.tsx`
**Changes:**
- Placeholder timeline strip component

## [51] Created: frontend/src/components/timeline/TimelineEvent.tsx

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/src/components/timeline/TimelineEvent.tsx`
**Changes:**
- Placeholder timeline event component

## [52] Created: frontend/Dockerfile

**Date:** 2026-06-04
**Action:** Created
**File:** `frontend/Dockerfile`
**Changes:**
- Docker image for React frontend with Node.js 20

## [53] Created: docker-compose.yml

**Date:** 2026-06-04
**Action:** Created
**File:** `docker-compose.yml`
**Changes:**
- Docker Compose development configuration with hot-reload for both services

## [54] Created: docker-compose.prod.yml

**Date:** 2026-06-04
**Action:** Created
**File:** `docker-compose.prod.yml`
**Changes:**
- Docker Compose production configuration with Gunicorn workers

## [55] Created: .env

**Date:** 2026-06-04
**Action:** Created
**File:** `.env`
**Changes:**
- Environment variables for API URL and data directory

## [56] Created: .dockerignore

**Date:** 2026-06-04
**Action:** Created
**File:** `.dockerignore`
**Changes:**
- Docker ignore rules for Python and Node.js artifacts

## [57] Created: .gitignore

**Date:** 2026-06-04
**Action:** Created
**File:** `.gitignore`
**Changes:**
- Git ignore rules for dependencies, build outputs, environment files, and data

## [58] Created: backend/app/__init__.py

**Date:** 2026-06-04
**Action:** Created
**File:** `backend/app/__init__.py`
**Changes:**
- Python package initializer

## [59] Created: backend/app/routers/__init__.py

**Date:** 2026-06-04
**Action:** Created
**File:** `backend/app/routers/__init__.py`
**Changes:**
- Python package initializer

## [60] Created: backend/app/schemas/__init__.py

**Date:** 2026-06-04
**Action:** Created
**File:** `backend/app/schemas/__init__.py`
**Changes:**
- Python package initializer

## [61] Created: backend/app/services/__init__.py

**Date:** 2026-06-04
**Action:** Created
**File:** `backend/app/services/__init__.py`
**Changes:**
- Python package initializer


## [62] Modified: backend/app/services/match_service.py

**Date:** 2026-06-04
**Action:** Modified
**File:** ackend/app/services/match_service.py
**Changes:**
- Added LRU caching for heavy aggregation queries (dashboard stats, map countries)
- Improved performance with functools.lru_cache decorator

## [63] Created: backend/tests/test_api.py

**Date:** 2026-06-04
**Action:** Created
**File:** ackend/tests/test_api.py
**Changes:**
- pytest test suite for all API endpoints
- Tests for health check, matches, teams, dashboard, trends, and map endpoints

## [64] Created: frontend/Dockerfile.prod

**Date:** 2026-06-04
**Action:** Created
**File:** rontend/Dockerfile.prod
**Changes:**
- Multi-stage production Docker build with Nginx

## [65] Created: frontend/nginx.conf

**Date:** 2026-06-04
**Action:** Created
**File:** rontend/nginx.conf
**Changes:**
- Nginx configuration for serving static files and proxying API requests

## [66] Created: frontend/src/components/ui/ErrorBoundary.tsx

**Date:** 2026-06-04
**Action:** Created
**File:** rontend/src/components/ui/ErrorBoundary.tsx
**Changes:**
- React error boundary component with fallback UI

## [67] Created: frontend/src/hooks/useLenis.ts

**Date:** 2026-06-04
**Action:** Created
**File:** rontend/src/hooks/useLenis.ts
**Changes:**
- Lenis smooth scroll hook integration

## [68] Modified: frontend/src/App.tsx

**Date:** 2026-06-04
**Action:** Modified
**File:** rontend/src/App.tsx
**Changes:**
- Added ErrorBoundary wrapper around application
- Integrated Lenis smooth scroll via useLenis hook

