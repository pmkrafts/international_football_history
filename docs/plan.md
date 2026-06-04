# Football History Explorer — Project Execution Plan

> **Version:** 1.0  
> **Date:** 2026-06-04  
> **Source Documents:** `explainData.md`, `instructions.md`

---

## 1. Project Overview

Build an interactive web application to explore **49,016 international men's football matches** spanning from **1872 to 2025**. The app visualizes match data through four core pages: a data dashboard, an interactive timeline, team profiles, and a world map.

### Tech Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 19 + TypeScript + Vite | UI framework |
| Routing | React Router v6 | Client-side navigation |
| Data Fetching | TanStack Query (React Query) | Server state, caching, filters |
| State Management | Zustand | Lightweight global UI state |
| Animations | Lenis + Framer Motion | Smooth scroll + page transitions |
| Tables | TanStack Table | Match lists, rankings, stats |
| Charts | Plotly.js | Interactive data visualizations |
| Styling | Tailwind CSS v4 | Utility-first CSS |
| Backend | FastAPI + DuckDB | Python API with in-memory analytics |
| Containerization | Docker + Docker Compose | Development & deployment |

---

## 2. Color Scheme & Design Tokens

All colors are implemented as Tailwind CSS custom tokens.

| Role | Hex Code | Tailwind Token | Usage |
|------|----------|----------------|-------|
| Background | `#0A0F0A` | `bg-pitch` | Main page background |
| Surface / Cards | `#111B11` | `bg-surface` | Cards, modals, sidebars |
| Accent / Primary | `#00FF85` | `accent-green` | Buttons, links, highlights |
| Secondary Accent | `#FFD700` | `accent-gold` | Trophies, wins, special stats |
| Text Primary | `#F8FAF8` | `text-light` | Headings, body text |
| Text Secondary | `#A3B5A3` | `text-muted` | Subtitles, dates, metadata |
| Border | `#1F2A1F` | `border-pitch` | Card borders, dividers |
| Win | `#00FF85` | `win-green` | Win indicators |
| Loss | `#FF4D4D` | `loss-red` | Loss indicators |
| Draw | `#FFD700` | `draw-gold` | Draw indicators |

### Visual Requirements
- **Chromatic gradients** applied to hero sections, active states, and chart accents.
- **Football field background** rendered via HTML5 Canvas behind all pages — pitch lines, center circle, penalty areas.
- **Parallax page transitions** — when user clicks a tab, the new page enters from the bottom with a subtle parallax offset.
- **Microinteractions** on all interactive elements (buttons, cards, filters, table rows).

---

## 3. Dataset Architecture

The dataset consists of four interconnected CSV files located at `info/football/`.

### 3.1 File Inventory

| File | Records | Description |
|------|---------|-------------|
| `results.csv` | 49,016 | Central table — every official international match |
| `shootouts.csv` | ~2,800 | Matches that went to penalty shootouts |
| `goalscorers.csv` | ~150,000 | Every individual goal scored |
| `former_names.csv` | ~200 | Historical team name mappings |

### 3.2 Table Relationships

```
┌─────────────────┐     One-to-One      ┌─────────────────┐
│   results.csv   │ ◄─────────────────► │  shootouts.csv  │
│  (Central Hub)  │   (date+home+away)  │  (penalty wins) │
└────────┬────────┘                     └─────────────────┘
         │
         │ One-to-Many
         │ (date+home+away)
         ▼
┌─────────────────┐                     ┌─────────────────┐
│ goalscorers.csv │                     │ former_names.csv│
│  (individual    │                     │  (name lookup)  │
│    goals)       │                     └─────────────────┘
└─────────────────┘
```

| From | To | Relationship | Join Keys |
|------|----|-------------|-----------|
| `results` | `shootouts` | One-to-One | `date` + `home_team` + `away_team` |
| `results` | `goalscorers` | One-to-Many | `date` + `home_team` + `away_team` |
| `results` | `former_names` | Many-to-One (Lookup) | `home_team` / `away_team` → `current` |
| `shootouts` | `goalscorers` | Indirect | Via `results` |

### 3.3 Column Reference

**results.csv**
- `date` (YYYY-MM-DD), `home_team`, `away_team`, `home_score`, `away_score`
- `tournament`, `city`, `country`, `neutral` (TRUE/FALSE)

