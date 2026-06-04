import duckdb
import os

DATA_DIR = os.getenv("DATA_DIR", "/app/data")

con = duckdb.connect(":memory:")

# Load CSVs treating 'NA' as null values
con.execute(f"CREATE TABLE results AS SELECT * FROM read_csv_auto('{DATA_DIR}/results.csv', nullstr='NA')")
con.execute(f"CREATE TABLE shootouts AS SELECT * FROM read_csv_auto('{DATA_DIR}/shootouts.csv', nullstr='NA')")
con.execute(f"CREATE TABLE goalscorers AS SELECT * FROM read_csv_auto('{DATA_DIR}/goalscorers.csv', nullstr='NA')")
con.execute(f"CREATE TABLE former_names AS SELECT * FROM read_csv_auto('{DATA_DIR}/former_names.csv', nullstr='NA')")

con.execute("CREATE INDEX idx_results_teams ON results(date, home_team, away_team)")
con.execute("CREATE INDEX idx_results_date ON results(date)")

def get_db():
    return con
