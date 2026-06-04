from fastapi import APIRouter, Query
from typing import Optional
from app.services import match_service

router = APIRouter()

@router.get("/timeline")
def get_timeline(decade: Optional[int] = None, tournament: Optional[str] = None):
    return match_service.get_timeline(decade, tournament)
