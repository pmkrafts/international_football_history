from app.db import get_db
from typing import Optional

def get_matches(page, limit, team, tournament, date_from, date_to, neutral):
    con = get_db()
    offset = (page - 1) * limit
    filters = []
    if team:
        filters.append(f"(home_team = '{team}' OR away_team = '{team}')")
    if tournament:
        filters.append(f"tournament = '{tournament}'")
    if date_from:
        filters.append(f"date >= '{date_from}'")
    if date_to:
        filters.append(f"date <= '{date_to}'")
    if neutral is not None:
        filters.append(f"neutral = {str(neutral).upper()}")
    where = " WHERE " + " AND ".join(filters) if filters else ""
    
    total = con.execute(f"SELECT COUNT(*) FROM results {where}").fetchone()[0]
    rows = con.execute(f"SELECT * FROM results {where} ORDER BY date DESC LIMIT {limit} OFFSET {offset}").fetchdf().to_dict('records')
    
    for row in rows:
        row['result'] = get_result(row, team)
    
    return {"data": rows, "total": total, "page": page, "limit": limit}

def get_match_detail(date, home, away):
    con = get_db()
    row = con.execute(f"SELECT * FROM results WHERE date = '{date}' AND home_team = '{home}' AND away_team = '{away}'").fetchdf().to_dict('records')
    if not row:
        return None
    match = row[0]
    match['result'] = get_result(match, match['home_team'])
    
    goals = con.execute(f"SELECT team, scorer, own_goal, penalty FROM goalscorers WHERE date = '{date}' AND home_team = '{home}' AND away_team = '{away}'").fetchdf().to_dict('records')
    match['goals'] = goals if goals else None
    
    shootout = con.execute(f"SELECT winner, first_shooter FROM shootouts WHERE date = '{date}' AND home_team = '{home}' AND away_team = '{away}'").fetchdf().to_dict('records')
    match['shootout'] = shootout[0] if shootout else None
    
    return match

def get_result(row, team=None):
    perspective = team or row['home_team']
    if row['home_team'] == perspective:
        if row['home_score'] > row['away_score']:
            return "win"
        elif row['home_score'] < row['away_score']:
            return "loss"
    else:
        if row['away_score'] > row['home_score']:
            return "win"
        elif row['away_score'] < row['home_score']:
            return "loss"
    return "draw"

def get_timeline(decade, tournament):
    con = get_db()
    filters = []
    if decade:
        filters.append(f"CAST(date as DATE).year BETWEEN {decade} AND {decade + 9}")
    if tournament:
        filters.append(f"tournament = '{tournament}'")
    where = " WHERE " + " AND ".join(filters) if filters else ""
    
    rows = con.execute(f"SELECT date, home_team, away_team, home_score, away_score, tournament FROM results {where} ORDER BY date").fetchdf().to_dict('records')
    return {"events": rows}

def get_dashboard_stats(date_from, date_to):
    con = get_db()
    filters = []
    if date_from:
        filters.append(f"date >= '{date_from}'")
    if date_to:
        filters.append(f"date <= '{date_to}'")
    where = " WHERE " + " AND ".join(filters) if filters else ""
    
    total_matches = con.execute(f"SELECT COUNT(*) FROM results {where}").fetchone()[0]
    total_goals = con.execute(f"SELECT SUM(home_score + away_score) FROM results {where}").fetchone()[0]
    avg_goals = round(total_goals / total_matches, 2) if total_matches else 0
    
    top_tournaments = con.execute(f"SELECT tournament, COUNT(*) as count FROM results {where} GROUP BY tournament ORDER BY count DESC LIMIT 5").fetchdf().to_dict('records')
    
    highest = con.execute(f"SELECT * FROM results {where} ORDER BY (home_score + away_score) DESC LIMIT 1").fetchdf().to_dict('records')
    
    decades = con.execute(f"SELECT FLOOR(CAST(date as DATE).year / 10) * 10 as decade, COUNT(*) as count FROM results {where} GROUP BY decade ORDER BY count DESC LIMIT 1").fetchdf().to_dict('records')
    most_active_decade = str(int(decades[0]['decade'])) + "s" if decades else "N/A"
    
    return {
        "total_matches": total_matches,
        "total_goals": total_goals,
        "avg_goals_per_match": avg_goals,
        "top_tournaments": top_tournaments,
        "highest_scoring_match": highest[0] if highest else None,
        "most_active_decade": most_active_decade,
    }

def get_trends(group_by):
    con = get_db()
    if group_by == "decade":
        query = "SELECT FLOOR(CAST(date as DATE).year / 10) * 10 as period, COUNT(*) as matches, SUM(home_score + away_score) as goals FROM results GROUP BY period ORDER BY period"
    else:
        query = "SELECT CAST(date as DATE).year as period, COUNT(*) as matches, SUM(home_score + away_score) as goals FROM results GROUP BY period ORDER BY period"
    rows = con.execute(query).fetchdf().to_dict('records')
    return {"trends": rows}

def get_map_countries():
    con = get_db()
    rows = con.execute("SELECT country, COUNT(*) as matches FROM results GROUP BY country ORDER BY matches DESC").fetchdf().to_dict('records')
    return {"countries": rows}

def get_country_matches(country, page, limit):
    con = get_db()
    offset = (page - 1) * limit
    total = con.execute(f"SELECT COUNT(*) FROM results WHERE country = '{country}'").fetchone()[0]
    rows = con.execute(f"SELECT * FROM results WHERE country = '{country}' ORDER BY date DESC LIMIT {limit} OFFSET {offset}").fetchdf().to_dict('records')
    return {"data": rows, "total": total, "page": page, "limit": limit}
