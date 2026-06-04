import duckdb
import os

DATA_DIR = os.getenv("DATA_DIR", "/app/data")

con = duckdb.connect(":memory:")

con.execute(f"CREATE VIEW results AS SELECT * FROM read_csv_auto('{DATA_DIR}/results.csv')")
con.execute(f"CREATE VIEW shootouts AS SELECT * FROM read_csv_auto('{DATA_DIR}/shootouts.csv')")
con.execute(f"CREATE VIEW goalscorers AS SELECT * FROM read_csv_auto('{DATA_DIR}/goalscorers.csv')")
con.execute(f"CREATE VIEW former_names AS SELECT * FROM read_csv_auto('{DATA_DIR}/former_names.csv')")

con.execute("CREATE INDEX idx_results_teams ON results(date, home_team, away_team)")
con.execute("CREATE INDEX idx_results_date ON results(date)")

def get_db():
    return con
