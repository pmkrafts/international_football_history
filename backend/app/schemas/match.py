from pydantic import BaseModel
from datetime import date
from typing import Optional, Literal

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

class Goal(BaseModel):
    team: str
    scorer: str
    own_goal: bool
    penalty: bool

class Shootout(BaseModel):
    winner: str
    first_shooter: Optional[str]

class MatchDetail(MatchBase):
    result: Literal["win", "loss", "draw"]
    goals: Optional[list[Goal]]
    shootout: Optional[Shootout]

class MatchListResponse(BaseModel):
    data: list[MatchDetail]
    total: int
    page: int
    limit: int
