# Football History Explorer

An interactive web application to explore **49,016 international men's football matches** spanning from **1872 to 2025**.

## Features

- **Dashboard**: KPIs, interactive charts, and recent matches table
- **Timeline**: Scrollable football history from 1872 to 2025
- **Team Profiles**: Team statistics, rivals, top scorers, and match history
- **World Map**: Explore matches by host country

## Tech Stack

### Backend
- **FastAPI** - Python web framework
- **DuckDB** - In-memory analytics database
- **Pydantic** - Data validation

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v4** - Utility-first CSS
- **TanStack Query** - Server state management
- **Zustand** - Client state management
- **Framer Motion** - Animations
- **Lenis** - Smooth scrolling

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Development orchestration
- **Nginx** - Production web server

## Quick Start

### Prerequisites
- Docker and Docker Compose installed

### Development

```bash
# Clone the repository
git clone <repository-url>
cd football-history-explorer

# Start the development environment
docker-compose up
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Production

```bash
# Start the production environment
docker-compose -f docker-compose.prod.yml up
```

## Project Structure

```
football-history-explorer/
├── backend/
│   ├── app/
│   │   ├── main.py                 # FastAPI entry point
│   │   ├── db.py                   # DuckDB connection
│   │   ├── routers/                # API endpoints
│   │   ├── schemas/                # Pydantic models
│   │   └── services/               # Business logic
│   ├── tests/                      # pytest test suite
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/             # React components
│   │   ├── pages/                  # Page components
│   │   ├── hooks/                  # TanStack Query hooks
│   │   ├── stores/                 # Zustand stores
│   │   ├── lib/                    # Utilities and API client
│   │   └── types/                  # TypeScript interfaces
│   ├── tests/                      # Vitest test suite
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml              # Development
├── docker-compose.prod.yml         # Production
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/matches` | List matches with filters |
| GET | `/api/matches/{date}/{home}/{away}` | Match detail |
| GET | `/api/teams` | List teams |
| GET | `/api/teams/{name}` | Team profile |
| GET | `/api/teams/{name}/matches` | Team match history |
| GET | `/api/teams/{name}/rivals` | Team rivals |
| GET | `/api/teams/{name}/scorers` | Top scorers |
| GET | `/api/timeline` | Timeline events |
| GET | `/api/stats/dashboard` | Dashboard statistics |
| GET | `/api/stats/trends` | Time-series trends |
| GET | `/api/map/countries` | Match count by country |
| GET | `/api/map/countries/{country}/matches` | Matches in country |

## Testing

### Backend
```bash
cd backend
pytest
```

### Frontend
```bash
cd frontend
npm test
```

## Data Sources

Data sourced from [Kaggle - International football results from 1872 to 2017](https://www.kaggle.com/datasets/martj42/international-football-results-from-1872-to-2017) by Mart Jürisoo.

The dataset consists of four interconnected CSV files:
- `results.csv` - 49,016 official international matches
- `shootouts.csv` - ~2,800 penalty shootouts
- `goalscorers.csv` - ~150,000 individual goals
- `former_names.csv` - ~200 historical team name mappings

## License

MIT
