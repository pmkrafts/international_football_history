Layer,Technology,Reason
Frontend,React + TypeScript + Vite,Fast & lightweight
Routing,React Router v6 (Simple version),Sufficient since you have few pages
Data Fetching,TanStack Query,Still recommended for caching & filters
State Management,Zustand,Lightweight & clean
Animations,Lenis,Smooth scroll animations (as you requested)
Tables,TanStack Table,For match lists & rankings
Charts,Plotly.js,Best for interactive football data
Styling,Tailwind CSS,Fast styling
Backend,FastAPI + DuckDB,Python backend
Container,Docker + Docker Compose,Easy development & deployment

docker-compose.yml will contain:

Backend service (FastAPI)
Frontend service (React + Vite)
(Optional later) Nginx for production   


football-history-explorer/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── db.py                 # DuckDB connection
│   ├── data/                     # Put your CSV files here
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   ├── vite.config.ts
│   └── package.json
│
├── docker-compose.yml            # ← Main orchestrator
├── .env
└── README.md


4 pages:
1. each team profile page for there history and games played
2. Interactive timeline for all over the history from start
3. A simple dashboard for the data represeentation
4. World Map

use chromatic gradient

for page changes I want parallax effect when user click on a tab for new page the new page comes from bottom use microinteractions
the background has football field like structure using canvas or html


color scheme:
Role,Hex Code,Tailwind Name,Usage
Background,#0A0F0A,bg-pitch,Main background
Surface / Cards,#111B11,bg-surface,"Cards, sidebars, modals"
Accent / Primary,#00FF85,accent-green,"Buttons, links, highlights"
Secondary Accent,#FFD700,accent-gold,"Trophies, wins, special stats"
Text Primary,#F8FAF8,text-light,Main text
Text Secondary,#A3B5A3,text-muted,"Subtitles, dates, less important text"
Border,#1F2A1F,border-pitch,Card borders
Win,#00FF85,win-green,Win indicators
Loss,#FF4D4D,loss-red,Loss indicators
Draw,#FFD700,draw-gold,Draw indicators