**shootouts.csv**
- `date`, `home_team`, `away_team`, `winner`, `first_shooter`

**goalscorers.csv**
- `date`, `home_team`, `away_team`, `team`, `scorer`, `own_goal`, `penalty`

**former_names.csv**
- `current`, `former`, `start_date`, `end_date`

---

## 4. Project Structure

```
football-history-explorer/
├── backend/
│   ├── app/
│   │   ├── main.py                 # FastAPI entry point
│   │   ├── routers/
│   │   │   ├── matches.py          # Match listing & detail endpoints
│   │   │   ├── teams.py            # Team profile & stats endpoints
│   │   │   ├── timeline.py         # Timeline aggregation endpoint
│   │   │   ├── dashboard.py        # Dashboard KPI endpoints
│   │   │   └── map.py              # Geo-data endpoint
│   │   ├── schemas/
│   │   │   ├── match.py            # Pydantic match models
│   │   │   ├── team.py             # Pydantic team models
│   │   │   └── stats.py            # Pydantic stats models
│   │   ├── services/
│   │   │   ├── match_service.py    # Match query logic
│   │   │   ├── team_service.py     # Team stats computation
│   │   │   └── data_loader.py      # CSV → DuckDB initialization
│   │   └── db.py                   # DuckDB connection manager
│   ├── data/                       # CSV files (mounted at runtime)
│   ├── Dockerfile
│   ├── requirements.txt
│   └── pyproject.toml
│
├── frontend/
│   ├── src/
│   │   ├── main.tsx                # Vite entry point
│   │   ├── App.tsx                 # Root with Router + Providers
│   │   ├── router.tsx              # Route definitions
│   │   ├── index.css               # Tailwind imports + custom tokens
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx      # Tab navigation with active indicator
│   │   │   │   ├── PageWrapper.tsx # Animation wrapper for route transitions
│   │   │   │   └── PitchCanvas.tsx # Football field background renderer
│   │   │   ├── ui/
│   │   │   │   ├── KpiCard.tsx     # Dashboard stat card
│   │   │   │   ├── MatchRow.tsx    # Table row with W/D/L coloring
│   │   │   │   ├── FilterBar.tsx   # Global filter controls
│   │   │   │   └── SkeletonCard.tsx # Loading placeholder
│   │   │   ├── charts/
│   │   │   │   ├── MatchesChart.tsx
│   │   │   │   ├── GoalsChart.tsx
│   │   │   │   └── MapChart.tsx
│   │   │   └── timeline/
│   │   │       ├── TimelineStrip.tsx
│   │   │       └── TimelineEvent.tsx
│   │   ├── pages/
│   │   │   ├── DashboardPage.tsx   # KPIs + charts + recent matches
│   │   │   ├── TimelinePage.tsx    # Scrollable history timeline
│   │   │   ├── TeamProfilePage.tsx # Team stats + match history
│   │   │   └── WorldMapPage.tsx    # Choropleth map + country drill-down
│   │   ├── hooks/
│   │   │   ├── useMatches.ts       # TanStack Query hooks
│   │   │   ├── useTeams.ts
│   │   │   ├── useTimeline.ts
│   │   │   └── useMapData.ts
│   │   ├── stores/
│   │   │   ├── useAppStore.ts      # Zustand: theme, nav state
│   │   │   └── useFilterStore.ts   # Zustand: date, team, tournament filters
│   │   ├── lib/
│   │   │   ├── api.ts              # API client functions
│   │   │   ├── queryClient.ts      # TanStack Query client config
│   │   │   └── utils.ts            # Formatters, color helpers
│   │   └── types/
│   │       └── index.ts            # Shared TypeScript interfaces
│   ├── public/
│   ├── index.html
│   ├── Dockerfile
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── docker-compose.yml              # Orchestrates backend + frontend
├── docker-compose.prod.yml         # Production variant with Nginx
├── .env                            # Environment variables
├── .dockerignore
├── .gitignore
└── README.md
```

---

## 5. Backend API Specification (FastAPI + DuckDB)

### 5.1 Database Initialization (`db.py`)

