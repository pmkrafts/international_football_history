import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_list_matches():
    response = client.get("/api/matches")
    assert response.status_code == 200
    data = response.json()
    assert "data" in data
    assert "total" in data
    assert "page" in data

def test_match_detail():
    # Get a known match
    response = client.get("/api/matches")
    data = response.json()
    if data["data"]:
        match = data["data"][0]
        detail = client.get(f"/api/matches/{match['date']}/{match['home_team']}/{match['away_team']}")
        assert detail.status_code == 200
        assert "goals" in detail.json()

def test_list_teams():
    response = client.get("/api/teams")
    assert response.status_code == 200
    assert "teams" in response.json()

def test_team_profile():
    response = client.get("/api/teams/England")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "England"
    assert "total_matches" in data

def test_dashboard_stats():
    response = client.get("/api/stats/dashboard")
    assert response.status_code == 200
    data = response.json()
    assert "total_matches" in data
    assert "total_goals" in data

def test_trends():
    response = client.get("/api/stats/trends?group_by=decade")
    assert response.status_code == 200
    assert "trends" in response.json()

def test_map_countries():
    response = client.get("/api/map/countries")
    assert response.status_code == 200
    assert "countries" in response.json()
