from fastapi import APIRouter, Query
from typing import Optional
from app.services import match_service

router = APIRouter()

@router.get("/stats/dashboard")
def dashboard_stats(date_from: Optional[str] = None, date_to: Optional[str] = None):
    return match_service.get_dashboard_stats(date_from, date_to)

@router.get("/stats/trends")
def stats_trends(group_by: str = Query("year", pattern="^(year|decade)$")):
    return match_service.get_trends(group_by)