```python
# Pseudocode for DuckDB setup
import duckdb

con = duckdb.connect(":memory:")
con.execute("CREATE VIEW results AS SELECT * FROM read_csv_auto('data/results.csv')")
con.execute("CREATE VIEW shootouts AS SELECT * FROM read_csv_auto('data/shootouts.csv')")
con.execute("CREATE VIEW goalscorers AS SELECT * FROM read_csv_auto('data/goalscorers.csv')")
con.execute("CREATE VIEW former_names AS SELECT * FROM read_csv_auto('data/former_names.csv')")

# Indexes for performance
con.execute("CREATE INDEX idx_results_teams ON results(date, home_team, away_team)")
con.execute("CREATE INDEX idx_results_date ON results(date)")
```

### 5.2 Endpoint Design

| Method | Endpoint | Query Parameters | Returns |
|--------|----------|-----------------|---------|
| `GET` | `/api/health` | — | Service status |
| `GET` | `/api/matches` | `page`, `limit`, `team`, `tournament`, `date_from`, `date_to`, `neutral` | Paginated match list with W/D/L result |
| `GET` | `/api/matches/{date}/{home}/{away}` | — | Single match detail with goals & shootout |
| `GET` | `/api/teams` | `search`, `limit` | List of unique team names |
| `GET` | `/api/teams/{name}` | — | Team profile: total matches, wins, draws, losses, goals for/against, former names |
| `GET` | `/api/teams/{name}/matches` | `page`, `limit`, `opponent`, `tournament` | Paginated match history for team |
| `GET` | `/api/teams/{name}/rivals` | `limit` | Head-to-head records vs top opponents |
| `GET` | `/api/teams/{name}/scorers` | `limit` | Top goalscorers for the team |
| `GET` | `/api/timeline` | `decade`, `tournament` | Key events per year/decade |
| `GET` | `/api/stats/dashboard` | `date_from`, `date_to` | KPIs: total matches, total goals, avg goals/match, top tournaments, highest scoring match |
| `GET` | `/api/stats/trends` | `group_by` (year/decade) | Time-series: matches per period, goals per period |
| `GET` | `/api/map/countries` | — | Match count per country (host) |
| `GET` | `/api/map/countries/{country}/matches` | `page`, `limit` | Matches hosted in specific country |

### 5.3 Pydantic Schemas (Key Models)

```python
class MatchBase(BaseModel):
    date: date
    home_team: str
    away_team: str
    home_score: int
    away_score: int
    tournament: str
    city: str
    country: str
    neutral: bool

class MatchDetail(MatchBase):
    result: Literal["win", "loss", "draw"]  # from home perspective
    goals: list[Goal] | None
    shootout: Shootout | None

class TeamProfile(BaseModel):
    name: str
    former_names: list[str]
    total_matches: int
    wins: int
    draws: int
    losses: int
    goals_for: int
    goals_against: int
    first_match: date
    latest_match: date

class DashboardStats(BaseModel):
    total_matches: int
    total_goals: int
    avg_goals_per_match: float
    top_tournaments: list[TournamentCount]
    highest_scoring_match: MatchBase
    most_active_decade: str
```

---

## 6. Frontend Page Specifications

### 6.1 Dashboard Page (`/`)

**Layout:**
- Hero section with animated KPI cards (total matches, total goals, teams, tournaments)
- Row of 2 charts: `Matches per Decade` (bar) + `Goals per Year` (line)
- Row of 2 charts: `Top Tournaments` (pie) + `Win Distribution` (donut)
- Recent matches table (last 50 matches) with sortable columns

**Data Sources:**
- `GET /api/stats/dashboard`
- `GET /api/stats/trends?group_by=decade`
- `GET /api/matches?limit=50&sort=date_desc`

**Interactions:**
- KPI cards animate counting up on page load
- Chart hover shows detailed tooltips
- Clicking a tournament in pie chart filters the recent matches table
- Table rows highlight on hover with `bg-surface` lift

### 6.2 Interactive Timeline Page (`/timeline`)

**Layout:**
- Full-width horizontal scrollable timeline
- Zoom levels: Decade → Year
- Event markers for key matches (highest score, finals, debut matches)
- Sticky filter bar (tournament type, team)

**Data Sources:**
- `GET /api/timeline`
- `GET /api/stats/trends?group_by=year`

**Interactions:**
- Scroll wheel zooms in/out of timeline
- Click event marker → opens match detail modal
- Drag to pan horizontally
- Filter changes re-fetch and re-render markers

### 6.3 Team Profile Page (`/team/:name`)

