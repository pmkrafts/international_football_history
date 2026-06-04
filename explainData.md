```markdown
# International Football Results Dataset - Complete Guide

## Overview
This dataset contains **49,016 international men's football matches** from 1872 to 2025. It includes four CSV files.

---

## 1. results.csv (Main / Central Table)

**Purpose**: Contains every official international match.

### Columns:
- `date` → Match date (YYYY-MM-DD)
- `home_team` → Current name of the home team
- `away_team` → Current name of the away team
- `home_score` → Goals scored by home team
- `away_score` → Goals scored by away team
- `tournament` → Name of the tournament/competition
- `city` → City where match was played
- `country` → Country where match was played
- `neutral` → `TRUE` = Neutral venue, `FALSE` = Home advantage for one team

---

## 2. shootouts.csv

**Purpose**: Only matches that went to **penalty shootouts**.

### Columns:
- `date`, `home_team`, `away_team`
- `winner` → Team that won the shootout
- `first_shooter` → Team that took the first penalty

---

## 3. goalscorers.csv

**Purpose**: Every individual goal scored in all matches.

### Columns:
- `date`, `home_team`, `away_team`
- `team` → Team that benefited from the goal
- `scorer` → Player's name
- `own_goal` → `TRUE` if it was an own goal
- `penalty` → `TRUE` if it was a penalty kick

---

## 4. former_names.csv

**Purpose**: Maps old team names to current team names.

### Columns:
- `current` → Current team name (used in other tables)
- `former` → Old historical name
- `start_date` → Start date of old name
- `end_date` → End date of old name

---

## Interrelations Between Tables

All tables are interconnected. Here is how they relate to each other:

### 1. **results.csv** is the Central Table
- It acts as the **main reference** for all other tables.
- Almost every analysis starts from this table.

### 2. **results.csv ↔ shootouts.csv**
- **Relationship**: One-to-One (but only for some matches)
- Connected by: `date` + `home_team` + `away_team`
- Only matches that went to penalties exist in both tables.
- `results.csv` shows the score before penalties (e.g. 1-1), while `shootouts.csv` tells who finally won.

### 3. **results.csv ↔ goalscorers.csv**
- **Relationship**: One-to-Many
- Connected by: `date` + `home_team` + `away_team`
- One match in `results.csv` can have **multiple rows** in `goalscorers.csv` (one row per goal).
- Example: A 3-2 match will have 5 rows in goalscorers.csv.

### 4. **results.csv ↔ former_names.csv**
- **Relationship**: Indirect (via team name)
- Connected by: `home_team` or `away_team` = `current` column
- Used when you want to show historical name of a team (e.g., "Yugoslavia" instead of "Serbia").

### 5. **shootouts.csv ↔ goalscorers.csv**
- Indirect relationship through `results.csv`.
- You can join all three tables if you want to analyze penalty shootout matches and their goals.

### 6. **former_names.csv** with other tables
- It is a **reference/lookup table**.
- Not directly joined by match, but used to enrich team names in results, goalscorers, and shootouts.

---

## Summary of Relationships

| Table 1            | Table 2             | Relationship Type     | Join Keys                     |
|--------------------|---------------------|-----------------------|-------------------------------|
| results.csv        | shootouts.csv       | One-to-One            | date + home_team + away_team |
| results.csv        | goalscorers.csv     | One-to-Many           | date + home_team + away_team |
| results.csv        | former_names.csv    | Many-to-One (Lookup)  | home_team / away_team        |
| shootouts.csv      | goalscorers.csv     | Indirect              | Via results.csv              |