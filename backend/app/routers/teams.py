from fastapi import APIRouter, Query
from typing import Optional
from app.services import team_service

router = APIRouter()

@router.get("/teams")
def list_teams(search: Optional[str] = None, limit: int = Query(50, ge=1, le=500)):
    return team_service.get_teams(search, limit)

@router.get("/teams/{name}")
def team_profile(name: str):
    return team_service.get_team_profile(name)

@router.get("/teams/{name}/matches")
def team_matches(
    name: str,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    opponent: Optional[str] = None,
    tournament: Optional[str] = None,
):
    return team_service.get_team_matches(name, page, limit, opponent, tournament)

@router.get("/teams/{name}/rivals")
def team_rivals(name: str, limit: int = Query(10, ge=1, le=50)):
    return team_service.get_team_rivals(name, limit)

@router.get("/teams/{name}/scorers")
def team_scorers(name: str, limit: int = Query(10, ge=1, le=50)):
    return team_service.get_team_scorers(name, limit)
