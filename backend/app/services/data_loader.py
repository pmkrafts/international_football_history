from app.db import get_db

def load_data():
    con = get_db()
    # Data is loaded via views in db.py
    return {"status": "loaded"}
