from fastapi import APIRouter, Query
from typing import Optional
from app.services import match_service

router = APIRouter()

@router.get("/map/countries")
def map_countries():
    return match_service.get_map_countries()

@router.get("/map/countries/{country}/matches")
def country_matches(
    country: str,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
):
    return match_service.get_country_matches(country, page, limit)
