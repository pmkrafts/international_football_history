from app.db import get_db

def get_teams(search, limit):
    con = get_db()
    query = "SELECT DISTINCT home_team as team FROM results"
    if search:
        query += f" WHERE home_team ILIKE '%{search}%'"
    query += f" UNION SELECT DISTINCT away_team as team FROM results"
    if search:
        query += f" WHERE away_team ILIKE '%{search}%'"
    query += f" ORDER BY team LIMIT {limit}"
    rows = con.execute(query).fetchdf().to_dict('records')
    return {"teams": [r['team'] for r in rows]}

def get_team_profile(name):
    con = get_db()
    
    total = con.execute(f"SELECT COUNT(*) FROM results WHERE home_team = '{name}' OR away_team = '{name}'").fetchone()[0]
    
    wins = con.execute(f"SELECT COUNT(*) FROM results WHERE (home_team = '{name}' AND home_score > away_score) OR (away_team = '{name}' AND away_score > home_score)").fetchone()[0]
    
    losses = con.execute(f"SELECT COUNT(*) FROM results WHERE (home_team = '{name}' AND home_score < away_score) OR (away_team = '{name}' AND away_score < home_score)").fetchone()[0]
    
    draws = con.execute(f"SELECT COUNT(*) FROM results WHERE (home_team = '{name}' OR away_team = '{name}') AND home_score = away_score").fetchone()[0]
    
    goals_for = con.execute(f"SELECT SUM(CASE WHEN home_team = '{name}' THEN home_score ELSE away_score END) FROM results WHERE home_team = '{name}' OR away_team = '{name}'").fetchone()[0] or 0
    
    goals_against = con.execute(f"SELECT SUM(CASE WHEN home_team = '{name}' THEN away_score ELSE home_score END) FROM results WHERE home_team = '{name}' OR away_team = '{name}'").fetchone()[0] or 0
    
    first = con.execute(f"SELECT MIN(date) FROM results WHERE home_team = '{name}' OR away_team = '{name}'").fetchone()[0]
    latest = con.execute(f"SELECT MAX(date) FROM results WHERE home_team = '{name}' OR away_team = '{name}'").fetchone()[0]
    
    former = con.execute(f"SELECT former FROM former_names WHERE current = '{name}'").fetchdf().to_dict('records')
    former_names = [r['former'] for r in former]
    
    return {
        "name": name,
        "former_names": former_names,
        "total_matches": total,
        "wins": wins,
        "draws": draws,
        "losses": losses,
        "goals_for": goals_for,
        "goals_against": goals_against,
        "first_match": first,
        "latest_match": latest,
    }

def get_team_matches(name, page, limit, opponent, tournament):
    con = get_db()
    offset = (page - 1) * limit
    filters = [f"(home_team = '{name}' OR away_team = '{name}')"]
    if opponent:
        filters.append(f"(home_team = '{opponent}' OR away_team = '{opponent}')")
    if tournament:
        filters.append(f"tournament = '{tournament}'")
    where = " WHERE " + " AND ".join(filters)
    
    total = con.execute(f"SELECT COUNT(*) FROM results {where}").fetchone()[0]
    rows = con.execute(f"SELECT * FROM results {where} ORDER BY date DESC LIMIT {limit} OFFSET {offset}").fetchdf().to_dict('records')
    return {"data": rows, "total": total, "page": page, "limit": limit}

def get_team_rivals(name, limit):
    con = get_db()
    rows = con.execute(f"""
        SELECT 
            CASE WHEN home_team = '{name}' THEN away_team ELSE home_team END as opponent,
            COUNT(*) as matches,
            SUM(CASE WHEN (home_team = '{name}' AND home_score > away_score) OR (away_team = '{name}' AND away_score > home_score) THEN 1 ELSE 0 END) as wins,
            SUM(CASE WHEN home_score = away_score THEN 1 ELSE 0 END) as draws,
            SUM(CASE WHEN (home_team = '{name}' AND home_score < away_score) OR (away_team = '{name}' AND away_score < home_score) THEN 1 ELSE 0 END) as losses
        FROM results
        WHERE home_team = '{name}' OR away_team = '{name}'
        GROUP BY opponent
        ORDER BY matches DESC
        LIMIT {limit}
    """).fetchdf().to_dict('records')
    return {"rivals": rows}

def get_team_scorers(name, limit):
    con = get_db()
    rows = con.execute(f"""
        SELECT scorer as name, COUNT(*) as goals
        FROM goalscorers
        WHERE team = '{name}' AND own_goal = FALSE
        GROUP BY scorer
        ORDER BY goals DESC
        LIMIT {limit}
    """).fetchdf().to_dict('records')
    return {"scorers": rows}
