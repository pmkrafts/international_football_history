from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import matches, teams, timeline, dashboard, map

app = FastAPI(title="Football History Explorer API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(matches.router, prefix="/api", tags=["matches"])
app.include_router(teams.router, prefix="/api", tags=["teams"])
app.include_router(timeline.router, prefix="/api", tags=["timeline"])
app.include_router(dashboard.router, prefix="/api", tags=["dashboard"])
app.include_router(map.router, prefix="/api", tags=["map"])

@app.get("/api/health")
def health_check():
    return {"status": "ok"}