**Layout:**
- Header: Team name, former names badge list, flag emoji, lifetime record (W-D-L)
- Stat grid: matches, goals for/against, goal difference, win %
- Top rivals horizontal bar chart
- Top scorers list
- Paginated match history table

**Data Sources:**
- `GET /api/teams/{name}`
- `GET /api/teams/{name}/rivals?limit=10`
- `GET /api/teams/{name}/scorers?limit=10`
- `GET /api/teams/{name}/matches?page={n}`

**Interactions:**
- Click rival bar → navigate to head-to-head view
- Click match row → match detail modal
- Pagination with animated page transitions

### 6.4 World Map Page (`/map`)

**Layout:**
- Full-screen Plotly.js choropleth map
- Color scale: match count per country (light green → dark green → gold)
- Sidebar: top hosting countries list
- Bottom panel: matches in selected country

**Data Sources:**
- `GET /api/map/countries`
- `GET /api/map/countries/{country}/matches`

**Interactions:**
- Click country → zoom to country, load matches panel
- Hover country → tooltip with match count
- Click list item in sidebar → same as map click

---

## 7. Animation & Interaction Specification

### 7.1 Page Transitions (Parallax)

When user clicks a navigation tab:
1. Current page fades out + translates up by `40px` over `300ms` (ease-out)
2. New page enters from `translateY(100vh)` to `translateY(0)` over `500ms` with `cubic-bezier(0.22, 1, 0.36, 1)`
3. Background pitch canvas remains static (creates parallax depth)
4. Lenis smooth scroll re-initializes for new page

### 7.2 Microinteractions

| Element | Trigger | Animation |
|---------|---------|-----------|
| Nav tab | Hover | Underline grows from center, `accent-green` glow |
| Nav tab | Active | Gradient underline, subtle scale `1.02` |
| KPI Card | Hover | `translateY(-4px)`, border glows `accent-green` |
| KPI Number | Mount | Count-up from 0 over `800ms` |
| Table Row | Hover | `bg-surface` background fades in, left border `accent-green` appears |
| Button | Hover | Background shifts to chromatic gradient, scale `1.03` |
| Chart | Data update | Bars/lines animate in with stagger `50ms` |
| Filter Tag | Add | Scale from 0 + fade in, `200ms` |
| Filter Tag | Remove | Scale to 0 + fade out, `150ms` |

### 7.3 Football Field Background

**Canvas Rendering:**
- Full viewport fixed position, `z-index: -1`
- Drawn on HTML5 Canvas 2D context
- Elements: outer border, halfway line, center circle, penalty areas, goal boxes
- Line color: `#1F2A1F` (border-pitch) at 40% opacity
- No fill — transparent center
- Subtle animated grass texture (optional CSS noise overlay)

**Performance:**
- Render once on mount, not per frame
- Use `will-change: transform` on the canvas element
- Disable on mobile if FPS drops below 30

---

## 8. State Management Architecture

### 8.1 Zustand Stores

```typescript
// useAppStore.ts
interface AppState {
  activeTab: 'dashboard' | 'timeline' | 'team' | 'map';
  isLoading: boolean;
  sidebarOpen: boolean;
  setActiveTab: (tab: AppState['activeTab']) => void;
}

// useFilterStore.ts
interface FilterState {
  dateRange: [Date | null, Date | null];
  selectedTeam: string | null;
  selectedTournament: string | null;
  neutralOnly: boolean;
  setDateRange: (range: FilterState['dateRange']) => void;
  setTeam: (team: string | null) => void;
  clearFilters: () => void;
}
```

### 8.2 TanStack Query Configuration

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,    // 5 minutes
      gcTime: 10 * 60 * 1000,      // 10 minutes
      refetchOnWindowFocus: false,
    },
  },
});
```

---

## 9. Docker & DevOps

### 9.1 Development (`docker-compose.yml`)

```yaml
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app
      - ./info/football:/app/data
    environment:
      - DEBUG=1
    command: uvicorn app.main:app --reload --host 0.0.0.0

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - VITE_API_URL=http://localhost:8000
    command: npm run dev
