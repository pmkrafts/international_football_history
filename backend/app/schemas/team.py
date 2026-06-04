from pydantic import BaseModel
from datetime import date
from typing import Optional

class TeamProfile(BaseModel):
    name: str
    former_names: list[str]
    total_matches: int
    wins: int
    draws: int
    losses: int
    goals_for: int
    goals_against: int
    first_match: Optional[date]
    latest_match: Optional[date]

class RivalRecord(BaseModel):
    opponent: str
    matches: int
    wins: int
    draws: int
    losses: int

class Scorer(BaseModel):
    name: str
    goals: int
