from sqlalchemy import MetaData, create_engine
import os
from dotenv import load_dotenv

metadata_obj = MetaData()

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    print("Failed to find db url")
    raise ValueError("DATABASE_URL is not set. Check .env file")
else:
    print(f"DB url {DATABASE_URL}")

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})