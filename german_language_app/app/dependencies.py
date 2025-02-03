from database import SessionLocal
from service import Service

def get_service():
    db = SessionLocal()
    try:
        yield Service(db)
    finally:
        db.close()