```

### 9.2 Production (`docker-compose.prod.yml`)

- Backend: Gunicorn + Uvicorn workers (4 workers)
- Frontend: Nginx serving static build, proxying `/api` to backend
- Optional: Cloudflare CDN for static assets

---

## 10. Execution Roadmap

### Phase 1: Scaffolding & Docker (Day 1–2)
- [ ] Initialize FastAPI backend structure (`main.py`, `db.py`, routers, schemas, services)
- [ ] Initialize React + Vite + TypeScript frontend
- [ ] Configure Tailwind CSS with custom color tokens
- [ ] Write `docker-compose.yml` with hot-reload for both services
- [ ] Verify Docker containers start and communicate

### Phase 2: Backend API & Data Layer (Day 3–5)
- [ ] Implement DuckDB CSV loading and view creation
- [ ] Add database indexes on `date`, `home_team`, `away_team`
- [ ] Build all API endpoints with query parameters
- [ ] Write Pydantic response schemas
- [ ] Test endpoints with `curl`/HTTPie; verify joins are correct
- [ ] Add in-memory response caching for heavy aggregations

### Phase 3: Frontend Foundation (Day 6–7)
- [ ] Set up React Router v6 with four routes
- [ ] Configure TanStack Query client
- [ ] Create Zustand stores (`useAppStore`, `useFilterStore`)
- [ ] Build `Navbar` component with tab navigation
- [ ] Build `PitchCanvas` football field background
- [ ] Implement page transition wrapper with parallax animation
- [ ] Create shared UI components: `KpiCard`, `FilterBar`, `SkeletonCard`

### Phase 4: Page Implementation (Day 8–12)
- [ ] **Dashboard Page**: KPIs, charts (Plotly.js), recent matches table
- [ ] **Timeline Page**: Horizontal scrollable timeline, zoom, event markers
- [ ] **Team Profile Page**: Header stats, rivals chart, scorers list, match table
- [ ] **World Map Page**: Choropleth map, country sidebar, match panel
- [ ] Wire all pages to backend APIs via TanStack Query hooks

### Phase 5: Polish & Animations (Day 13–14)
- [ ] Integrate Lenis smooth scroll
- [ ] Refine page transition timing and easing
- [ ] Add microinteractions (hover states, count-up numbers, card lifts)
- [ ] Apply chromatic gradients to hero sections and active states
- [ ] Add loading skeletons and error boundaries
- [ ] Implement responsive breakpoints (mobile, tablet, desktop)

### Phase 6: Testing & Deployment (Day 15)
- [ ] Backend: pytest for all endpoints
- [ ] Frontend: Vitest for utilities, React Testing Library for components
- [ ] Performance audit: virtualize long lists, lazy-load charts, debounce filters
- [ ] Production Docker build (`docker-compose.prod.yml`)
- [ ] Write `README.md` with setup, architecture, and API docs
- [ ] Final end-to-end smoke test

---

## 11. Risk Register

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|------------|
| DuckDB slow on 49K+ row joins | High | Low | Create indexes; materialize views for aggregations |
| Plotly.js bundle size too large | Medium | Medium | Lazy-load chart components; code-split per page |
| Canvas background causes jank | Medium | Low | Render once; use `transform3d`; disable on low-end devices |
| Parallax transitions feel sluggish | Medium | Low | Use `will-change`; respect `prefers-reduced-motion` |
| Team name inconsistencies across CSVs | High | Low | Normalize via `former_names.csv`; fuzzy match on API |
| Mobile table UX breaks | Medium | Medium | Horizontal scroll tables; collapse to cards on small screens |

---

## 12. Acceptance Criteria

- [ ] All four pages are accessible via navbar tabs with smooth parallax transitions
- [ ] Dashboard displays correct KPIs and interactive charts
- [ ] Timeline spans 1872–2025 with zoom and filter capabilities
- [ ] Team profile loads for any team in the dataset with accurate stats
- [ ] World map colors countries by match count and allows drill-down
- [ ] Football field canvas renders behind all content without performance degradation
- [ ] All animations respect `prefers-reduced-motion`
- [ ] Application is fully responsive down to 375px width
- [ ] Docker Compose brings up the full stack with one command
- [ ] Backend API returns correct data for all documented endpoints

---

## 13. Reference Documents

| Document | Location | Purpose |
|----------|----------|---------|
| Dataset Guide | `explainData.md` | CSV schema, relationships, column definitions |
| Tech Stack & Design | `instructions.md` | Technology choices, color scheme, folder structure, visual requirements |
| API Docs | `backend/README.md` (to be created) | Endpoint details, query parameters |
| Setup Guide | `README.md` (to be created) | Installation, Docker commands, environment variables |
