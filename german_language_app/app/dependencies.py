from app.database import SessionLocal
from app.service import Service

def get_service():
    db = SessionLocal()
    try:
        yield Service(db)
    finally:
        db.close()