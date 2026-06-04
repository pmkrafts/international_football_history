from pydantic import BaseModel
from typing import Optional

class TournamentCount(BaseModel):
    tournament: str
    count: int

class DashboardStats(BaseModel):
    total_matches: int
    total_goals: int
    avg_goals_per_match: float
    top_tournaments: list[TournamentCount]
    highest_scoring_match: Optional[dict]
    most_active_decade: str

class TrendPoint(BaseModel):
    period: str
    matches: int
    goals: int
