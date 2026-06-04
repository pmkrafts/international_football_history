from fastapi import APIRouter, Query
from typing import Optional
from app.services import match_service

router = APIRouter()

@router.get("/matches")
def list_matches(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    team: Optional[str] = None,
    tournament: Optional[str] = None,
    date_from: Optional[str] = None,
    date_to: Optional[str] = None,
    neutral: Optional[bool] = None,
):
    return match_service.get_matches(page, limit, team, tournament, date_from, date_to, neutral)

@router.get("/matches/{date}/{home}/{away}")
def match_detail(date: str, home: str, away: str):
    return match_service.get_match_detail(date, home, away)
